// 远程脚本：替换 sing-box 顶层 inbounds
// 远程参数：#mode=mobile 或 #mode=pc  → 通过 $options.mode 读取 [web:220]

const mode = String($options?.mode ?? "pc").toLowerCase();

const MOBILE_INBOUNDS = [
  { type: "direct", listen: "127.0.0.1", tag: "dns-in", listen_port: 5350 },
  {
    type: "tun",
    tag: "tun-in",
    address: ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
    loopback_address: ["10.7.0.1"],
    mtu: 1400,
    auto_route: true,
    strict_route: true,
    stack: "system"
  }
];

const PC_INBOUNDS = [
  { type: "direct", listen: "127.0.0.1", tag: "dns-in", listen_port: 5350 },
  { type: "mixed", tag: "mixed-in", listen: "0.0.0.0", listen_port: 7890 }
];

const cfg = JSON.parse($content);
cfg.inbounds = mode === "mobile" ? MOBILE_INBOUNDS : PC_INBOUNDS;
$content = JSON.stringify(cfg, null, 2);
