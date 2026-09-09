# Performance and security

Office conversion executes a native parser against complex input. Treat every upload, source file, diagnostic,
and generated artifact as untrusted.

## Execution scope

Conversions are synchronous. The package executes the configured command, validates one output artifact, and
optionally streams it to Laravel Storage. It does not configure or require a sandbox, LibreOffice profile,
macro policy, network policy, operating-system limits, or process supervisor. The application owns those
execution-environment decisions.

## Memory and temporary disk

- Every accepted source is copied into a private workspace.
- `fromContent()` receives a complete string already held in PHP memory.
- `output()` loads the complete converted artifact into PHP memory.
- `storeAs()` streams the artifact to Laravel Storage.
- `max_output_bytes` validates the completed artifact and does not cap temporary disk use during conversion.

Keep positive byte limits. Capacity planning for PHP memory, temporary disk, and concurrent processes belongs
to the application.

## Input and output trust

File extensions and upload MIME values are not sufficient proof of a format. The package performs bounded
structural checks, but successful validation or conversion does not prove that:

- the source is safe or contains no parser exploit;
- every feature, font, formula, macro, link, animation, or image was preserved;
- the output is lossless or visually identical to Microsoft Office;
- a PDF-to-Draw conversion reconstructed editable structure or performed OCR.

Test with representative documents from the tools and workflows your application actually supports, including
the languages, layouts, fonts, and formulas your users rely on.

## Paths, logging, and privacy

Only pass local paths that application code has authorized. Do not log complete input or output bytes, original
filenames, server paths, document text, or unsanitized external-process output. Apply your normal retention and
access policy to stored conversions, which may contain personal or confidential data.
