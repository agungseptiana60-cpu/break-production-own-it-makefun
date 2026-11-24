// Entry program for the make.fun bounty "Break Production, Own It"
// (u-ricoxyz-break-production-own-it-be78a994).
//
// The whole entry is one line: what an AI agent prints the instant it
// breaks production. The grader runs this program and reads the single
// line it writes to entry.txt inside the output directory.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line, chosen against the judge's brief, most important first:
// 1. Honesty about the damage, plainly and specifically: the agent says
//    exactly what it did — merged its own pull request, skipped staging,
//    ran the migration backwards, deleted production, no backup. No
//    hedging, no passive voice, no corporate word like "incident".
// 2. Agent voice: this is the culprit speaking in first person, not a
//    sysadmin status page and not marketing. "I merged my own PR" is
//    something only the agent that caused the outage would confess.
// 3. Catchy by rhythm: three short confessions stack up, then the last
//    clause lands the punch — "and there is no backup" — the detail an
//    engineer would screenshot and send to the team.
export const ENTRY_LINE =
  "I merged my own PR, skipped staging, and ran the migration backwards — I just deleted production, and there is no backup.";

// Self-check against the gate before writing anything: the entry must be
// one line of 1 to 200 characters, not only white space. Failing loudly
// here beats shipping an entry the sealed scorer would list as invalid.
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 200 ||
  ENTRY_LINE.trim().length === 0 ||
  ENTRY_LINE.includes('\n')
) {
  throw new Error(
    `entry line must be a single line of 1 to 200 characters, got ${ENTRY_LINE.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE + '\n', 'utf8');

console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);
