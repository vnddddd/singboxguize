# Sing-Box Guize 配置说明

本文件夹包含了 Sing-Box 在不同场景下的配置文件。请根据你的环境选择合适的配置进行使用。

## 文件目录

- **guize.json**  
  基础规则配置文件，适用于桌面或服务器环境。

- **openwrt_guize.json**  
  针对 OpenWrt 设备优化的配置文件，支持 TProxy 或 TUN 模式，适合嵌入式路由器使用。

- **openwrt_tun.json**  
  专为 OpenWrt 环境设计的 TUN 模式配置文件，支持详细的 IPv4/IPv6 路由策略。

- **system_proxy.json**  
  用于系统代理模式（如 Windows 全局代理）的配置文件，支持混合入站和动态出站节点选择。

## 配置文件详细说明

### guize.json
- **用途**：适用于所有客户端（除openwrt）环境的基础规则配置。
- **功能**：
  - 多入站、多出站节点支持，实现智能流量分流；
  - 内置 DNS 劫持与规则匹配，增强代理稳定性；
  - 灵活的路由策略，包括基于域名和 IP 的规则。

### openwrt_guize.json
- **用途**：专为 OpenWrt 设备优化，适用于资源有限的嵌入式环境。
- **功能**：
  - 兼容 TProxy 或 TUN 模式的入站方式；
  - 集成了防火墙和路由策略优化，确保代理服务稳定；
  - 适合家庭或小型网络环境运行。

### openwrt_tun.json
- **用途**：OpenWrt 下 TUN 模式的代理配置文件。
- **功能**：
  - 全面支持 TUN 模式，结合自动路由实现流量分流；
  - 详细配置 IPv4 与 IPv6 双栈环境，满足复杂网络需求；
  - 适用于需要精准流量控制的 OpenWrt 系统。

### system_proxy.json
- **用途**：用于系统代理模式，主要适用在 Windows 系统或需要全局代理的场景。
- **功能**：
  - 支持混合入站，实现多协议流量转发；
  - 动态出站节点选择，提供智能流量调度；
  - 内置严格的 DNS 和路由策略，保证代理精度。

## 使用指南

1. **选择配置**  
   根据你的使用环境选择合适的配置文件：  
   - 桌面/服务器环境：使用 `guize.json`  
   - OpenWrt 系统：使用 `openwrt_guize.json` 或 `openwrt_tun.json`  
   - Windows 系统或全局代理：使用 `system_proxy.json`

2. **备份配置**  
   修改前请务必备份原始配置文件，以防出现配置错误后无法回退。

3. **配合脚本使用**  
   OpenWrt 用户请确保同时运行相关启动脚本（例如 TProxy 或 TUN 模式脚本），以正确加载防火墙规则和路由配置。

4. **确保网络畅通**  
   外部规则（如 geoip 和 geosite）通过 URL 动态更新，请保证设备能正常访问互联网。

5. **日志调试**  
   配置文件中已启用日志记录，遇到问题时请先查看日志，参考 [Sing-Box 官方文档](https://github.com/SagerNet/sing-box) 获取进一步支持。

## 贡献与反馈

欢迎提出改进建议或提交 Issue，与社区共同完善和优化配置。感谢每一位贡献者！