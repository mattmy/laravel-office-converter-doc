# 選擇輸入方式

三種輸入方式都會建立含有來源快照的 `OfficeDocument`。之後修改原始檔案，不會影響已建立的快照。

## 本機絕對路徑

```php
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromPath(storage_path('app/private/report.docx'));
```

路徑必須是絕對路徑，並指向可讀取、非符號連結的一般檔案。不接受相對路徑、URL、資料夾、
Storage 內的相對路徑或 Windows UNC 路徑。應用程式須自行確認呼叫端有權讀取該檔案。

套件先以檔名最後一段副檔名判斷格式，再檢查內容。副檔名不區分 ASCII 大小寫；`.htm` 視為 HTML，
`.jpeg` 視為 JPEG。

## 原始內容

```php
use Mattmy\OfficeConverter\Enums\InputFormat;
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromContent($bytes, InputFormat::DOCX);
```

必須提供 `InputFormat`，套件不會自行猜測格式。完整的 `$bytes` 字串會占用 PHP 記憶體。

## Laravel 上傳檔案

```php
use Mattmy\OfficeConverter\Facades\Office;

$document = Office::fromUploadedFile($request->file('document'));
```

上傳檔案必須有效且可讀取。套件會依原始檔名的副檔名判斷格式，再驗證內容，不會只信任副檔名或
瀏覽器提供的 MIME 類型。

將檔案交給套件前，請先完成請求授權與應用程式自己的上傳大小驗證。

## 格式檢查

完整格式與可用輸出請看[支援的轉換](./supported-conversions)。無論採用哪種輸入方式，TXT 與 CSV
都須使用 UTF-8。舊版 DOC、XLS、PPT 只檢查 OLE 容器識別碼；若實際文件家族不符，可能要等
LibreOffice 讀取時才以 `ConversionFailed` 失敗。

## 只能轉換一次

同一個 `OfficeDocument` 只能呼叫一次 `convertTo()`，即使目標不支援或轉換失敗也不能重用：

```php
use Mattmy\OfficeConverter\Enums\Format;

$result = $document->convertTo(Format::PDF);
```

需要重試或轉成另一種格式時，請重新建立輸入物件。
