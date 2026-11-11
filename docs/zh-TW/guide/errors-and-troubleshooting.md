# 錯誤與疑難排解

套件錯誤可透過 `OfficeConverterException` 統一捕捉。不合法的 Storage 目的地會拋出
`InvalidArgumentException`；Storage 與 Flysystem 例外則原樣拋出。

## 處理轉換失敗

```php
use Mattmy\OfficeConverter\Contracts\OfficeConverterException;
use Mattmy\OfficeConverter\Exceptions\UnsupportedConversion;
use Mattmy\OfficeConverter\Facades\Office;

try {
    $document = Office::fromUploadedFile($request->file('document'));
    $stored = $document->convertTo($format)->storeAs('converted');

    if ($stored === false) {
        return back()->withErrors(['storage' => '轉換後的檔案無法儲存。']);
    }
} catch (UnsupportedConversion $exception) {
    return back()->withErrors(['format' => '此輸入不支援指定的輸出格式。']);
} catch (OfficeConverterException $exception) {
    report($exception);
}
```

上例使用固定的儲存位置。若位置來自使用者輸入，請先驗證，並另外處理 `InvalidArgumentException`。
Storage 例外仍由應用程式的錯誤處理流程接手。

例外訊息供伺服器診斷使用，請勿直接顯示給使用者。

## 例外分類

| 例外 | 原因 |
| --- | --- |
| `EnvironmentUnavailable` | 設定無效，或找不到、無法啟動設定的執行檔 |
| `InvalidOfficeInput` | 來源不存在、不可讀、上傳無效、超限，或格式不符 |
| `UnsupportedConversion` | 輸入家族不支援指定的 `Format` |
| `ConversionFailed` | 轉換失敗、逾時，或輸出檔案遺失、無效、超限、超過一個 |
| `AlreadyConsumed` | 再次使用已用過的 `OfficeDocument` 或 `ConvertedOffice` |

`AlreadyConsumed` 也繼承 `LogicException`。`storeAs()` 除了可能拋出例外，也可能回傳 `false`，
呼叫端須檢查回傳值。

## 找不到 LibreOffice

確認 Windows 的 `soffice.com` 或其他平台的 `soffice` 位於 `PATH`，或將
`LIBREOFFICE_BINARY` 設為執行檔的絕對路徑。

## 支援的格式仍然轉換失敗

確認設定的 LibreOffice 執行檔能完成相同轉換，並查看伺服器上的錯誤訊息。
套件不依版本號碼判斷相容性；缺少必要轉換篩選器或指令不相容時，會拋出 `ConversionFailed`。

## 轉成 HTML 時因圖片失敗

HTML 輸出須為單一檔案。若 LibreOffice 另產生圖片等附屬檔案，套件會判定轉換失敗。
請改用 PDF 或其他單檔格式。

## Storage 回傳 false 或拋出例外

檢查所選 disk 的連線、權限與設定。結果已使用且暫存檔案已清理，重試前須重新建立輸入並再次轉換。
