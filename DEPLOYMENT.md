# 🚀 部署指南

## 前端部署 (Vercel)

### 方法 1: Vercel Web (推荐 - 最简单)

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库：`githname123/OEOE-Agent-DAO`
3. 配置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 点击 **Deploy**
5. 获取部署 URL (例如：`https://oeoe-agent-dao.vercel.app`)

### 方法 2: Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd OEOE-Agent-DAO
vercel --prod
```

---

## API 服务器部署 (Railway)

### 步骤:

1. 访问 https://railway.app/
2. 点击 **New Project** → **Deploy from GitHub repo**
3. 选择 `OEOE-Agent-DAO`
4. 添加环境变量:
   - `PORT`: 3001
   - `PRIVATE_KEY`: (可选，用于链上交互)
5. 点击 **Deploy**
6. 获取 API URL (例如：`https://oeoe-agent-dao-production.up.railway.app`)

---

## 替代方案：Netlify

### 前端部署:

1. 访问 https://app.netlify.com/drop
2. 拖拽 `dist` 文件夹
3. 或连接 GitHub 自动部署

---

## 部署后更新

部署完成后，更新以下文件:

1. `README.md` - 添加 Live Demo 链接
2. `PROJECT_STATUS.md` - 标记部署完成
3. 提交黑客松报名表单时附上链接

---

## 本地测试

```bash
# 前端
npm run dev

# API
node server.js

# 访问
# 前端：http://localhost:5173
# API: http://localhost:3001/api/stats
```
