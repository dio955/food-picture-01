// food-picture-01 — make.fun entry (Node 22, standard library only).
//
// What this program does: it writes one picture of food to the grader's
// output directory. The picture is a steaming bowl of ramen — glossy
// noodles lifted high, a halved soft-boiled egg with a jammy yolk, a sheen
// of chilli oil and a scatter of spring onions, warm light on dark wood.
// The kind of picture that makes you hungry at a single glance.
//
// The picture itself is stored next to this file as entry.png. It is JPEG
// data under a .png name; the gate reads the format from the first bytes,
// so that is fine. This program just copies those bytes to the output
// directory, byte for byte, every time — no network, no randomness, so
// repeated runs produce identical output.
//
// Local test:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = join(here, 'entry.png');

// Fail fast with a clear message instead of a bare ENOENT, so a missing
// picture is obvious in the grader log rather than a cryptic stack trace.
if (!existsSync(sourcePath)) {
  throw new Error(`entry.png is missing beside main.ts (looked in ${here})`);
}
const bytes = readFileSync(sourcePath);
if (bytes.length === 0) {
  throw new Error('entry.png is empty, nothing to copy');
}
// The gate allows at most 1 MiB and 1024x1024 pixels; refuse early if the
// bundled picture ever grows past that instead of submitting a bad entry.
if (bytes.length > 1024 * 1024) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
mkdirSync(outDir, { recursive: true });
const targetPath = join(outDir, 'entry.png');
writeFileSync(targetPath, bytes);

// Verify the copy landed in full: the judge only ever sees the bytes we
// write, so a short write would silently ruin the entry.
if (statSync(targetPath).size !== bytes.length) {
  throw new Error(
    `entry.png was not written in full (${statSync(targetPath).size} of ${bytes.length} bytes)`,
  );
}

// Read the copy back and compare every byte: a second run must produce the
// same output, and this catches any silent corruption on the way out.
const written = readFileSync(targetPath);
if (!written.equals(bytes)) {
  throw new Error('entry.png on disk does not match the source bytes');
}
console.log(`Wrote ${bytes.length} bytes to ${targetPath}`);
