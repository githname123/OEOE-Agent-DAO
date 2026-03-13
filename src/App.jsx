import { useState, useEffect } from 'react'
import './App.css'

// X Layer 配置
const XLAYER_CONFIG = {
  chainId: '0x752', // 1874
  rpcUrl: 'https://xlayerrpc.okx.com',
  explorer: 'https://www.okx.com/explorer/xlayer',
}

// OEOE 社区钱包
const COMMUNITY_WALLET = 'XKObd125a4e0aaaff514565954144c92c534293dea4'

function App() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [communityStats, setCommunityStats] = useState({
    activeAddresses: 0,
    totalTransactions: 0,
    totalVolume: '0',
  })

  // 连接钱包
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        })
        
        // 切换到 X Layer
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: XLAYER_CONFIG.chainId }],
        })
        
        setUserAddress(accounts[0])
        setWalletConnected(true)
      } catch (error) {
        console.error('连接失败:', error)
        alert('连接钱包失败，请重试')
      }
    } else {
      alert('请安装 MetaMask 钱包')
    }
  }

  // 执行首笔交易 (X Layer 黑客松资格)
  const executeFirstTransaction = async () => {
    if (!walletConnected) {
      alert('请先连接钱包')
      return
    }

    setLoading(true)
    try {
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: userAddress,
          to: COMMUNITY_WALLET,
          value: '0x2386f26fc10000', // 0.01 ETH
          chainId: XLAYER_CONFIG.chainId,
        }],
      })

      setTxHash(tx)
      alert(`交易成功！哈希：${tx}`)
    } catch (error) {
      console.error('交易失败:', error)
      alert('交易失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 支付/打赏功能 (x402 集成)
  const sendPayment = async (amount, recipient) => {
    if (!walletConnected) {
      alert('请先连接钱包')
      return
    }

    try {
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: userAddress,
          to: recipient,
          value: '0x' + (amount * 1e18).toString(16),
          chainId: XLAYER_CONFIG.chainId,
        }],
      })
      return tx
    } catch (error) {
      console.error('支付失败:', error)
      throw error
    }
  }

  // 模拟社区数据统计
  useEffect(() => {
    // 实际项目中这里会调用 API 获取真实数据
    setCommunityStats({
      activeAddresses: 127,
      totalTransactions: 543,
      totalVolume: '12.5 ETH',
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 OEOE Agent DAO</h1>
        <p>无项目方 · 纯社区自治 · X Layer 黑客松</p>
      </header>

      <main>
        {/* 钱包连接 */}
        <section className="wallet-section">
          {!walletConnected ? (
            <button onClick={connectWallet} className="btn-primary">
              连接 X Layer 钱包
            </button>
          ) : (
            <div className="connected">
              <p>✅ 已连接</p>
              <p className="address">{userAddress.slice(0, 6)}...{userAddress.slice(-4)}</p>
            </div>
          )}
        </section>

        {/* 首笔交易 (黑客松资格) */}
        <section className="tx-section">
          <h2>📝 X Layer 首笔交易</h2>
          <p>完成首笔交易获取黑客松参赛资格</p>
          <button 
            onClick={executeFirstTransaction} 
            disabled={!walletConnected || loading}
            className="btn-primary"
          >
            {loading ? '交易中...' : '执行首笔交易 (0.01 ETH)'}
          </button>
          {txHash && (
            <div className="tx-success">
              <p>✅ 交易成功!</p>
              <a 
                href={`${XLAYER_CONFIG.explorer}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                查看交易详情 →
              </a>
            </div>
          )}
        </section>

        {/* 社区统计 */}
        <section className="stats-section">
          <h2>📊 社区数据</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{communityStats.activeAddresses}</h3>
              <p>活跃地址</p>
            </div>
            <div className="stat-card">
              <h3>{communityStats.totalTransactions}</h3>
              <p>总交易数</p>
            </div>
            <div className="stat-card">
              <h3>{communityStats.totalVolume}</h3>
              <p>总交易量</p>
            </div>
          </div>
        </section>

        {/* x402 支付演示 */}
        <section className="payment-section">
          <h2>💰 x402 支付演示</h2>
          <p>支持 OKB/USDC/OEOE 微支付，Gas≈0</p>
          <div className="payment-demo">
            <input type="number" placeholder="金额 (ETH)" defaultValue="0.001" />
            <input type="text" placeholder="接收地址" defaultValue={COMMUNITY_WALLET} />
            <button className="btn-secondary">发送支付</button>
          </div>
        </section>

        {/* DAO 治理 */}
        <section className="dao-section">
          <h2>🗳️ DAO 治理</h2>
          <p>社区提案投票、分红分配</p>
          <div className="proposals">
            <div className="proposal-card">
              <h4>提案 #1: 奖金分配方案</h4>
              <p>40% 分红给持币者，30% 社区发展，30% 开发基金</p>
              <div className="vote-bar">
                <div className="vote-for" style={{width: '75%'}}>支持 75%</div>
                <div className="vote-against" style={{width: '25%'}}>反对 25%</div>
              </div>
              <button className="btn-secondary">投票</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>OEOE Community DAO © 2026 | X Layer Hackathon</p>
        <p>
          <a href="https://github.com/OEOE-Community/OEOE-Agent-DAO" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' | '}
          <a href="https://xlayerrpc.okx.com" target="_blank" rel="noopener noreferrer">
            X Layer RPC
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
