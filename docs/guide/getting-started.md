# Getting started

Laravel Office Converter is powered by LibreOffice and converts supported documents, spreadsheets,
presentations, drawings, and images. Start from a local file, raw content, or a Laravel upload, then retrieve
the converted file or save it with Laravel Storage.

## Requirements

| Requirement | Supported versions or setup |
| --- | --- |
| PHP | 8.3 or later in the PHP 8.x series, with DOM and ZIP |
| Laravel | 12 or 13 |
| Operating system | Windows, Linux, or macOS |
| External command | LibreOffice installed on `PATH` or configured with `LIBREOFFICE_BINARY` |

LibreOffice is installed separately. Compatibility is determined by whether its command and filters complete
the requested conversion; the package does not require or inspect a numeric LibreOffice version.

## Installation

Install the package with Composer:

```bash
composer require mattmy/laravel-office-converter
```

Install LibreOffice through your operating system or deployment image. The package does not download or
bundle it.

## Configuration

By default, the package uses `soffice.com` on Windows and `soffice` elsewhere. Publish the config when the
executable is elsewhere or you need different limits:

```bash
php artisan vendor:publish --tag=office-converter-config
```

```dotenv
LIBREOFFICE_BINARY=/usr/bin/soffice
```

See [Configuration](./configuration) for every option and the configured executable's responsibility boundary.

## Quick start

This example receives a valid Laravel upload, converts it to PDF, and streams it to the default Storage disk:

```php
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Facades\Office;

$path = Office::fromUploadedFile($request->file('document'))
    ->convertTo(Format::PDF)
    ->storeAs('converted-documents', 'report.pdf');
```

`$path` is the stored path or `false` when the selected Storage driver reports failure. The source document
and converted result are one-time objects: a failed conversion or delivery must be started again.

## Next steps

- [Choose an input source](./inputs).
- [Check every supported input-to-output conversion](./supported-conversions).
- [Read bytes or store the result](./outputs).
- [Handle errors](./errors-and-troubleshooting).
