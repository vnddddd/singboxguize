/**
 * Sub-Store 脚本：按 mode 或 User-Agent 替换 sing-box 模板的 inbounds
 * 用法：.../switch_inbounds.js#mode=mobile  或 #mode=pc
 */
module.exports = async (ctx) => {
  // 不同 Sub-Store 版本字段名可能略有差异，这里做容错读取
  const raw =
    ctx?.content ??
    ctx?.body ??
    ctx?.data ??
    ctx?.response?.body ??
    "";

  const ua = String(
    ctx?.request?.headers?.["user-agent"] ??
      ctx?.headers?.["user-agent"] ??
      ""
  ).toLowerCase();

  // 解析 #mode=mobile|pc（有些实现会把 hash 参数放到 ctx.params / ctx.env / ctx.query）
  const p = ctx?.params ?? ctx?.env ?? ctx?.query ?? {};
  let mode = String(p.mode ?? "").toLowerCase();
  if (!mode) mode = /iphone|ipad|ipod|android/.test(ua) ? "mobile" : "pc";

  const MOBILE_INBOUNDS = [
    {
      "type": "direct",
      "listen": "127.0.0.1",
      "tag": "dns-in",
      "listen_port": 5350
    },
    {
      "type": "tun",
      "tag": "tun-in",
      "address": ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
      "loopback_address": ["10.7.0.1"],
      "mtu": 1400,
      "auto_route": true,
      "strict_route": true,
      "stack": "system"
    }
  ];

  const PC_INBOUNDS = [
    {
      "type": "direct",
      "listen": "127.0.0.1",
      "tag": "dns-in",
      "listen_port": 5350
    },
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "0.0.0.0",
      "listen_port": 7890
    }
  ];

  const cfg = JSON.parse(raw);
  cfg.inbounds = mode === "mobile" ? MOBILE_INBOUNDS : PC_INBOUNDS;

  const out = JSON.stringify(cfg, null, 2);

  // 有的脚本引擎要求 return 字符串；有的要求写回 ctx.content
  if (typeof ctx === "object") ctx.content = out;
  return out;
};
