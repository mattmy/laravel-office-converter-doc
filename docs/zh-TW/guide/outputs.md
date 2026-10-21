# 取得與儲存輸出

`convertTo()` 回傳一次性的 `ConvertedOffice`。請選擇 `output()` 取得內容，或用 `storeAs()` 儲存，
同一個結果只能使用一次。

## 取得完整內容

```php
use Mattmy\OfficeConverter\Enums\Format;

$bytes = $document->convertTo(Format::PDF)->output();
```

`output()` 在讀取前重新檢查輸出檔案，回傳完整的二進位字串後清理暫存資料夾。
完整輸出會占用 PHP 記憶體；若只是要儲存，請用 `storeAs()`。

## 串流至 Laravel Storage

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

上例會儲存為 `converted-documents/quarterly-report.xlsx.docx`：保留傳入的檔名，再由
`Format::DOCX` 決定最後的副檔名。

```php
storeAs(string $path, ?string $filename = null, ?string $disk = null): string|false
```

- `$path` 是所選 disk 內的相對資料夾；`''` 表示根目錄，結尾的 `/` 會移除。
- `$filename` 可省略，傳入時須符合下方的安全檔名規則。
- `$disk` 為 `null` 時使用 Laravel 預設 disk。
- 回傳儲存路徑；Storage 驅動程式回報失敗時，回傳 `false`。

## 檔名範例

| 目標 | 傳入檔名 | 儲存檔名 |
| --- | --- | --- |
| `Format::DOCX` | `report` | `report.docx` |
| `Format::DOCX` | `png-38.jpg` | `png-38.jpg.docx` |
| `Format::DOCX` | `report.DOCX` | `report.docx` |
| `Format::HTML` | `report.docx` | `report.docx.html` |
| `Format::JPEG` | `preview.jpeg` | `preview.jpeg.jpg` |

省略 `$filename` 時，會使用來源檔名去掉最後副檔名後的名稱。沒有來源檔名或名稱不安全時，
改用 `converted-{16 個小寫十六進位字元}`。

## 安全路徑與檔名

資料夾路徑須使用 `/` 分隔；移除結尾的 `/` 後，不得含有空的路徑區段（例如 `a//b`）、`.` 或 `..`。
完整空字串可表示根目錄。絕對路徑、磁碟機路徑、反斜線、無效 UTF-8 與 Unicode 控制字元
（包含 NUL）都不接受。

檔名不得為空字串、`.` 或 `..`，也不得包含路徑分隔符、無效 UTF-8 或 Unicode 控制字元。
違規時會在呼叫 Storage 前拋出 `InvalidArgumentException`。

## 覆寫與失敗行為

`storeAs()` 沿用所選 disk 的覆寫行為，原樣回傳 `false` 或拋出 Storage／Flysystem 例外。
套件不提供不可分割寫入、失敗回復或自動重試，也不提供輸出 MIME 查詢方法或設定 Storage 的 Content-Type。

不論驗證或儲存成功、失敗，結果都不能再使用，套件也會清理自己的暫存資料夾。
需要重試儲存時，請重新建立輸入並執行轉換。
