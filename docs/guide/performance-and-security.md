# Performance and security

## Execution environment

Conversions run synchronously, starting the configured executable each time. The package validates input and
output, applies a timeout, and cleans its temporary files. Your application manages sandboxing, LibreOffice
profiles, macro policies, network permissions, and operating-system resource limits.

The timeout stops only the process the package directly manages; it does not guarantee that every child
process stops.

## Memory and temporary disk

- Every source is copied to a separate temporary workspace.
- `fromContent()` holds the complete input string in PHP memory; `output()` loads the complete output.
- If you only need to save the result, `storeAs()` streams it without loading the complete output into memory.
- `max_output_bytes` is checked after conversion, so it does not limit disk use while LibreOffice runs.

Plan memory, temporary disk space, and process capacity around your document sizes and concurrent conversions.

## Limits of format validation

The package checks basic file structure. Passing validation does not prove a file is safe. Conversion also
does not guarantee preservation of layout, fonts, formulas, macros, links, animations, or images. PDF conversion
does not provide OCR or document structure reconstruction.

Before deployment, test representative files covering the languages, layouts, fonts, and formulas you expect.

## Paths and privacy

Pass only local paths your application has authorized. Avoid logging document content, sensitive filenames,
server paths, or unsanitized process output. Apply your application's access and retention policies to stored
conversions too.
