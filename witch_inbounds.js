function operator(content, targetPlatform, context) {
  const cfg = typeof content === "string" ? JSON.parse(content) : content;

  const p =
    context?.params ||
    context?.arguments ||
    context?.env ||
    context?.query ||
    {};

  const mode = String(p.mode || "").toLowerCase(); // mobile / pc

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

  cfg.inbounds = mode === "mobile" ? MOBILE_INBOUNDS : PC_INBOUNDS;

  return typeof content === "string" ? JSON.stringify(cfg, null, 2) : cfg;
}
