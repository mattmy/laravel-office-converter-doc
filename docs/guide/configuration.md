# Configuration

The defaults work when LibreOffice is on `PATH`. Otherwise, set its path in `.env`:

```dotenv
LIBREOFFICE_BINARY=/usr/bin/soffice
```

## Publish the config

To change the limits or temporary directory, publish `config/office-converter.php`:

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

HTML and SVG inputs and outputs have an additional 4 MiB limit. Increasing the byte limits above does not
raise this format-specific limit.

`binary` must be a non-empty string. `timeout` must be a finite positive integer or float. Both byte limits must be
positive integers. The temporary directory must be an absolute local path that can be created and written.
Invalid values throw `EnvironmentUnavailable` when an operation starts.

The output byte limit is checked after LibreOffice exits; it does not cap temporary disk use while the process
is running.

## Executable scope

`LIBREOFFICE_BINARY` can point to LibreOffice or a compatible executable of your choice. The timeout only
stops the process the package directly manages; it does not guarantee that all child processes stop.
See [Performance and security](./performance-and-security) for environment responsibilities.

Settings are read and validated when you create an input object, and stay the same for that conversion.
Laravel `config:cache` is supported.
