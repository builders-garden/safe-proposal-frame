
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { SafeFactory } from '@safe-global/protocol-kit'
import { SafeAccountConfig } from '@safe-global/protocol-kit'


const RPC_URL = 'https://eth-sepolia.public.blastapi.io'
const provider = new ethers.JsonRpcProvider(RPC_URL)

// Initialize signers
const owner1Signer = new ethers.Wallet(process.env.walletPvtKey!, provider)

const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer
})

export const createSafe = async (userAddress: string) => {

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    const safeAccountConfig: SafeAccountConfig = {
        owners: [
        await owner1Signer.getAddress()
        ],
        threshold: 1,
    }
    
    const protocolKitOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
    
    const safeAddress = await protocolKitOwner1.getAddress()
    console.log('Safe address:', safeAddress)

}