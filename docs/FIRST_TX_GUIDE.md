# X Layer 首笔交易指南

## 目标
完成 X Layer 首笔交易，获取黑客松参赛资格

## 你的钱包地址
```
XKObd125a4e0aaaff514565954144c92c534293dea4
```

## 方法一：使用 OKX 钱包 (推荐)

### 步骤 1: 添加 X Layer 网络
1. 打开 OKX 钱包
2. 点击「发现」→「Network」
3. 搜索「X Layer」并添加
4. 或手动添加:
   - Network Name: X Layer
   - RPC URL: https://xlayerrpc.okx.com
   - Chain ID: 1874
   - Symbol: OKB
   - Explorer: https://www.okx.com/explorer/xlayer

### 步骤 2: 充值 OKB
1. 从 OKX 交易所提现 OKB 到 X Layer 网络
2. 或从其他钱包桥接到 X Layer
3. 建议充值 0.1 OKB 以上 (足够多笔交易)

### 步骤 3: 执行首笔交易
1. 打开 OKX 钱包，切换到 X Layer 网络
2. 点击「发送」
3. 收款地址：`XKObd125a4e0aaaff514565954144c92c534293dea4` (社区钱包)
4. 金额：0.01 OKB
5. 确认并发送

### 步骤 4: 获取交易哈希
1. 交易成功后，点击交易详情
2. 复制交易哈希 (Tx Hash)
3. 更新到 `docs/SUBMISSION.md`

---

## 方法二：使用 MetaMask

### 步骤 1: 添加 X Layer 到 MetaMask
1. 打开 MetaMask
2. 点击网络选择器 →「添加网络」
3. 填写:
   - Network Name: X Layer
   - RPC URL: https://xlayerrpc.okx.com
   - Chain ID: 1874
   - Currency Symbol: OKB
   - Block Explorer: https://www.okx.com/explorer/xlayer

### 步骤 2: 导入钱包 (如有私钥)
1. 点击账户图标 →「导入账户」
2. 输入私钥
3. 确认导入

### 步骤 3: 执行交易
1. 切换到 X Layer 网络
2. 点击「发送」
3. 收款地址：`XKObd125a4e0aaaff514565954144c92c534293dea4`
4. 金额：0.01 OKB
5. 确认发送

---

## 方法三：使用脚本 (开发者)

### 前提条件
- Node.js 18+
- 钱包私钥

### 执行脚本
```bash
cd OEOE-Agent-DAO
npm install

# 设置环境变量
export PRIVATE_KEY="你的私钥"
export RECIPIENT="XKObd125a4e0aaaff514565954144c92c534293dea4"

# 执行交易
node scripts/first-tx.js
```

---

## 验证交易

交易成功后，在 X Layer 浏览器验证:
```
https://www.okx.com/explorer/xlayer/tx/<交易哈希>
```

---

## 更新提交文档

交易完成后，更新 `docs/SUBMISSION.md`:

```markdown
### 1. X Layer 首笔交易

- **交易哈希**: `0x...`
- **交易时间**: `2026-03-XX XX:XX:XX`
- **浏览器链接**: `https://www.okx.com/explorer/xlayer/tx/0x...`
```

---

## 常见问题

### Q: 没有 OKB 怎么办？
A: 从 OKX 交易所提现，或使用跨链桥从其他网络桥接。

### Q: 交易失败怎么办？
A: 检查:
- 是否有足够的 OKB 支付 Gas
- 网络是否正确 (X Layer, Chain ID 1874)
- 收款地址是否正确

### Q: 交易哈希在哪里找？
A: 交易成功后，钱包会显示交易详情，复制 Tx Hash 即可。

---

## 安全提示

⚠️ **永远不要分享你的私钥!**
⚠️ **仔细核对收款地址!**
⚠️ **先用小额测试!**
