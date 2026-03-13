/**
 * X Layer 首笔交易脚本
 * 
 * 用于完成 X Layer 黑客松资格要求
 * 
 * 使用方法:
 * 1. 设置环境变量 PRIVATE_KEY
 * 2. 运行：node scripts/first-tx.js
 */

import { ethers } from 'ethers'

// X Layer 配置
const XLAYER_CONFIG = {
  rpcUrl: 'https://xlayerrpc.okx.com',
  chainId: 1874,
  explorer: 'https://www.okx.com/explorer/xlayer',
}

// 社区钱包地址 (OEOE DAO)
const COMMUNITY_WALLET = 'XKObd125a4e0aaaff514565954144c92c534293dea4'

// 交易金额 (0.01 OKB)
const TX_AMOUNT = '0.01'

async function main() {
  console.log('🚀 OEOE Agent DAO - X Layer 首笔交易\n')
  
  // 检查私钥
  const privateKey = process.env.PRIVATE_KEY
  if (!privateKey) {
    console.error('❌ 错误：请设置 PRIVATE_KEY 环境变量')
    console.error('   Windows PowerShell: $env:PRIVATE_KEY="你的私钥"')
    console.error('   Linux/Mac: export PRIVATE_KEY="你的私钥"')
    process.exit(1)
  }
  
  // 检查收款地址
  const recipient = process.env.RECIPIENT || COMMUNITY_WALLET
  console.log('📬 收款地址:', recipient)
  
  // 创建 Provider 和 Signer
  console.log('📡 连接 X Layer 网络...')
  const provider = new ethers.JsonRpcProvider(XLAYER_CONFIG.rpcUrl)
  
  // 验证网络
  const network = await provider.getNetwork()
  console.log('✅ 网络:', network.name, `(Chain ID: ${network.chainId})`)
  
  if (network.chainId !== BigInt(XLAYER_CONFIG.chainId)) {
    console.error(`❌ 错误：Chain ID 不匹配，期望 ${XLAYER_CONFIG.chainId}, 实际 ${network.chainId}`)
    process.exit(1)
  }
  
  // 创建 Signer
  const signer = new ethers.Wallet(privateKey, provider)
  console.log('🔑 发送地址:', signer.address)
  
  // 检查余额
  console.log('💰 检查余额...')
  const balance = await provider.getBalance(signer.address)
  const balanceEth = ethers.formatEther(balance)
  console.log(`   余额：${balanceEth} OKB`)
  
  const minRequired = parseFloat(TX_AMOUNT) + 0.001 // 加上 Gas
  if (parseFloat(balanceEth) < minRequired) {
    console.error(`❌ 错误：余额不足，至少需要 ${minRequired} OKB`)
    console.error('   请充值后再试')
    process.exit(1)
  }
  
  // 构建交易
  console.log('\n📝 构建交易...')
  const amountWei = ethers.parseEther(TX_AMOUNT)
  console.log(`   金额：${TX_AMOUNT} OKB`)
  console.log(`   Gas 估算：待计算...`)
  
  // 估算 Gas
  const gasPrice = await provider.getFeeData()
  console.log(`   Gas 价格：${ethers.formatUnits(gasPrice.gasPrice, 'gwei')} Gwei`)
  
  // 创建交易
  const txRequest = {
    to: recipient,
    value: amountWei,
    chainId: XLAYER_CONFIG.chainId,
  }
  
  // 估算 Gas 限制
  const gasLimit = await provider.estimateGas(txRequest)
  console.log(`   Gas 限制：${gasLimit.toString()}`)
  
  const estimatedFee = gasLimit * gasPrice.gasPrice
  console.log(`   预估 Gas 费：${ethers.formatEther(estimatedFee)} OKB`)
  
  // 发送交易
  console.log('\n⏳ 发送交易中...')
  const tx = await signer.sendTransaction(txRequest)
  console.log('📤 交易已发送!')
  console.log('   交易哈希:', tx.hash)
  
  // 等待确认
  console.log('\n⏳ 等待确认...')
  const receipt = await tx.wait()
  console.log('✅ 交易确认成功!')
  console.log('   区块号:', receipt.blockNumber)
  console.log('   Gas 使用:', receipt.gasUsed.toString())
  console.log('   实际 Gas 费:', ethers.formatEther(receipt.gasUsed * receipt.gasPrice), 'OKB')
  
  // 输出结果
  console.log('\n' + '='.repeat(50))
  console.log('🎉 首笔交易完成!')
  console.log('='.repeat(50))
  console.log('\n📋 交易信息:')
  console.log('   交易哈希:', tx.hash)
  console.log('   发送地址:', signer.address)
  console.log('   收款地址:', recipient)
  console.log('   金额:', TX_AMOUNT, 'OKB')
  console.log('   区块号:', receipt.blockNumber)
  console.log('   时间:', new Date().toISOString())
  
  console.log('\n🔗 浏览器链接:')
  console.log(`   ${XLAYER_CONFIG.explorer}/tx/${tx.hash}`)
  
  console.log('\n📝 请更新 docs/SUBMISSION.md:')
  console.log('```markdown')
  console.log(`- **交易哈希**: \`${tx.hash}\``)
  console.log(`- **交易时间**: \`${new Date().toISOString()}\``)
  console.log(`- **浏览器链接**: \`${XLAYER_CONFIG.explorer}/tx/${tx.hash}\``)
  console.log('```')
  
  // 返回交易信息
  return {
    txHash: tx.hash,
    from: signer.address,
    to: recipient,
    amount: TX_AMOUNT,
    blockNumber: receipt.blockNumber,
    timestamp: new Date().toISOString(),
    explorerUrl: `${XLAYER_CONFIG.explorer}/tx/${tx.hash}`,
  }
}

// 运行
main()
  .then((result) => {
    console.log('\n✅ 脚本执行完成!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ 脚本执行失败:')
    console.error(error)
    process.exit(1)
  })
