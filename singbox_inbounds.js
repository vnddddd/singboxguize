// Sub-Store 文件脚本：替换顶层 inbounds
// 传参方式：优先读 $arguments.mode，其次读 $options.mode（部分脚本生态用 #param 解析到 $options）[web:195][web:207]

const mode = String(($arguments?.mode ?? $options?.mode ?? "pc")).toLowerCase(); // mobile / pc

const MOBILE_INBOUNDS = [
  {
    type: "direct",
    listen: "127.0.0.1",
    tag: "dns-in",
    listen_port: 5350
  },
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
  {
    type: "direct",
    listen: "127.0.0.1",
    tag: "dns-in",
    listen_port: 5350
  },
  {
    type: "mixed",
    tag: "mixed-in",
    listen: "0.0.0.0",
    listen_port: 7890
  }
];

const cfg = JSON.parse($content);
cfg.inbounds = mode === "mobile" ? MOBILE_INBOUNDS : PC_INBOUNDS;

// 写回（关键：必须把结果重新赋值给 $content）
$content = JSON.stringify(cfg, null, 2);
