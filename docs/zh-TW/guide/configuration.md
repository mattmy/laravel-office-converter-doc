# 設定參考

若能從 `PATH` 找到 LibreOffice console command，即可使用預設設定。需要變更 executable、timeout、
bytes 上限或暫存資料夾時，再發布設定。

## 發布設定

```bash
php artisan vendor:publish --tag=office-converter-config
```

## 設定項目

| Config key | 環境變數 | 預設值 | 影響 |
| --- | --- | --- | --- |
| `binary` | `LIBREOFFICE_BINARY` | Windows 為 `soffice.com`，其他平台為 `soffice` | 每次轉換使用的 executable |
| `timeout` | — | `60` 秒 | 一次轉換程序的最長執行時間 |
| `max_input_bytes` | — | 100 MiB | 接受的輸入快照大小上限 |
| `max_output_bytes` | — | 200 MiB | 接受的完成產物大小上限 |
| `temporary_directory` | — | `storage/framework/laravel-office-converter` | 轉換暫存檔案的上層資料夾 |

`binary` 必須是非空字串；`timeout` 必須是正整數或正浮點數；兩個 bytes 上限必須是正整數。
暫存資料夾必須是可建立、可寫入的本機絕對路徑。設定無效時，操作開始時會拋出
`EnvironmentUnavailable`。

輸出上限在 LibreOffice 結束後檢查，不會限制轉換進行期間使用的暫存磁碟空間。

## Executable 責任範圍

`LIBREOFFICE_BINARY` 可指向 LibreOffice，或應用程式自行選擇的相容 executable。套件不要求 wrapper、
supervisor 或 LibreOffice profile 政策；timeout 只適用於套件直接管理的 process，不保證終止完整
process tree。

每次 factory operation 開始時會讀取並驗證設定。設定可搭配 Laravel `config:cache` 使用。
