import { useState, useEffect } from 'react'
import './App.css'

// X Layer 钱包地址
const USER_WALLET = '0x29AA452EDc51D5932b0021D3e41c7DDACEda7B30'

function App() {
  const [connected, setConnected] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [communityStats, setCommunityStats] = useState({
    activeAddresses: 0,
    totalVolume: 0,
    votes: 0
  })

  // 连接钱包
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setConnected(true)
        console.log('Connected:', accounts[0])
      } else {
        alert('请安装 MetaMask 钱包')
      }
    } catch (error) {
      console.error('Connect error:', error)
    }
  }

  // 执行 X Layer 首笔交易
  const executeTransaction = async () => {
    try {
      // 调用 OKX Onchain Gateway API
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: 'xlayer',
          from: USER_WALLET,
          to: USER_WALLET,
          value: '0.001',
          token: 'OKB'
        })
      })
      
      const result = await response.json()
      if (result.txHash) {
        setTxHash(result.txHash)
        alert('交易成功！哈希：' + result.txHash)
      }
    } catch (error) {
      console.error('Transaction error:', error)
      alert('交易失败：' + error.message)
    }
  }

  // 投票功能
  const castVote = async (proposalId, support) => {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId,
          support,
          voter: USER_WALLET
        })
      })
      
      const result = await response.json()
      alert(result.message)
    } catch (error) {
      console.error('Vote error:', error)
    }
  }

  // 获取社区数据
  useEffect(() => {
    // 模拟社区数据 (实际应从链上获取)
    setCommunityStats({
      activeAddresses: 127,
      totalVolume: '45,892 USDC',
      votes: 342
    })
  }, [])

  return (
    <div className="App">
      <header className="header">
        <h1>🚀 OEOE Agent DAO</h1>
        <p>无项目方 · 纯社区自治 · X Layer 黑客松</p>
      </header>

      <main className="main">
        {/* 社区数据展示 */}
        <section className="stats-section">
          <h2>📊 社区数据</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>活跃地址</h3>
              <p className="stat-value">{communityStats.activeAddresses}</p>
            </div>
            <div className="stat-card">
              <h3>总交易量</h3>
              <p className="stat-value">{communityStats.totalVolume}</p>
            </div>
            <div className="stat-card">
              <h3>社区投票</h3>
              <p className="stat-value">{communityStats.votes}</p>
            </div>
          </div>
        </section>

        {/* 钱包连接 */}
        <section className="wallet-section">
          <h2>👛 钱包</h2>
          <p>地址：{USER_WALLET.slice(0, 10)}...{USER_WALLET.slice(-8)}</p>
          {!connected ? (
            <button onClick={connectWallet} className="btn-primary">
              连接钱包
            </button>
          ) : (
            <span className="connected">✅ 已连接</span>
          )}
        </section>

        {/* X Layer 首笔交易 */}
        <section className="tx-section">
          <h2>🔗 X Layer 首笔交易</h2>
          <p>完成首笔交易以获取黑客松资格证明</p>
          <button 
            onClick={executeTransaction} 
            className="btn-primary"
            disabled={txHash !== ''}
          >
            {txHash ? '已完成' : '执行首笔交易'}
          </button>
          {txHash && (
            <div className="tx-result">
              <p>✅ 交易成功!</p>
              <a 
                href={`https://www.oklink.com/xlayer/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                查看交易：{txHash.slice(0, 10)}...{txHash.slice(-8)}
              </a>
            </div>
          )}
        </section>

        {/* DAO 投票 */}
        <section className="dao-section">
          <h2>🗳️ 社区投票</h2>
          <div className="proposal-card">
            <h3>提案 #1: 奖金分配方案</h3>
            <p>获奖后 40% 奖金直接分红给所有 OEOE 持币者</p>
            <div className="vote-buttons">
              <button onClick={() => castVote(1, true)} className="btn-yes">
                ✅ 支持
              </button>
              <button onClick={() => castVote(1, false)} className="btn-no">
                ❌ 反对
              </button>
            </div>
          </div>
        </section>

        {/* x402 支付演示 */}
        <section className="payment-section">
          <h2>💰 x402 支付演示</h2>
          <p>使用 x402 协议进行链上微支付</p>
          <div className="payment-demo">
            <input type="number" placeholder="金额 (USDC)" className="input" />
            <button className="btn-secondary">发起支付</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>OEOE Community DAO © 2026 | X Layer Hackathon</p>
        <p>#OEOE #XLAYER #OKX #DAO #去中心化</p>
      </footer>
    </div>
  )
}

export default App
