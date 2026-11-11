# API reference

## Imports

```php
use Illuminate\Http\UploadedFile;
use Mattmy\OfficeConverter\ConvertedOffice;
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Enums\InputFormat;
use Mattmy\OfficeConverter\Facades\Office;
use Mattmy\OfficeConverter\OfficeDocument;
```

The signatures below show parameter and return types.

## Create an OfficeDocument

```php
Office::fromPath(string $path): OfficeDocument
Office::fromContent(string $content, InputFormat $format): OfficeDocument
Office::fromUploadedFile(UploadedFile $file): OfficeDocument
```

- `fromPath()` snapshots an absolute, readable, non-symbolic-link local file.
- `fromContent()` snapshots a binary string; you must specify its `InputFormat`.
- `fromUploadedFile()` snapshots a valid Laravel upload, using its original extension and checking its contents.

See [Choosing an input](./inputs) for input rules and [Supported conversions](./supported-conversions) for all formats.

## Convert an OfficeDocument

```php
$document->convertTo(Format $format): ConvertedOffice
```

Runs the conversion and returns its result. Each document allows one attempt, including failures.
Unsupported combinations throw `UnsupportedConversion` before LibreOffice starts.
See [Supported conversions](./supported-conversions) for all `Format` cases and allowed inputs.

## Retrieve or store a ConvertedOffice

```php
$converted->output(): string
$converted->storeAs(
    string $path,
    ?string $filename = null,
    ?string $disk = null,
): string|false
```

- `output()` returns the complete file as a binary string.
- `storeAs()` streams to a Laravel Storage disk and returns the stored path or `false`.

Call either `output()` or `storeAs()` once. Both methods consume the result on success or failure and clean
its temporary conversion files. See [Retrieving and storing output](./outputs).

## Exceptions

All package exceptions implement `Mattmy\OfficeConverter\Contracts\OfficeConverterException`:
`EnvironmentUnavailable`, `InvalidOfficeInput`, `UnsupportedConversion`,
`ConversionFailed`, and `AlreadyConsumed`, all under `Mattmy\OfficeConverter\Exceptions`. Storage destination validation uses PHP's
`InvalidArgumentException`; Storage/Flysystem failures are not converted. See
[Errors and troubleshooting](./errors-and-troubleshooting).

## Laravel configuration

The config file is `config/office-converter.php`; its publish tag is `office-converter-config`.
`LIBREOFFICE_BINARY` overrides the executable path. See [Configuration](./configuration) for all keys and defaults.
