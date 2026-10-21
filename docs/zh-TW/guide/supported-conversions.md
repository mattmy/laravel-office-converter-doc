# 支援的轉換

輸入格式決定文件家族。`convertTo()` 只接受該家族表列的輸出格式；其他組合會在 LibreOffice
啟動前拋出 `UnsupportedConversion`。

## 輸入與輸出對照

下表輸入欄列出 `InputFormat`，輸出欄列出可用的 `Format`；同一列內的每種輸入都支援列出的輸出。

| 家族 | 輸入 | 可用輸出 |
| --- | --- | --- |
| Writer | `ODT`、`DOC`、`DOCX`、`DOCM`、`RTF`、`TXT`、`HTML` | `PDF`、`ODT`、`DOCX`、`RTF`、`TXT`、`HTML` |
| Calc | `ODS`、`XLS`、`XLSX`、`XLSM`、`CSV` | `PDF`、`ODS`、`XLSX`、`CSV` |
| Impress | `ODP`、`PPT`、`PPTX`、`PPTM` | `PDF`、`ODP`、`PPTX` |
| Draw | `ODG`、`PDF`、`DXF`、`SVG`、`PNG`、`JPEG`、`WEBP` | `PDF`、`ODG`、`PNG`、`JPEG`、`SVG`、`WEBP` |

允許轉成相同格式，例如 DOCX → DOCX。輸入副檔名 `.htm` 與 `.jpeg` 分別對應
`InputFormat::HTML` 與 `InputFormat::JPEG`。

## 輸出檔名

| `Format` | 副檔名 | 可用輸入家族 |
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

最後的副檔名由 `Format` 決定，與傳入的檔名無關。

## 各格式的限制

- CSV 輸出使用 UTF-8，以逗號分隔欄位、雙引號包住文字，且只包含第一個工作表。
- TXT 輸出使用 UTF-8。
- HTML 只有在 LibreOffice 產生單一 HTML 檔案時才成功；另產生圖片等附屬檔案時會失敗。
- PNG、JPEG、SVG、WebP 使用 LibreOffice 的一般圖片輸出並只產生一張圖片。套件不提供選頁功能，
  也不保證多頁來源會選擇哪一頁。
- 多頁 Draw 或 PDF 需要將所有頁面保留在一個輸出時，請轉成 PDF。
- PDF 輸入屬於 Draw 家族；轉換不會執行 OCR，也不保證重建可編輯的文件結構。

轉換成功表示一個非空、未超限的產物通過套件格式檢查；不代表無損、視覺完全相同或完整相容
Microsoft Office。
