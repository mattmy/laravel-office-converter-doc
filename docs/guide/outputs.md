# Retrieving and storing output

`convertTo()` returns a one-time `ConvertedOffice`. Choose exactly one terminal operation: `output()` or
`storeAs()`.

## Read all bytes

```php
use Mattmy\OfficeConverter\Enums\Format;

$bytes = $document->convertTo(Format::PDF)->output();
```

`output()` returns the complete binary string and then cleans the package workspace. It rechecks the artifact
immediately before reading it. Use this only when the complete output safely fits in PHP memory.

## Stream to Laravel Storage

```php
use Mattmy\OfficeConverter\Enums\Format;

$storedPath = $document
    ->convertTo(Format::DOCX)
    ->storeAs(
        path: 'converted-documents',
        filename: 'quarterly-report.xlsx',
        disk: 's3',
    );
```

This stores `converted-documents/quarterly-report.xlsx.docx`: the supplied name is preserved, and
`Format::DOCX` determines the final extension.

The signature is:

```php
storeAs(string $path, ?string $filename = null, ?string $disk = null): string|false
```

- `$path` is a relative directory on the selected disk. `''` means the disk root; trailing `/` is normalized.
- `$filename` is an optional safe filename. Existing suffix text is preserved.
- `$disk` selects a Laravel filesystem disk. `null` uses the default disk.
- The return value is Laravel Storage's stored path or `false` from the selected driver.

## Filename examples

| Target | Supplied filename | Stored filename |
| --- | --- | --- |
| `Format::DOCX` | `report` | `report.docx` |
| `Format::DOCX` | `png-38.jpg` | `png-38.jpg.docx` |
| `Format::DOCX` | `report.DOCX` | `report.docx` |
| `Format::HTML` | `report.docx` | `report.docx.html` |
| `Format::JPEG` | `preview.jpeg` | `preview.jpeg.jpg` |

When `$filename` is omitted, a safe source filename stem is used. Raw content or an unsafe/missing source
stem uses `converted-{16 lowercase hexadecimal characters}`.

## Safe destinations

Directory paths must be relative and use forward slashes. After trailing slashes are removed, an empty string
means the disk root; other paths cannot contain empty, `.` or `..` segments. Absolute paths, drive paths,
backslashes, invalid UTF-8, and Unicode control characters (including NUL) are rejected.

Filenames cannot be empty, `.` or `..`, and cannot contain path separators, invalid UTF-8, or Unicode control characters.

Invalid destinations throw PHP's `InvalidArgumentException` before Storage is called.

## Storage behavior

`storeAs()` uses the selected disk's overwrite behavior, returns `false` unchanged, and lets Storage or
Flysystem exceptions propagate. It does not provide atomic writes, rollback, or automatic retries.
The package does not provide an output MIME accessor or set Storage Content-Type metadata.

The output is consumed and its package workspace is cleaned whether Storage succeeds, returns `false`, or
throws. Run the conversion again before retrying delivery.
