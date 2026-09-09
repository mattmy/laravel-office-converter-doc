# 開始使用

Laravel Office Converter 基於 LibreOffice，可轉換支援的文件、試算表、簡報、繪圖與圖片格式。
你可以從本機檔案、原始內容或 Laravel 上傳檔案開始轉換，再直接取得結果或透過 Laravel Storage
儲存。

## 系統需求

| 需求 | 支援版本或設定 |
| --- | --- |
| PHP | PHP 8.x 系列的 8.3 以上版本，並啟用 DOM 與 ZIP |
| Laravel | 12 或 13 |
| 作業系統 | Windows、Linux 或 macOS |
| 外部指令 | LibreOffice 已加入 `PATH`，或透過 `LIBREOFFICE_BINARY` 指定位置 |

LibreOffice 由使用者另外安裝。套件以實際 command 與 filters 能否完成轉換判斷相容性，不要求或
解析 LibreOffice 數字版本。

## 安裝套件

開始安裝：

```bash
composer require mattmy/laravel-office-converter
```

## 安裝 LibreOffice

請使用作業系統的套件管理工具，或從
[LibreOffice 官方下載頁](https://www.libreoffice.org/download/)取得預先建置的安裝程式。
[官方安裝說明](https://www.libreoffice.org/installation-instructions/)另有 macOS、Linux 與 Windows
的詳細步驟；不需要自行編譯 LibreOffice。

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

Ubuntu 可在[官方套件索引](https://packages.ubuntu.com/search?keywords=libreoffice)查詢 LibreOffice，
Debian 則可透過一般套件 repository 安裝。也可以從 LibreOffice 官方下載頁取得預先建置的 `.deb`
套件。

### RHEL 與 Fedora

已啟用的發行版 repository 有提供時，可直接安裝：

```bash
sudo dnf install libreoffice
```

Fedora 可在[官方套件索引](https://packages.fedoraproject.org/pkgs/libreoffice/libreoffice/)查詢
LibreOffice。RHEL 能否直接安裝會依版本與已啟用的訂閱 repository 而異；找不到套件時，請改用
LibreOffice 官方下載頁提供的預先建置 `.rpm`，並依官方安裝說明操作。

### Windows

請從 LibreOffice 官網下載 Windows 安裝程式，再依安裝精靈完成安裝。Console executable 通常位於：

```text
C:\Program Files\LibreOffice\program\soffice.com
```

若該 executable 不在 `PATH`，請在 Laravel 環境將 `LIBREOFFICE_BINARY` 設為上述路徑。

套件不要求或解析 LibreOffice 數字版本；實際 command 與 filters 能否完成指定轉換，才是相容性判準。

## 設定

套件預設在 Windows 使用 `soffice.com`，其他平台使用 `soffice`。LibreOffice 位於其他位置或需要
調整限制時，再發布設定：

```bash
php artisan vendor:publish --tag=office-converter-config
```

```dotenv
LIBREOFFICE_BINARY=/usr/bin/soffice
```

所有選項與 configured executable 的責任邊界請看[設定參考](./configuration)。

## 快速開始

以下範例接收有效的 Laravel 上傳檔案、轉成 PDF，再串流至預設 Storage disk：

```php
use Mattmy\OfficeConverter\Enums\Format;
use Mattmy\OfficeConverter\Facades\Office;

$path = Office::fromUploadedFile($request->file('document'))
    ->convertTo(Format::PDF)
    ->storeAs('converted-documents', 'report.pdf');
```

`$path` 是儲存路徑；所選 Storage driver 回報失敗時則為 `false`。來源與轉換結果都是一次性物件，
轉換或交付失敗後必須重新開始。

## 下一步

- [選擇輸入來源](./inputs)。
- [查看所有支援的輸入到輸出轉換](./supported-conversions)。
- [讀取 bytes 或儲存結果](./outputs)。
- [處理錯誤](./errors-and-troubleshooting)。
