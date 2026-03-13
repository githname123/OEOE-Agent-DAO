/**
 * OEOE Agent DAO API 服务器
 * 提供前端 API 接口，集成 OKX Onchain Gateway
 */

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// 用户钱包地址
const USER_WALLET = '0x29AA452EDc51D5932b0021D3e41c7DDACEda7B30'

/**
 * POST /api/transaction
 * 执行 X Layer 首笔交易
 */
app.post('/api/transaction', async (req, res) => {
  try {
    const { chainId, from, to, value, token } = req.body
    
    console.log('[API] 执行交易请求:', { chainId, from, to, value, token })
    
    // 调用 OKX Onchain Gateway API
    // 实际实现需要集成 OKX API
    const mockTxHash = '0x' + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    
    console.log('[API] 交易完成:', mockTxHash)
    
    res.json({
      success: true,
      txHash: mockTxHash,
      chainId,
      from,
      to,
      value,
      token,
      explorerUrl: `https://www.oklink.com/xlayer/tx/${mockTxHash}`
    })
  } catch (error) {
    console.error('[API] 交易失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * POST /api/vote
 * 提交 DAO 投票
 */
app.post('/api/vote', async (req, res) => {
  try {
    const { proposalId, support, voter } = req.body
    
    console.log('[API] 投票请求:', { proposalId, support, voter })
    
    // 调用合约投票函数
    // 实际实现需要集成 Web3
    
    res.json({
      success: true,
      message: support ? '✅ 投票支持成功' : '❌ 投票反对成功',
      proposalId,
      voter
    })
  } catch (error) {
    console.error('[API] 投票失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * GET /api/stats
 * 获取社区统计数据
 */
app.get('/api/stats', async (req, res) => {
  try {
    // 模拟社区数据 (实际应从链上获取)
    const stats = {
      activeAddresses: 127,
      totalVolume: '45,892 USDC',
      votes: 342,
      holders: 89,
      proposals: 5,
      totalDividends: '12,450 USDC'
    }
    
    res.json({ success: true, stats })
  } catch (error) {
    console.error('[API] 获取数据失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * POST /api/payment
 * 处理 x402 支付
 */
app.post('/api/payment', async (req, res) => {
  try {
    const { from, to, amount, token } = req.body
    
    console.log('[API] 支付请求:', { from, to, amount, token })
    
    // 调用 x402 协议
    // 实际实现需要集成 OKX x402 API
    
    const mockTxHash = '0x' + Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    
    res.json({
      success: true,
      txHash: mockTxHash,
      from,
      to,
      amount,
      token
    })
  } catch (error) {
    console.error('[API] 支付失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * GET /api/proposals
 * 获取提案列表
 */
app.get('/api/proposals', async (req, res) => {
  try {
    const proposals = [
      {
        id: 1,
        title: '奖金分配方案',
        description: '获奖后 40% 奖金直接分红给所有 OEOE 持币者',
        votesFor: 87,
        votesAgainst: 12,
        deadline: '2026-03-20T00:00:00Z',
        status: 'active'
      },
      {
        id: 2,
        title: '社区基金使用',
        description: '将 20% 奖金用于社区建设和市场推广',
        votesFor: 65,
        votesAgainst: 23,
        deadline: '2026-03-22T00:00:00Z',
        status: 'active'
      }
    ]
    
    res.json({ success: true, proposals })
  } catch (error) {
    console.error('[API] 获取提案失败:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 OEOE Agent DAO API 服务器运行在 http://localhost:${PORT}`)
})

export default app
