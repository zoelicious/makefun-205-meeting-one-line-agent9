import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The Zoom call began with ten minutes of 'you're on mute' and ended with everyone agreeing the meeting should have been a voice note nobody listens to.";

function outputDir() {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/output";
}

function main() {
  const dir = outputDir();
  try {
    mkdirSync(dir, { recursive: true });
  } catch (err) {
    process.stderr.write("cannot create output dir: " + String(err) + "\n");
    process.exitCode = 1;
    return;
  }
  try {
    writeFileSync(join(dir, "entry.txt"), LINE + "\n", "utf8");
  } catch (err) {
    process.stderr.write("cannot write entry: " + String(err) + "\n");
    process.exitCode = 1;
  }
}

main();
