# 取得與儲存輸出

`convertTo()` 回傳一次性的 `ConvertedOffice`。請在 `output()` 與 `storeAs()` 之間選擇一個 terminal
operation。

## 讀取全部 bytes

```php
use Mattmy\OfficeConverter\Enums\Format;

$bytes = $document->convertTo(Format::PDF)->output();
```

`output()` 回傳完整 binary string，接著清理套件 workspace。讀取前會再次檢查產物。只有在完整輸出
可安全放入 PHP 記憶體時才使用此方法。

## 串流至 Laravel Storage

```php
$storedPath = $document
    ->convertTo(Format::DOCX)
    ->storeAs(
        path: 'converted-documents',
        filename: 'quarterly-report.xlsx',
        disk: 's3',
    );
```

上例會儲存為 `converted-documents/quarterly-report.xlsx.docx`。檔名只是名稱，不是選擇輸出格式的
授權；可信的 `.docx` 來自 `Format::DOCX`。

方法 signature：

```php
storeAs(string $path, ?string $filename = null, ?string $disk = null): string|false
```

- `$path` 是所選 disk 內的相對資料夾；`''` 表示 disk 根目錄，結尾的 `/` 會被正規化。
- `$filename` 是 optional 安全檔名；既有的其他副檔名文字會保留。
- `$disk` 選擇 Laravel filesystem disk；`null` 使用預設 disk。
- 回傳值是 Laravel Storage 的儲存路徑，或所選 driver 回傳的 `false`。

## 檔名範例

| 目標 | 傳入檔名 | 儲存檔名 |
| --- | --- | --- |
| `Format::DOCX` | `report` | `report.docx` |
| `Format::DOCX` | `png-38.jpg` | `png-38.jpg.docx` |
| `Format::DOCX` | `report.DOCX` | `report.docx` |
| `Format::HTML` | `report.docx` | `report.docx.html` |
| `Format::JPEG` | `preview.jpeg` | `preview.jpeg.jpg` |

省略 `$filename` 時會優先使用安全的來源檔名 stem。Raw content、遺失或不安全的來源 stem 會改用
`converted-{16 個小寫十六進位字元}`。

## 安全目的地

資料夾路徑必須是相對路徑、使用正斜線，而且不得包含空 segment、`.` 或 `..` segment。絕對路徑、drive
path、反斜線、NUL 與 Unicode control characters 都會遭到拒絕。檔名不得為空字串、`.` 或 `..`，
也不得包含路徑分隔符或 Unicode control characters。

不安全目的地會在呼叫 Storage 前拋出 PHP `InvalidArgumentException`。

## Storage 行為

`storeAs()` 沿用所選 Laravel Storage driver 的行為：

- 不檢查目的地是否已存在；
- 不防止覆寫，也不在覆寫失敗時 rollback；
- 不提供 atomic publish、lock、conditional create 或 retry；
- driver 回傳 `false` 時原樣回傳；
- Laravel Storage 與 Flysystem 例外原樣拋出；
- 不設定 Content-Type metadata。

無論 Storage 成功、回傳 `false` 或拋出例外，輸出都會被消費並清理 package workspace。重新交付前
必須再次執行轉換。
