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

## Install the package

Install the package with Composer:

```bash
composer require mattmy/laravel-office-converter
```

## Install LibreOffice

Use your operating system's package manager or the prebuilt installer from the
[LibreOffice download page](https://www.libreoffice.org/download/). The
[official installation instructions](https://www.libreoffice.org/installation-instructions/) provide more
detail for macOS, Linux, and Windows. You do not need to compile LibreOffice from source.

### macOS

Install the [Homebrew LibreOffice cask](https://formulae.brew.sh/cask/libreoffice):

```bash
brew install --cask libreoffice
```

Without Homebrew, download the Apple Silicon or Intel `.dmg` from the LibreOffice website and move
LibreOffice to Applications as described in the official instructions.

### Ubuntu and Debian

Install the distribution package:

```bash
sudo apt update
sudo apt install libreoffice
```

Ubuntu lists LibreOffice in its [official package index](https://packages.ubuntu.com/search?keywords=libreoffice),
and Debian provides it through its normal package repositories. You can also use the prebuilt `.deb` packages
from the LibreOffice download page.

### RHEL and Fedora

Install from an enabled distribution repository when available:

```bash
sudo dnf install libreoffice
```

Fedora publishes LibreOffice in its
[official package index](https://packages.fedoraproject.org/pkgs/libreoffice/libreoffice/). RHEL repository
availability depends on the release and enabled subscriptions; use LibreOffice's prebuilt `.rpm` download and
official installation instructions when the package is unavailable.

### Windows

Download the Windows installer from the LibreOffice website and complete its installation wizard. The usual
console executable location is:

```text
C:\Program Files\LibreOffice\program\soffice.com
```

If it is not on `PATH`, set `LIBREOFFICE_BINARY` to that path in your Laravel environment.

The package does not require or inspect a numeric LibreOffice version. Compatibility is determined by whether
the installed command and filters complete the requested conversion.

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
