# Choosing an input

Every input method creates an `OfficeDocument` containing a snapshot of the accepted source. Later changes to
the original path or upload do not change that snapshot.

## Local absolute path

```php
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromPath(storage_path('app/private/report.docx'));
```

The path must be absolute and identify a readable, non-symbolic-link regular file. Relative paths, URLs,
directories, Storage-relative paths, and Windows UNC paths are not accepted. Your application remains
responsible for authorizing which local paths a caller may request.

The final filename extension selects the candidate `InputFormat`; matching is ASCII case-insensitive. `.htm`
is accepted as HTML and `.jpeg` as JPEG. File contents are checked before LibreOffice starts.

## Raw bytes

```php
use Mattmy\OfficeConverter\Enums\InputFormat;
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromContent($bytes, InputFormat::DOCX);
```

Raw bytes always require an explicit `InputFormat`. Container formats such as OLE and ZIP are not sufficient
to infer every document family without ambiguity. The complete `$bytes` string already occupies PHP memory.

## Laravel upload

```php
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromUploadedFile($request->file('document'));
```

The upload must be valid and readable. Its original filename supplies the candidate extension, but neither
that extension nor the client MIME type proves the format; the package also validates the content.

Validate request authorization and application-specific upload limits before passing the file to the package.

## Accepted input formats

| Family | `InputFormat` cases |
| --- | --- |
| Writer | `ODT`, `DOC`, `DOCX`, `DOCM`, `RTF`, `TXT`, `HTML` |
| Calc | `ODS`, `XLS`, `XLSX`, `XLSM`, `CSV` |
| Impress | `ODP`, `PPT`, `PPTX`, `PPTM` |
| Draw | `ODG`, `PDF`, `DXF`, `SVG`, `PNG`, `JPEG`, `WEBP` |

The family determines which outputs are available. See the complete
[supported conversion list](./supported-conversions).

## One conversion attempt

Call `convertTo()` once on an `OfficeDocument`. The first attempt consumes it even when the target is not
supported or LibreOffice fails:

```php
$result = $document->convertTo(Format::PDF);
```

Create a new input snapshot before retrying.
