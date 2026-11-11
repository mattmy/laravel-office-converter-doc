# 開始使用

Laravel Office Converter 基於 LibreOffice，可轉換支援的文件、試算表、簡報、繪圖與圖片格式。
你可以從本機檔案、原始內容或 Laravel 上傳檔案開始轉換，再直接取得結果或透過 Laravel Storage
儲存。

## 系統需求

| 需求 | 支援版本或設定 |
| --- | --- |
| PHP | PHP 8.x 系列的 8.2 以上版本，並啟用 DOM、XML 與 ZIP |
| Laravel | 12 搭配 PHP 8.2 以上；13 搭配 PHP 8.3 以上 |
| 作業系統 | Windows、Linux 或 macOS |
| 外部指令 | LibreOffice 已加入 `PATH`，或透過 `LIBREOFFICE_BINARY` 指定位置 |

LibreOffice 須另外安裝。套件不檢查版本號碼，以實際能否完成轉換判斷相容性。

## 安裝套件

```bash
composer require mattmy/laravel-office-converter
```

## 安裝 LibreOffice

使用下列指令，或從 [LibreOffice 官網](https://www.libreoffice.org/download/)下載安裝程式。

### macOS

使用 [Homebrew LibreOffice cask](https://formulae.brew.sh/cask/libreoffice) 安裝：

```bash
brew install --cask libreoffice
```

未使用 Homebrew 時，請從 LibreOffice 官網下載 Apple Silicon 或 Intel 對應的 `.dmg`，再依官方說明
將 LibreOffice 移至 Applications。

### Ubuntu 與 Debian

安裝發行版提供的套件：

```bash
sudo apt update
sudo apt install libreoffice
```

### RHEL 與 Fedora

發行版的軟體來源有提供時，可直接安裝：

```bash
sudo dnf install libreoffice
```

RHEL 是否提供套件取決於版本與已啟用的軟體來源；找不到時，請依
[官方安裝說明](https://www.libreoffice.org/installation-instructions/)安裝 `.rpm` 套件。

### Windows

請從 LibreOffice 官網下載 Windows 安裝程式。若執行檔不在 `PATH`，請在 `.env` 加上路徑。
一般安裝位置的設定如下：

```dotenv
LIBREOFFICE_BINARY='C:\Program Files\LibreOffice\program\soffice.com'
```

請保留單引號，讓空白與反斜線能正確讀取；安裝在其他位置時，請改成實際路徑。

## 設定

套件預設在 Windows 使用 `soffice.com`，其他平台使用 `soffice`。若執行檔不在 `PATH`，
在 `.env` 指定路徑即可，不必先發布設定檔：

```dotenv
LIBREOFFICE_BINARY=/usr/bin/soffice
```

需要調整逾時時間、大小上限或暫存位置時，請看[設定參考](./configuration)。

## 快速開始

以下範例接收有效的 Laravel 上傳檔案、轉成 PDF，再串流至預設 Storage disk：

```php
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Facades\Office;

$path = Office::fromUploadedFile($request->file('document'))
    ->convertTo(Format::PDF)
    ->storeAs('converted-documents', 'report.pdf');
```

`$path` 是儲存路徑；所選 Storage 驅動程式回報失敗時則為 `false`。來源與轉換結果都是一次性物件，
轉換或儲存失敗後，須重新建立輸入並再次轉換。

## 下一步

- [選擇輸入來源](./inputs)。
- [查看所有支援的輸入到輸出轉換](./supported-conversions)。
- [讀取內容或儲存結果](./outputs)。
- [處理錯誤](./errors-and-troubleshooting)。
