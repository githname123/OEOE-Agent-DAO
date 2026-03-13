/**
 * X Layer 首笔交易执行脚本
 * 
 * 使用方法:
 * 1. 安装依赖：npm install ethers
 * 2. 设置环境变量：export PRIVATE_KEY=你的私钥
 * 3. 运行脚本：node scripts/execute-tx.js
 * 
 * 注意：私钥仅本地使用，不会上传到 GitHub
 */

import { ethers } from 'ethers'

// X Layer RPC 配置
const XLAYER_RPC = 'https://xlayerrpc.okx.com'
const XLAYER_CHAIN_ID = 196

// 用户钱包地址
const USER_ADDRESS = 'XKObd125a4e0aaaff514565954144c92c534293dea4'

async function executeTransaction() {
  try {
    // 从环境变量获取私钥
    const privateKey = process.env.PRIVATE_KEY
    if (!privateKey) {
      console.error('❌ 错误：请设置 PRIVATE_KEY 环境变量')
      console.log('使用方法：export PRIVATE_KEY=你的私钥')
      process.exit(1)
    }

    // 创建钱包和提供者
    const provider = new ethers.JsonRpcProvider(XLAYER_RPC, XLAYER_CHAIN_ID)
    const wallet = new ethers.Wallet(privateKey, provider)

    console.log('📡 连接 X Layer 网络...')
    console.log('👛 发送地址:', wallet.address)
    console.log('📮 接收地址:', USER_ADDRESS)

    // 获取当前 gas 价格
    const feeData = await provider.getFeeData()
    console.log('⛽ Gas 价格:', ethers.formatUnits(feeData.gasPrice, 'gwei'), 'gwei')

    // 创建交易
    const tx = {
      from: wallet.address,
      to: USER_ADDRESS,
      value: ethers.parseEther('0.001'), // 0.001 OKB
      chainId: XLAYER_CHAIN_ID
    }

    console.log('💰 交易金额：0.001 OKB')
    console.log('📝 发送交易中...')

    // 发送交易
    const txResponse = await wallet.sendTransaction(tx)
    console.log('⏳ 交易已发送，等待确认...')
    console.log('🔗 交易哈希:', txResponse.hash)

    // 等待交易确认
    const receipt = await txResponse.wait()
    console.log('✅ 交易确认成功!')
    console.log('📊 区块号:', receipt.blockNumber)
    console.log('⛽ 实际消耗 Gas:', receipt.gasUsed.toString())
    
    // 交易浏览器链接
    const explorerUrl = `https://www.oklink.com/xlayer/tx/${txResponse.hash}`
    console.log('🔍 查看交易:', explorerUrl)

    // 保存交易哈希到文件
    import fs from 'fs'
    import path from 'path'
    
    const txHashFile = path.join(process.cwd(), 'docs', 'tx-hash.txt')
    fs.writeFileSync(txHashFile, txResponse.hash, 'utf8')
    console.log('📁 交易哈希已保存到:', txHashFile)

    return txResponse.hash
  } catch (error) {
    console.error('❌ 交易失败:', error.message)
    process.exit(1)
  }
}

// 执行
executeTransaction()
  .then(() => {
    console.log('\n🎉 X Layer 首笔交易完成!')
    console.log('恭喜！你已获得 X Layer 黑客松参赛资格!')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
