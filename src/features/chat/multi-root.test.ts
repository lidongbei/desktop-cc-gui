import { describe, expect, it } from "vitest";
import type { EngineInfo } from "@/lib/ipc";
import { additionalRootsSupport } from "./multi-root";

function engines(...entries: Array<Partial<EngineInfo> & { id: string }>): EngineInfo[] {
  return entries as EngineInfo[];
}

describe("additionalRootsSupport", () => {
  it("透传后端的 full / session，未知或缺失按 none", () => {
    const list = engines(
      { id: "codex", supportsAdditionalRoots: "full" },
      { id: "kimi", supportsAdditionalRoots: "session" },
      { id: "grok", supportsAdditionalRoots: "none" },
      { id: "pi" }, // 旧后端无此字段
    );
    expect(additionalRootsSupport(list, "codex")).toBe("full");
    expect(additionalRootsSupport(list, "kimi")).toBe("session");
    expect(additionalRootsSupport(list, "grok")).toBe("none");
    expect(additionalRootsSupport(list, "pi")).toBe("none");
  });

  it("引擎不在列表（含 listEngines 失败的空表）→ 保守 none", () => {
    expect(additionalRootsSupport([], "codex")).toBe("none");
    expect(additionalRootsSupport(engines({ id: "claude" }), "codex")).toBe("none");
  });
});
