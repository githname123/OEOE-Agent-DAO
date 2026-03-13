import { ethers } from 'hardhat'

async function main() {
  console.log('🚀 部署 OEOE Agent DAO 合约...')
  
  // 获取部署者
  const [deployer] = await ethers.getSigners()
  console.log('部署地址:', deployer.address)
  
  // 部署合约
  const OEOEAgentDAO = await ethers.getContractFactory('OEOEAgentDAO')
  const dao = await OEOEAgentDAO.deploy()
  await dao.waitForDeployment()
  
  const daoAddress = await dao.getAddress()
  console.log('✅ 合约部署成功!')
  console.log('合约地址:', daoAddress)
  console.log('X Layer 浏览器:', `https://www.okx.com/explorer/xlayer/address/${daoAddress}`)
  
  // 输出部署信息
  const deploymentInfo = {
    contractName: 'OEOEAgentDAO',
    address: daoAddress,
    network: 'xlayer',
    chainId: 1874,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  }
  
  console.log('\n📋 部署信息:')
  console.log(JSON.stringify(deploymentInfo, null, 2))
  
  return deploymentInfo
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
