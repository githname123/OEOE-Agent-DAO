# OEOE Agent DAO - 快速开始指南

## 🚀 5 分钟上手

### 1. 安装依赖

```bash
cd OEOE-Agent-DAO
npm install
```

### 2. 执行 X Layer 首笔交易

**重要**: 这是黑客松的资格要求!

```bash
# 设置你的私钥 (不要上传到 GitHub!)
export PRIVATE_KEY=你的钱包私钥

# 执行交易
node scripts/execute-tx.js
```

交易完成后，交易哈希会自动保存到 `docs/tx-hash.txt`

### 3. 启动开发服务器

```bash
# 启动前端 (端口 3000)
npm run dev

# 启动 API 服务器 (端口 3001)
node server.js
```

访问 http://localhost:3000 查看应用

### 4. 部署到 GitHub

```bash
# 初始化 Git
git init
git add .
git commit -m "Initial commit: OEOE Agent DAO"

# 创建 GitHub 仓库并推送
gh repo create OEOE-Agent-DAO --public --source=. --remote=origin --push
```

### 5. 部署前端 (可选)

```bash
# 构建
npm run build

# 部署到 Vercel
vercel deploy --prod
```

## 📋 项目结构

```
OEOE-Agent-DAO/
├── contracts/              # 智能合约
│   └── OEOEAgentDAO.sol   # DAO 治理合约
├── src/                    # 前端代码
│   ├── agents/            # AI 代理模块
│   │   └── dao-agent.js   # 治理/分红/内容/支付代理
│   ├── App.jsx            # 主应用组件
│   ├── App.css            # 样式
│   ├── main.jsx           # 入口
│   └── index.css          # 全局样式
├── scripts/                # 工具脚本
│   └── execute-tx.js      # X Layer 交易脚本
├── docs/                   # 文档
│   ├── SUBMISSION.md      # 黑客松提交材料
│   ├── QUICKSTART.md      # 本文件
│   └── tx-hash.txt        # 交易哈希 (执行后生成)
├── public/                 # 静态资源
├── server.js              # API 服务器
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## 🔧 核心功能

### AI 代理模块

```javascript
import { AgentCoordinator } from './src/agents/dao-agent.js'

const coordinator = new AgentCoordinator(contractAddress)
await coordinator.initialize()

// 执行奖金分配
await coordinator.executeRewardDistribution(10000) // 10000 USDC
```

### x402 支付

```javascript
// 处理支付
const tx = await paymentAgent.processPayment(
  fromAddress,
  toAddress,
  100, // 金额
  'USDC'
)
```

### DAO 投票

```javascript
// 创建提案
await createProposal('奖金分配方案')

// 投票
await vote(proposalId, true) // 支持
```

## 📝 黑客松提交清单

- [x] GitHub 仓库创建
- [ ] X Layer 首笔交易执行
- [ ] 智能合约部署
- [ ] 前端页面部署
- [ ] Demo 视频录制
- [ ] 提交表单填写

## 🆘 常见问题

### Q: 如何获取 X Layer 测试币？
A: 访问 https://www.okx.com/xlayer/faucet 领取测试 OKB

### Q: 交易失败怎么办？
A: 检查：
1. 私钥是否正确
2. 钱包是否有足够的 OKB 支付 Gas
3. RPC 节点是否正常

### Q: 如何联系团队？
A: 加入 OEOE Discord 社区或 Twitter @OEOE_Community

## 📞 支持

- **GitHub Issues**: https://github.com/OEOE-Agent-DAO/issues
- **Discord**: OEOE Community
- **文档**: https://oeoe-agent-dao.vercel.app/docs

---

**祝你黑客松顺利！🚀**
