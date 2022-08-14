const { ethers, getNamedAccounts, deployments } = require("hardhat")

async function main() {
    // deployer = await getNamedAccounts()

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    balance = await deployer.getBalance()
    console.log(balance.toString())
    // await deployments.fixture("buyMeACoffee")
    const BuyMeACoffee = await ethers.getContract("BuyMeACoffee")
    // console.log(BuyMeACoffee)
    await BuyMeACoffee.connect(deployer)

    tx = await BuyMeACoffee.withdrawTips()
    txReceipt = await tx.wait()
    balance = await deployer.getBalance()
    console.log(balance.toString())
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
