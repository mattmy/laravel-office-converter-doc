# Errors and troubleshooting

Package exceptions implement `OfficeConverterException`, allowing one catch for converter failures or a
specific catch for each category. Storage and destination errors intentionally remain separate.

## Handle conversion failures

```php
use InvalidArgumentException;
use Mattmy\OfficeConverter\Contracts\OfficeConverterException;
use Mattmy\OfficeConverter\Exceptions\UnsupportedConversion;

try {
    $stored = $document->convertTo($format)->storeAs('converted');
} catch (UnsupportedConversion $exception) {
    return back()->withErrors(['format' => 'That output is not available for this input.']);
} catch (InvalidArgumentException $exception) {
    return back()->withErrors(['destination' => 'Choose a safe Storage destination.']);
} catch (OfficeConverterException $exception) {
    report($exception);
}
```

Do not show raw exception details to end users. Messages are bounded and workspace paths are removed, but they
are intended for server diagnostics.

## Exception categories

| Exception | Meaning |
| --- | --- |
| `EnvironmentUnavailable` | Configuration is invalid, or the configured executable cannot be found or started |
| `InvalidOfficeInput` | The source, extension, size, upload, or minimum format structure is not accepted |
| `UnsupportedConversion` | The requested `Format` is unavailable for the input family |
| `ConversionFailed` | LibreOffice failed, timed out, or did not produce exactly one valid bounded artifact |
| `AlreadyConsumed` | An `OfficeDocument` or `ConvertedOffice` was used after its first operation |

`AlreadyConsumed` also extends `LogicException`. `storeAs()` can additionally throw `InvalidArgumentException`
for its destination and unmodified Laravel Storage or Flysystem exceptions. A Storage driver may return `false`.

## LibreOffice cannot be found

Confirm `soffice.com` on Windows or `soffice` elsewhere is on `PATH`, or set `LIBREOFFICE_BINARY` to an
absolute executable path.

## A supported format still fails

There is no numeric LibreOffice version gate. A distribution may lack or change a required filter. Confirm the
same conversion works with the configured executable and review its sanitized server-side error. The failure
remains `ConversionFailed` because actual command capability defines compatibility.

## HTML conversion fails with an image

HTML output must be a single file. If LibreOffice writes image sidecars, the package rejects the complete
conversion rather than return HTML containing broken references. Choose PDF or another single-file target.

## Storage returns false or throws

The selected disk controls overwrite and failure behavior. The result has already been consumed and its
temporary workspace cleaned, so create a new input and run the conversion again before retrying.
