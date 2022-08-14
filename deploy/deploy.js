const { network } = require("hardhat")
const { TASK_DEPLOY_RUN_DEPLOY } = require("hardhat-deploy")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("-------------------")

    const args = []

    const BuyMeACoffee = await deploy("BuyMeACoffee", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(BuyMeACoffee.address, args)
    }
    log("-------------------")
}

module.exports.tags = ["buyMeACoffee"]
