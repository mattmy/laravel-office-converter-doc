# API 參考

## 匯入類別

```php
use Illuminate\Http\UploadedFile;
use Mattmy\OfficeConverter\ConvertedOffice;
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Enums\InputFormat;
use Mattmy\OfficeConverter\Facades\Office;
use Mattmy\OfficeConverter\OfficeDocument;
```

以下列出方法簽章，方便查閱參數與回傳型別。

## 建立 OfficeDocument

```php
Office::fromPath(string $path): OfficeDocument
Office::fromContent(string $content, InputFormat $format): OfficeDocument
Office::fromUploadedFile(UploadedFile $file): OfficeDocument
```

- `fromPath()`：從可讀取、非符號連結的本機絕對路徑建立快照。
- `fromContent()`：從完整內容建立快照，須提供 `InputFormat`。
- `fromUploadedFile()`：從有效的 Laravel 上傳檔案建立快照，以原始副檔名判斷格式並驗證內容。

輸入格式與限制請看[選擇輸入方式](./inputs)及[支援的轉換](./supported-conversions)。

## 轉換 OfficeDocument

```php
$document->convertTo(Format $format): ConvertedOffice
```

執行轉換並回傳結果。同一個文件只能嘗試一次，失敗也不能重用。
不支援的輸入與輸出組合會在 LibreOffice 啟動前拋出 `UnsupportedConversion`。

可用的 `Format` 與輸入格式對照請看[支援的轉換](./supported-conversions)。

## 取得或儲存 ConvertedOffice

```php
$converted->output(): string
$converted->storeAs(
    string $path,
    ?string $filename = null,
    ?string $disk = null,
): string|false
```

- `output()`：回傳完整的二進位字串。
- `storeAs()`：串流至 Laravel Storage，回傳儲存路徑或 `false`。

兩個方法只能擇一呼叫一次，無論成功或失敗都會清理暫存檔案。
命名規則與範例請看[取得與儲存輸出](./outputs)。

## 例外

套件例外都實作 `Mattmy\OfficeConverter\Contracts\OfficeConverterException`：

- `EnvironmentUnavailable`
- `InvalidOfficeInput`
- `UnsupportedConversion`
- `ConversionFailed`
- `AlreadyConsumed`

這些類別位於 `Mattmy\OfficeConverter\Exceptions`。不合法的 Storage 目的地使用 PHP 的
`InvalidArgumentException`；Storage／Flysystem 例外原樣拋出。
處理範例請看[錯誤與疑難排解](./errors-and-troubleshooting)。

## Laravel 設定

設定檔為 `config/office-converter.php`，發布標籤為 `office-converter-config`。
`LIBREOFFICE_BINARY` 可覆寫執行檔位置。所有設定鍵與預設值請看[設定參考](./configuration)。
