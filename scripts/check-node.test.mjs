import { describe, expect, it, vi } from "vitest";
import { checkNodeVersion } from "./check-node.mjs";

const logger = () => ({
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
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
    expect(loggers.log).toHaveBeenCalledWith("Node version OK (24.11.1).");
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
