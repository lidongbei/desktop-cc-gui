import type { EngineInfo } from "@/lib/ipc";

/** 工作区附加根（多根项目）在某引擎上的兑现程度，与后端
 *  `EngineInfo.supportsAdditionalRoots` 同义；缺省/未知一律按最保守的
 *  `"none"`。 */
export type AdditionalRootsSupport = "full" | "session" | "none";

/** 多根轻提示的判据：读 `engines` 里该引擎的能力位，不再按引擎 id 特判。
 *  完整支持（`full`）不提示；仅新建会话生效（`session`）与不支持（`none`）
 *  分别给出不同文案。`engines` 为空（listEngines 失败）时按 `none` 保守处理。 */
export function additionalRootsSupport(
  engines: EngineInfo[],
  engine: string,
): AdditionalRootsSupport {
  const value = engines.find((entry) => entry.id === engine)?.supportsAdditionalRoots;
  return value === "full" || value === "session" ? value : "none";
}
