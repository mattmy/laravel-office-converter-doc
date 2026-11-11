# Errors and troubleshooting

Catch `OfficeConverterException` for package errors. Invalid Storage destinations throw
`InvalidArgumentException`; Storage and Flysystem exceptions pass through unchanged.

## Handle conversion failures

```php
use Mattmy\OfficeConverter\Contracts\OfficeConverterException;
use Mattmy\OfficeConverter\Exceptions\UnsupportedConversion;
use Mattmy\OfficeConverter\Facades\Office;

try {
    $document = Office::fromUploadedFile($request->file('document'));
    $stored = $document->convertTo($format)->storeAs('converted');

    if ($stored === false) {
        return back()->withErrors(['storage' => 'The converted file could not be saved.']);
    }
} catch (UnsupportedConversion $exception) {
    return back()->withErrors(['format' => 'That output is not available for this input.']);
} catch (OfficeConverterException $exception) {
    report($exception);
}
```

This example uses a fixed destination. If the destination comes from user input, validate it and handle
`InvalidArgumentException` separately. Storage exceptions still follow your application's error handling.

Do not show raw exception details to end users. Messages are bounded and workspace paths are removed, but they
are intended for server diagnostics.

## Exception categories

| Exception | Meaning |
| --- | --- |
| `EnvironmentUnavailable` | Configuration is invalid, or the configured executable cannot be found or started |
| `InvalidOfficeInput` | The source is missing, unreadable, an invalid upload, too large, or does not match an accepted format |
| `UnsupportedConversion` | The requested `Format` is unavailable for the input family |
| `ConversionFailed` | Conversion failed or timed out, or the output is missing, invalid, too large, or contains more than one file |
| `AlreadyConsumed` | An `OfficeDocument` or `ConvertedOffice` was used after its first operation |

`AlreadyConsumed` also extends `LogicException`. Check the return value of `storeAs()`: a disk can report
failure by returning `false` instead of throwing an exception.

## LibreOffice cannot be found

Confirm `soffice.com` on Windows or `soffice` elsewhere is on `PATH`, or set `LIBREOFFICE_BINARY` to an
absolute executable path.

## A supported format still fails

Check whether the configured LibreOffice executable can perform the same conversion, and review the server
error. Missing conversion filters or incompatible commands cause `ConversionFailed`; the package checks the
conversion result, not the LibreOffice version number.

## HTML conversion fails with an image

HTML output must be a single file. If LibreOffice creates separate images or other supporting files,
the conversion fails. Choose PDF or another single-file format.

## Storage returns false or throws

Check the selected disk's connection, permissions, and settings. The result cannot be reused, and its temporary
files have been cleaned up. To retry, create a new input and convert it again.
