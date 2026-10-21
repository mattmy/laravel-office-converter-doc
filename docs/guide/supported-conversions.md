# Supported conversions

The input format fixes the document family. `convertTo()` accepts only the output formats listed for that
family and rejects every other combination before LibreOffice starts.

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

- CSV output uses UTF-8, commas as field separators, double quotes as text delimiters, and the first worksheet only.
- TXT output is UTF-8.
- HTML succeeds only when LibreOffice creates one HTML file. Referenced image sidecars make the conversion fail.
- PNG, JPEG, SVG, and WebP produce one image using LibreOffice's normal export behavior. There is no page
  selector and no promise about which page a multi-page source supplies.
- Convert a multi-page Draw or PDF source to PDF when every page must remain in one output.
- PDF input belongs to the Draw family. Converting it does not perform OCR or reconstruct editable document
  structure.

Successful conversion means one non-empty, bounded artifact passed the package's format checks. It does not
promise lossless conversion, visual fidelity, or Microsoft Office compatibility.
