# 設定參考

LibreOffice 已加入 `PATH` 時，可直接使用預設設定。若安裝在其他位置，在 `.env` 指定路徑即可：

```dotenv
LIBREOFFICE_BINARY=/usr/bin/soffice
```

## 發布設定檔

需要調整大小上限、逾時時間或暫存資料夾時，再發布 `config/office-converter.php`：

```bash
php artisan vendor:publish --tag=office-converter-config
```

## 設定項目

| 設定鍵 | 環境變數 | 預設值 | 用途 |
| --- | --- | --- | --- |
| `binary` | `LIBREOFFICE_BINARY` | Windows 為 `soffice.com`，其他平台為 `soffice` | 每次轉換使用的執行檔 |
| `timeout` | — | `60` 秒 | 一次轉換程序的最長執行時間 |
| `max_input_bytes` | — | 100 MiB | 輸入快照的大小上限 |
| `max_output_bytes` | — | 200 MiB | 轉換完成後的輸出大小上限 |
| `temporary_directory` | — | `storage/framework/laravel-office-converter` | 轉換暫存檔案的上層資料夾 |

`binary` 必須是非空字串；`timeout` 必須是有限的正整數或正浮點數；兩個大小上限必須是正整數，單位為位元組。
暫存資料夾必須是可建立、可寫入的本機絕對路徑。設定無效時會拋出 `EnvironmentUnavailable`。

輸出大小上限在 LibreOffice 結束後才檢查，不會限制轉換期間使用的磁碟空間。

## 執行範圍

`LIBREOFFICE_BINARY` 可指向 LibreOffice，或你自行選擇的相容執行檔。逾時控制只涵蓋套件直接管理的
程序，不保證終止所有衍生程序。其他執行環境設定由應用程式負責，詳見[效能與安全](./performance-and-security)。

每次建立輸入物件時，套件會讀取並驗證設定，後續轉換沿用同一份設定。可搭配 Laravel `config:cache` 使用。
