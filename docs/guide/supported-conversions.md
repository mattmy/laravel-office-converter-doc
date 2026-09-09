# Supported conversions

The input format fixes the document family. `convertTo()` accepts only the output formats listed for that
family and rejects every other combination before LibreOffice starts.

## Complete input-to-output list

| Input | Family | Supported `Format` outputs |
| --- | --- | --- |
| `InputFormat::ODT` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::DOC` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::DOCX` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::DOCM` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::RTF` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::TXT` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::HTML` | Writer | `PDF`, `ODT`, `DOCX`, `RTF`, `TXT`, `HTML` |
| `InputFormat::ODS` | Calc | `PDF`, `ODS`, `XLSX`, `CSV` |
| `InputFormat::XLS` | Calc | `PDF`, `ODS`, `XLSX`, `CSV` |
| `InputFormat::XLSX` | Calc | `PDF`, `ODS`, `XLSX`, `CSV` |
| `InputFormat::XLSM` | Calc | `PDF`, `ODS`, `XLSX`, `CSV` |
| `InputFormat::CSV` | Calc | `PDF`, `ODS`, `XLSX`, `CSV` |
| `InputFormat::ODP` | Impress | `PDF`, `ODP`, `PPTX` |
| `InputFormat::PPT` | Impress | `PDF`, `ODP`, `PPTX` |
| `InputFormat::PPTX` | Impress | `PDF`, `ODP`, `PPTX` |
| `InputFormat::PPTM` | Impress | `PDF`, `ODP`, `PPTX` |
| `InputFormat::ODG` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |
| `InputFormat::PDF` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |
| `InputFormat::DXF` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |
| `InputFormat::SVG` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |
| `InputFormat::PNG` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |
| `InputFormat::JPEG` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |
| `InputFormat::WEBP` | Draw | `PDF`, `ODG`, `PNG`, `JPEG`, `SVG`, `WEBP` |

Converting to the same format is allowed when it appears in the row. Input filename aliases `.htm` and
`.jpeg` resolve to `InputFormat::HTML` and `InputFormat::JPEG` respectively.

## Output filenames

| `Format` | Canonical extension | Available from |
| --- | --- | --- |
| `PDF` | `.pdf` | Writer, Calc, Impress, Draw |
| `ODT` | `.odt` | Writer |
| `DOCX` | `.docx` | Writer |
| `RTF` | `.rtf` | Writer |
| `TXT` | `.txt` | Writer |
| `HTML` | `.html` | Writer |
| `ODS` | `.ods` | Calc |
| `XLSX` | `.xlsx` | Calc |
| `CSV` | `.csv` | Calc |
| `ODP` | `.odp` | Impress |
| `PPTX` | `.pptx` | Impress |
| `ODG` | `.odg` | Draw |
| `PNG` | `.png` | Draw |
| `JPEG` | `.jpg` | Draw |
| `SVG` | `.svg` | Draw |
| `WEBP` | `.webp` | Draw |

The selected `Format`, not a caller-provided filename, controls the final extension.

## Format-specific results

- CSV output is UTF-8, comma-delimited, double-quoted, and contains the first worksheet.
- TXT output is UTF-8.
- HTML succeeds only when LibreOffice creates one HTML file. Referenced image sidecars make the conversion fail.
- PNG, JPEG, SVG, and WebP produce one image using LibreOffice's normal export behavior. There is no page
  selector and no promise about which page a multi-page source supplies.
- Convert a multi-page Draw or PDF source to PDF when every page must remain in one output.
- PDF input belongs to the Draw family. Converting it does not perform OCR or reconstruct editable document
  structure.

Successful conversion means one non-empty, bounded artifact passed the package's format checks. It does not
promise lossless conversion, visual fidelity, or Microsoft Office compatibility.
