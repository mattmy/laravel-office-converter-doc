# 支援的轉換

輸入格式會固定文件家族。`convertTo()` 只接受該家族表列的輸出格式；其他組合會在 LibreOffice
啟動前遭到拒絕。

## 完整 Input 到 Output 列表

| Input | 家族 | 支援的 `Format` outputs |
| --- | --- | --- |
| `InputFormat::ODT` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::DOC` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::DOCX` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::DOCM` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::RTF` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::TXT` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::HTML` | Writer | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| `InputFormat::ODS` | Calc | `PDF`、`ODS`、`XLSX`、`CSV` |
| `InputFormat::XLS` | Calc | `PDF`、`ODS`、`XLSX`、`CSV` |
| `InputFormat::XLSX` | Calc | `PDF`、`ODS`、`XLSX`、`CSV` |
| `InputFormat::XLSM` | Calc | `PDF`、`ODS`、`XLSX`、`CSV` |
| `InputFormat::CSV` | Calc | `PDF`、`ODS`、`XLSX`、`CSV` |
| `InputFormat::ODP` | Impress | `PDF`、`ODP`、`PPTX` |
| `InputFormat::PPT` | Impress | `PDF`、`ODP`、`PPTX` |
| `InputFormat::PPTX` | Impress | `PDF`、`ODP`、`PPTX` |
| `InputFormat::PPTM` | Impress | `PDF`、`ODP`、`PPTX` |
| `InputFormat::ODG` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |
| `InputFormat::PDF` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |
| `InputFormat::DXF` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |
| `InputFormat::SVG` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |
| `InputFormat::PNG` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |
| `InputFormat::JPEG` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |
| `InputFormat::WEBP` | Draw | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |

同一列包含相同格式時，允許同格式轉換。輸入檔名別名 `.htm` 與 `.jpeg` 分別對應
`InputFormat::HTML` 與 `InputFormat::JPEG`。

## 輸出檔名

| `Format` | Canonical 副檔名 | 可用輸入家族 |
| --- | --- | --- |
| `PDF` | `.pdf` | Writer、Calc、Impress、Draw |
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

最後副檔名由選擇的 `Format` 決定，不採用呼叫端提供的檔名決定格式。

## 各格式結果

- CSV 輸出使用 UTF-8、逗號、雙引號，且只包含第一個工作表。
- TXT 輸出使用 UTF-8。
- HTML 只有在 LibreOffice 產生單一 HTML 檔案時才成功；另產生圖片 sidecars 時會失敗。
- PNG、JPEG、SVG、WebP 使用 LibreOffice 的一般圖片輸出並只產生一張圖片。套件不提供選頁功能，
  也不保證多頁來源會選擇哪一頁。
- 多頁 Draw 或 PDF 需要將所有頁面保留在一個輸出時，請轉成 PDF。
- PDF 輸入屬於 Draw 家族；轉換不會執行 OCR，也不保證重建可編輯的文件結構。

轉換成功表示一個非空、未超限的產物通過套件格式檢查；不代表無損、視覺完全相同或完整相容
Microsoft Office。
