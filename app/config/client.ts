import { BuildConfig, getBuildConfig } from "./build";

// 这段代码定义了一个函数 `getClientConfig`，用于获取客户端配置。
// 如果代码在客户端运行（即 `typeof document !== "undefined"`），则从 HTML 的 meta 标签中解析配置。
// 如果代码在服务器端运行（即 `typeof process !== "undefined"`），则调用 `getBuildConfig` 函数获取配置。
// `queryMeta` 函数用于从 HTML 的 meta 标签中获取指定键的值，如果没有找到则返回默认值。
export function getClientConfig() {
  if (typeof document !== "undefined") {
    // client side
    return JSON.parse(queryMeta("config") || "{}") as BuildConfig;
  }

  if (typeof process !== "undefined") {
    // server side
    return getBuildConfig();
  }
}

function queryMeta(key: string, defaultValue?: string): string {
  let ret: string;
  if (document) {
    const meta = document.head.querySelector(
      `meta[name='${key}']`,
    ) as HTMLMetaElement;
    ret = meta?.content ?? "";
  } else {
    ret = defaultValue ?? "";
  }

  return ret;
}
