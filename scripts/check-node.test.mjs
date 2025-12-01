import { fileURLToPath } from "url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkNodeVersion } from "./check-node.mjs";

vi.mock("fs", () => ({
  readFileSync: vi.fn(),
}));

const logger = () => ({
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
});

const moduleUrl = new URL("./check-node.mjs", import.meta.url);
const modulePath = fileURLToPath(moduleUrl);

let originalArgv = [...process.argv];

beforeEach(() => {
  originalArgv = [...process.argv];
  vi.clearAllMocks();
});

afterEach(() => {
  process.argv = originalArgv;
  import("fs").then(({ readFileSync }) => readFileSync.mockReset());
  vi.restoreAllMocks();
});

describe("checkNodeVersion", () => {
  it("passes when current version matches required", () => {
    const loggers = logger();
    const result = checkNodeVersion({
      readFile: () => "v24.11.1",
      currentVersion: "24.11.1",
      logger: loggers,
    });

    expect(result).toEqual({
      ok: true,
      required: "24.11.1",
      current: "24.11.1",
    });
    expect(loggers.log).toHaveBeenCalledWith(
      "Node version OK (24.11.1).",
    );
    expect(loggers.error).not.toHaveBeenCalled();
    expect(loggers.warn).not.toHaveBeenCalled();
  });

  it("fails when versions differ", () => {
    const loggers = logger();
    const result = checkNodeVersion({
      readFile: () => "v24.11.1",
      currentVersion: "24.10.0",
      logger: loggers,
    });

    expect(result).toEqual({
      ok: false,
      required: "24.11.1",
      current: "24.10.0",
    });
    expect(loggers.error).toHaveBeenCalledWith(
      "Node version mismatch before running dev.",
    );
  });

  it("uses fallback when .nvmrc is missing", () => {
    const loggers = logger();
    const result = checkNodeVersion({
      readFile: () => {
        throw new Error("missing");
      },
      currentVersion: "24.11.1",
      fallbackVersion: "24.11.1",
      logger: loggers,
    });

    expect(result).toEqual({
      ok: true,
      required: "24.11.1",
      current: "24.11.1",
    });
    expect(loggers.warn).toHaveBeenCalledWith(
      ".nvmrc not found; enforcing default required Node version 24.11.1.",
    );
  });
});

describe("check-node direct invocation", () => {
  it("exits with code 1 when versions mismatch", async () => {
    vi.resetModules();
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { readFileSync } = await import("fs");
    readFileSync.mockReturnValue("0.0.0");

    process.argv[1] = modulePath;
    await import("./check-node.mjs"); // 👈 ตรงนี้

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("does not exit when versions match", async () => {
    vi.resetModules();
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});

    const { readFileSync } = await import("fs");
    readFileSync.mockReturnValue(process.versions.node);

    process.argv[1] = modulePath;
    await import("./check-node.mjs"); // 👈 ตรงนี้เหมือนกัน

    expect(exitSpy).not.toHaveBeenCalled();
  });
});
