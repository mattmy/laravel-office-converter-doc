# API reference

This page lists the public API available to your Laravel application. Linked guides explain input, conversion,
delivery, and error behavior.

## Create an OfficeDocument

```php
Office::fromPath(string $path): OfficeDocument
Office::fromContent(string $content, InputFormat $format): OfficeDocument
Office::fromUploadedFile(UploadedFile $file): OfficeDocument
```

- `fromPath()` snapshots an absolute, readable, non-symbolic-link local file.
- `fromContent()` snapshots complete bytes using the required explicit `InputFormat`.
- `fromUploadedFile()` snapshots a valid Laravel upload and uses its original extension as the format candidate.

See [Choosing an input](./inputs). `InputFormat` cases are:

```text
ODT DOC DOCX DOCM RTF TXT HTML
ODS XLS XLSX XLSM CSV
ODP PPT PPTX PPTM
ODG PDF DXF SVG PNG JPEG WEBP
```

## Convert an OfficeDocument

```php
$document->convertTo(Format $format): ConvertedOffice
```

Converts once to a format supported by the input family. Unsupported combinations throw
`UnsupportedConversion` before LibreOffice starts. See the [complete conversion matrix](./supported-conversions).

`Format` cases are:

```text
PDF ODT DOCX RTF TXT HTML ODS XLSX CSV ODP PPTX ODG PNG JPEG SVG WEBP
```

## Consume a ConvertedOffice

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
`ConversionFailed`, and `AlreadyConsumed`. Storage destination validation uses PHP's
`InvalidArgumentException`; Storage/Flysystem failures are not converted. See
[Errors and troubleshooting](./errors-and-troubleshooting).

## Laravel integration

Publish tag:

```text
office-converter-config
```

Environment variable:

```text
LIBREOFFICE_BINARY
```

See [Configuration](./configuration) for config keys and defaults.
