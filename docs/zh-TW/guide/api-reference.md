# API 參考

本頁列出 Laravel 應用程式可使用的公開 API。各連結指南會說明輸入、轉換、交付與錯誤行為。

## 建立 OfficeDocument

```php
Office::fromPath(string $path): OfficeDocument
Office::fromContent(string $content, InputFormat $format): OfficeDocument
Office::fromUploadedFile(UploadedFile $file): OfficeDocument
```

- `fromPath()` 建立本機絕對路徑所指向之可讀、非 symbolic-link 檔案的快照。
- `fromContent()` 依必要的明確 `InputFormat` 建立完整 bytes 快照。
- `fromUploadedFile()` 建立有效 Laravel upload 的快照，並以原始副檔名作為格式候選。

詳見[選擇輸入方式](./inputs)。`InputFormat` cases：

```text
ODT DOC DOCX DOCM RTF TXT HTML
ODS XLS XLSX XLSM CSV
ODP PPT PPTX PPTM
ODG PDF DXF SVG PNG JPEG WEBP
```

## 轉換 OfficeDocument

```php
$document->convertTo(Format $format): ConvertedOffice
```

依輸入家族轉換一次。目標不支援時，會在 LibreOffice 啟動前拋出 `UnsupportedConversion`。詳見
[完整轉換矩陣](./supported-conversions)。

`Format` cases：

```text
PDF ODT DOCX RTF TXT HTML ODS XLSX CSV ODP PPTX ODG PNG JPEG SVG WEBP
```

## 消費 ConvertedOffice

```php
$converted->output(): string
$converted->storeAs(
    string $path,
    ?string $filename = null,
    ?string $disk = null,
): string|false
```

- `output()` 回傳全部產物 bytes。
- `storeAs()` 串流至 Laravel Storage disk，並回傳 driver 的路徑或 `false`。

`output()` 與 `storeAs()` 只能擇一呼叫一次。無論成功或失敗，兩者都會消費結果並清除暫存的轉換
檔案。詳見[取得與儲存輸出](./outputs)。

## 例外

套件例外 marker：

```php
Mattmy\OfficeConverter\Contracts\OfficeConverterException
```

實作包括 `EnvironmentUnavailable`、`InvalidOfficeInput`、`UnsupportedConversion`、
`ConversionFailed` 與 `AlreadyConsumed`。Storage 目的地驗證使用 PHP `InvalidArgumentException`；
Storage／Flysystem failures 不會被轉換。詳見[錯誤與疑難排解](./errors-and-troubleshooting)。

## Laravel 整合

Publish tag：

```text
office-converter-config
```

環境變數：

```text
LIBREOFFICE_BINARY
```

Config keys 與預設值請看[設定參考](./configuration)。
