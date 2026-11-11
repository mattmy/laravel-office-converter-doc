# Getting started

Laravel Office Converter is powered by LibreOffice and converts supported documents, spreadsheets,
presentations, drawings, and images. Start from a local file, raw content, or a Laravel upload, then retrieve
the converted file or save it with Laravel Storage.

## Requirements

| Requirement | Supported versions or setup |
| --- | --- |
| PHP | 8.2 or later in the PHP 8.x series, with DOM, XML, and ZIP |
| Laravel | 12 with PHP 8.2+; 13 with PHP 8.3+ |
| Operating system | Windows, Linux, or macOS |
| External command | LibreOffice installed on `PATH` or configured with `LIBREOFFICE_BINARY` |

LibreOffice is installed separately. Compatibility depends on whether it can complete the requested
conversion; the package does not check its version number.

## Install the package

```bash
composer require mattmy/laravel-office-converter
```

## Install LibreOffice

Use the commands below or download an installer from the
[LibreOffice website](https://www.libreoffice.org/download/).

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

### RHEL and Fedora

Install from an enabled distribution repository when available:

```bash
sudo dnf install libreoffice
```

RHEL package availability depends on the release and enabled repositories. If unavailable, install the
`.rpm` packages using the [official instructions](https://www.libreoffice.org/installation-instructions/).

### Windows

Download the Windows installer from the LibreOffice website. If the executable is not on `PATH`, add its
path to `.env`. For a standard installation:

```dotenv
LIBREOFFICE_BINARY='C:\Program Files\LibreOffice\program\soffice.com'
```

Keep the single quotes so spaces and backslashes are read correctly. Adjust the path if you installed LibreOffice elsewhere.

## Configuration

The package uses `soffice.com` on Windows and `soffice` elsewhere. If it is not on `PATH`, set its path in
`.env`; publishing the config is not required:

```dotenv
LIBREOFFICE_BINARY=/usr/bin/soffice
```

See [Configuration](./configuration) to change timeouts, size limits, or temporary storage.

## Quick start

This example receives a valid Laravel upload, converts it to PDF, and streams it to the default Storage disk:

```php
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Facades\Office;

$path = Office::fromUploadedFile($request->file('document'))
    ->convertTo(Format::PDF)
    ->storeAs('converted-documents', 'report.pdf');
```

`$path` is the stored path, or `false` if the selected disk reports a failure. The input and result can each be
used once. To retry after a conversion or storage failure, create a new input and convert it again.

## Next steps

- [Choose an input source](./inputs).
- [Check every supported input-to-output conversion](./supported-conversions).
- [Read bytes or store the result](./outputs).
- [Handle errors](./errors-and-troubleshooting).
