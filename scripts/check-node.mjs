import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

function normalizeVersion(version) {
  return version.trim().replace(/^v/, "");
}

export function checkNodeVersion({
  readFile = readFileSync,
  cwd = process.cwd(),
  currentVersion = process.versions.node,
  fallbackVersion = "24.11.1",
  logger = console,
} = {}) {
  const nvmrcPath = resolve(cwd, ".nvmrc");
  let required;

  try {
    required = normalizeVersion(readFile(nvmrcPath, "utf-8"));
  } catch {
    logger.warn(
      `.nvmrc not found; enforcing default required Node version ${fallbackVersion}.`,
    );
    required = fallbackVersion;
  }

  const current = normalizeVersion(currentVersion);
  const ok = current === required;

  if (!ok) {
    logger.error("Node version mismatch before running dev.");
    logger.error(`Required: ${required}`);
    logger.error(`Current : ${current}`);
    logger.error("Please switch to the project version first: nvm use");
  } else {
    logger.log(`Node version OK (${current}).`);
  }

  return { ok, required, current };
}

const thisFilePath = fileURLToPath(import.meta.url);

const invokedDirectly = process.argv[1] === thisFilePath;

if (invokedDirectly) {
  const { ok } = checkNodeVersion();
  if (!ok) process.exit(1);
}
