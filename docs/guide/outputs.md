# Retrieving and storing output

`convertTo()` returns a `ConvertedOffice` that you can use once. Call `output()` to read its contents or
`storeAs()` to save it.

## Read all bytes

```php
use Mattmy\OfficeConverter\Enums\Format;

$bytes = $document->convertTo(Format::PDF)->output();
```

`output()` checks the output file, returns its contents as a binary string, and removes the temporary files.
The complete output must fit in PHP memory. If you only need to save it, use `storeAs()`.

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

```php
storeAs(string $path, ?string $filename = null, ?string $disk = null): string|false
```

- `$path` is a relative directory on the selected disk. `''` means the disk root; trailing `/` is normalized.
- `$filename` is an optional safe filename. Existing suffix text is preserved.
- `$disk` selects a Laravel filesystem disk. `null` uses the default disk.
- Returns the stored path, or `false` if the selected disk reports a failure.

## Filename examples

| Target | Supplied filename | Stored filename |
| --- | --- | --- |
| `Format::DOCX` | `report` | `report.docx` |
| `Format::DOCX` | `png-38.jpg` | `png-38.jpg.docx` |
| `Format::DOCX` | `report.DOCX` | `report.docx` |
| `Format::HTML` | `report.docx` | `report.docx.html` |
| `Format::JPEG` | `preview.jpeg` | `preview.jpeg.jpg` |

When `$filename` is omitted, the source filename is used without its final extension. If that name is unsafe
or unavailable, the package generates a name such as `converted-a1b2c3d4e5f60718`. The output extension is then appended.

## Safe destinations

Use `/` to separate directories and `''` for the disk root. `/` is not a valid root path.
Trailing slashes are removed; the remaining path cannot contain empty, `.` or `..` segments, such as `a//b`.
Absolute paths, drive paths, backslashes, invalid UTF-8, and Unicode control characters (including NUL) are rejected.

Filenames cannot be empty, `.` or `..`, and cannot contain path separators, invalid UTF-8, or Unicode control characters.

Invalid destinations throw PHP's `InvalidArgumentException` before Storage is called.

## Storage behavior

`storeAs()` uses the selected disk's overwrite behavior, returns `false` unchanged, and lets Storage or
Flysystem exceptions propagate. It does not provide atomic writes, rollback, or automatic retries.
Set any required Content-Type metadata in your application; the package does not set it or provide an output MIME type.

The result cannot be reused, and temporary files are cleaned up whether validation or storage succeeds or fails.
To retry, create a new input and convert it again.
