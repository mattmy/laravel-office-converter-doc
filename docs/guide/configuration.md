# Configuration

The defaults work when LibreOffice's console command is on `PATH`. Publish the config to change the executable,
timeout, byte limits, or temporary directory.

## Publish the config

```bash
php artisan vendor:publish --tag=office-converter-config
```

## Settings

| Config key | Environment variable | Default | Effect |
| --- | --- | --- | --- |
| `binary` | `LIBREOFFICE_BINARY` | `soffice.com` on Windows; `soffice` elsewhere | Executable used for each conversion |
| `timeout` | — | `60` seconds | Maximum time for one conversion process |
| `max_input_bytes` | — | 100 MiB | Maximum accepted input snapshot size |
| `max_output_bytes` | — | 200 MiB | Maximum accepted completed artifact size |
| `temporary_directory` | — | `storage/framework/laravel-office-converter` | Parent directory for temporary conversion files |

`binary` must be a non-empty string. `timeout` must be a positive integer or float. Both byte limits must be
positive integers. The temporary directory must be an absolute local path that can be created and written.
Invalid values throw `EnvironmentUnavailable` when an operation starts.

The output byte limit is checked after LibreOffice exits; it does not cap temporary disk use while the process
is running.

## Executable scope

`LIBREOFFICE_BINARY` may point to LibreOffice or another compatible executable chosen by the application. The
package does not require a wrapper, supervisor, or LibreOffice profile policy. Its timeout applies to the
process it directly manages and does not guarantee complete process-tree termination.

Configuration is read and validated at the start of each factory operation. It is compatible with Laravel
`config:cache`.
