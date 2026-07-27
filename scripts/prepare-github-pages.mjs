import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const projectPath = "/personalwebsite/";
const textExtensions = new Set([".css", ".html", ".js"]);

async function rewritePublicPaths(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewritePublicPaths(entryPath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name))) continue;

    const source = await readFile(entryPath, "utf8");
    const rewritten = source.replace(
      /(["'(])\/(?!personalwebsite\/)(?=[A-Za-z0-9._#-])/g,
      `$1${projectPath}`,
    );
    if (rewritten !== source) await writeFile(entryPath, rewritten);
  }
}

await rewritePublicPaths(outputDirectory);
