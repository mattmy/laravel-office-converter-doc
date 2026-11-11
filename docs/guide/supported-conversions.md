# Supported conversions

The input format determines its family. `convertTo()` accepts only that family's listed output formats;
other combinations throw `UnsupportedConversion` before LibreOffice starts.

## Input-to-output list

Inputs are `InputFormat` cases; outputs are `Format` cases. Every input in a row supports all outputs in that row.

| Family | Inputs | Available outputs |
| --- | --- | --- |
| Writer | `ODT`, `DOC`, `DOCX`, `DOCM`, `RTF`, `TXT`, `HTML` | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| Calc | `ODS`, `XLS`, `XLSX`, `XLSM`, `CSV` | `PDF`, `ODS`, `XLSX`, `CSV` |
| Impress | `ODP`, `PPT`, `PPTX`, `PPTM` | `PDF`, `ODP`, `PPTX` |
| Draw | `ODG`, `PDF`, `DXF`, `SVG`, `PNG`, `JPEG`, `WEBP` | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |

Converting to the same format is allowed, such as DOCX → DOCX. Input filename aliases `.htm` and `.jpeg`
resolve to `InputFormat::HTML` and `InputFormat::JPEG` respectively.

## Output extensions

Output extensions match the lowercase `Format` case name, except `Format::JPEG`, which uses `.jpg`.
The selected format determines the final extension, regardless of the supplied filename.

## Format-specific results

- CSV output uses UTF-8, commas as field separators, double quotes as text delimiters, and the first worksheet only.
- TXT output is UTF-8.
- HTML output must be a single file. Separate images or other supporting files make the conversion fail.
- PNG, JPEG, SVG, and WebP produce one image. You cannot select a page, and the package does not guarantee
  which page LibreOffice uses from a multi-page source.
- Convert a multi-page Draw or PDF source to PDF when every page must remain in one output.
- PDF input belongs to the Draw family. Converting it does not perform OCR or reconstruct editable document
  structure.

A successful conversion produces one non-empty file within the size limit that passes the format checks.
It does not guarantee lossless conversion, identical appearance, or full Microsoft Office compatibility.
