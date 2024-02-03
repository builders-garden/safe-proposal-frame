import { ethers } from 'ethers';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { SafeFactory } from '@safe-global/protocol-kit';
import { SafeAccountConfig } from '@safe-global/protocol-kit';

const RPC_URL = 'https://eth-sepolia.public.blastapi.io';
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Initialize signers
const signer = new ethers.Wallet(process.env.WALLET_PVT_KEY!, provider);

const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signerOrProvider: signer,
});

export const getSafeConfig = (userAddress: string) => {
  const safeAccountConfig: SafeAccountConfig = {
    owners: [userAddress],
    threshold: 1,
  };
  return safeAccountConfig;
};

export const predictSafeAddress = async (
  safeAccountConfig: SafeAccountConfig,
  saltNonce: string,
) => {
  const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });
  const safeAddress = await safeFactory.predictSafeAddress(safeAccountConfig, saltNonce);
  return safeAddress;
};

export const createSafe = async (safeAccountConfig: SafeAccountConfig, saltNonce: string) => {
  const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });
  const protocolKitOwner1 = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce: Date.now().toString(),
  });

  const safeAddress = await protocolKitOwner1.getAddress();
  return safeAddress;
};

export function getSafeUrl(safeAddress: string) {
  return `https://app.safe.global/home?safe=sepolia:${safeAddress}`;
}
