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
$storedPath = $document
    ->convertTo(Format::DOCX)
    ->storeAs(
        path: 'converted-documents',
        filename: 'quarterly-report.xlsx',
        disk: 's3',
    );
```

This stores `converted-documents/quarterly-report.xlsx.docx`. The filename is a name, not permission to choose
the output format: the trusted `.docx` extension comes from `Format::DOCX`.

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

Directory paths must be relative, use forward slashes, and contain no empty, `.` or `..` segment. Absolute
paths, drive paths, backslashes, NUL, and Unicode control characters are rejected. Filenames cannot be empty,
`.` or `..`, and cannot contain path separators or Unicode control characters.

Invalid destinations throw PHP's `InvalidArgumentException` before Storage is called.

## Storage behavior

`storeAs()` follows the selected Laravel Storage driver's behavior:

- it does not check whether the destination already exists;
- it does not prevent or roll back overwrites;
- it does not provide atomic publishing, locking, conditional creation, or retry;
- a driver `false` result is returned unchanged;
- Laravel Storage and Flysystem exceptions are thrown unchanged;
- it does not set Content-Type metadata.

The output is consumed and its package workspace is cleaned whether Storage succeeds, returns `false`, or
throws. Run the conversion again before retrying delivery.
