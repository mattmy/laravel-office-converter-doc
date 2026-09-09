# 選擇輸入方式

每個輸入方法都會建立含有來源快照的 `OfficeDocument`。原始路徑或上傳檔案之後發生變更，不會改變
已建立的快照。

## 本機絕對路徑

```php
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromPath(storage_path('app/private/report.docx'));
```

路徑必須是絕對路徑，並指向可讀取、非 symbolic link 的 regular file。不接受相對路徑、URL、
資料夾、Storage-relative path 或 Windows UNC path。應用程式仍須負責授權呼叫端可以要求哪些本機路徑。

檔名最後一段副檔名決定候選 `InputFormat`，並以不區分 ASCII 大小寫的方式比對。`.htm` 視為 HTML，
`.jpeg` 視為 JPEG。LibreOffice 啟動前，套件也會檢查檔案內容。

## 原始 bytes

```php
use Mattmy\OfficeConverter\Enums\InputFormat;
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromContent($bytes, InputFormat::DOCX);
```

原始 bytes 一律需要明確提供 `InputFormat`。OLE、ZIP 等 container 無法毫無歧義地推斷所有文件家族。
完整 `$bytes` string 此時已占用 PHP 記憶體。

## Laravel 上傳檔案

```php
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromUploadedFile($request->file('document'));
```

Upload 必須有效且可讀取。原始檔名提供候選副檔名，但副檔名與 client MIME type 都不能單獨證明格式；
套件也會驗證內容。

將檔案交給套件前，請先完成 request 授權與應用程式自己的上傳大小限制。

## 接受的輸入格式

| 家族 | `InputFormat` cases |
| --- | --- |
| Writer | `ODT`、`DOC`、`DOCX`、`DOCM`、`RTF`、`TXT`、`HTML` |
| Calc | `ODS`、`XLS`、`XLSX`、`XLSM`、`CSV` |
| Impress | `ODP`、`PPT`、`PPTX`、`PPTM` |
| Draw | `ODG`、`PDF`、`DXF`、`SVG`、`PNG`、`JPEG`、`WEBP` |

輸入家族決定可用的輸出，完整列表請看[支援的轉換](./supported-conversions)。

## 一次轉換嘗試

同一個 `OfficeDocument` 只能呼叫一次 `convertTo()`。即使目標不支援或 LibreOffice 失敗，第一次嘗試
仍會消費物件：

```php
$result = $document->convertTo(Format::PDF);
```

需要重試時，請重新建立輸入快照。
