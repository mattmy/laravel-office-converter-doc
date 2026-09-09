# 錯誤與疑難排解

套件例外都實作 `OfficeConverterException`，應用程式可以統一捕捉轉換錯誤，也可以分別處理特定分類。
Storage 與目的地錯誤刻意保留不同的契約。

## 處理轉換失敗

```php
use InvalidArgumentException;
use Mattmy\OfficeConverter\Contracts\OfficeConverterException;
use Mattmy\OfficeConverter\Exceptions\UnsupportedConversion;

try {
    $stored = $document->convertTo($format)->storeAs('converted');
} catch (UnsupportedConversion $exception) {
    return back()->withErrors(['format' => '此輸入不支援指定的輸出格式。']);
} catch (InvalidArgumentException $exception) {
    return back()->withErrors(['destination' => '請選擇安全的 Storage 目的地。']);
} catch (OfficeConverterException $exception) {
    report($exception);
}
```

請勿直接向終端使用者顯示例外細節。訊息已有長度限制並移除 workspace 路徑，但用途仍是 server-side
診斷。

## 例外分類

| 例外 | 代表意義 |
| --- | --- |
| `EnvironmentUnavailable` | 設定無效，或找不到／無法啟動 configured executable |
| `InvalidOfficeInput` | 來源、副檔名、大小、upload 或最低格式結構不被接受 |
| `UnsupportedConversion` | 輸入家族沒有提供指定的 `Format` |
| `ConversionFailed` | LibreOffice 失敗、timeout，或沒有產生唯一且有效的有界產物 |
| `AlreadyConsumed` | `OfficeDocument` 或 `ConvertedOffice` 在第一次操作後再次使用 |

`AlreadyConsumed` 也繼承 `LogicException`。`storeAs()` 另可能因目的地拋出 `InvalidArgumentException`，
也會原樣拋出 Laravel Storage 或 Flysystem 例外。Storage driver 也可能回傳 `false`。

## 找不到 LibreOffice

請確認 Windows 的 `soffice.com` 或其他平台的 `soffice` 位於 `PATH`，或將
`LIBREOFFICE_BINARY` 設為 executable 絕對路徑。

## 支援格式仍然失敗

套件沒有 LibreOffice 數字版本 gate。某個發行版可能缺少或變更必要 filter。請使用 configured
executable 直接確認相同轉換，並查看去敏後的 server-side 錯誤。實際 command capability 才是相容性
判準，因此這類失敗仍是 `ConversionFailed`。

## 含圖片的 HTML 轉換失敗

HTML 輸出必須是單一檔案。LibreOffice 另寫入圖片 sidecars 時，套件會拒絕整次轉換，避免回傳含有
失效引用的 HTML。請改用 PDF 或其他單檔目標。

## Storage 回傳 false 或拋出例外

覆寫與失敗行為由所選 disk 決定。結果已被消費且暫存 workspace 已清理，因此重試前必須重新建立
輸入並再次執行轉換。
