# API reference

## Imports

```php
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Enums\InputFormat;
use Mattmy\OfficeConverter\Facades\Office;
```

The signatures below show parameter and return types.

## Create an OfficeDocument

```php
Office::fromPath(string $path): OfficeDocument
Office::fromContent(string $content, InputFormat $format): OfficeDocument
Office::fromUploadedFile(UploadedFile $file): OfficeDocument
```

- `fromPath()` snapshots an absolute, readable, non-symbolic-link local file.
- `fromContent()` snapshots complete bytes using the required explicit `InputFormat`.
- `fromUploadedFile()` snapshots a valid Laravel upload and uses its original extension as the format candidate.

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

- `output()` returns all artifact bytes.
- `storeAs()` streams to a Laravel Storage disk and returns the driver's path or `false`.

Call either `output()` or `storeAs()` once. Both methods consume the result on success or failure and clean
its temporary conversion files. See [Retrieving and storing output](./outputs).

## Exceptions

The package exception marker is:

```php
Mattmy\OfficeConverter\Contracts\OfficeConverterException
```

Implementations are `EnvironmentUnavailable`, `InvalidOfficeInput`, `UnsupportedConversion`,
`ConversionFailed`, and `AlreadyConsumed`, all under `Mattmy\OfficeConverter\Exceptions`. Storage destination validation uses PHP's
`InvalidArgumentException`; Storage/Flysystem failures are not converted. See
[Errors and troubleshooting](./errors-and-troubleshooting).

## Laravel configuration

The config file is `config/office-converter.php`; its publish tag is `office-converter-config`.
`LIBREOFFICE_BINARY` overrides the executable path. See [Configuration](./configuration) for all keys and defaults.
