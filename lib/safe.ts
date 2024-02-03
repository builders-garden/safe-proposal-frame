import { ethers } from 'ethers';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { SafeFactory } from '@safe-global/protocol-kit';
import { SafeAccountConfig } from '@safe-global/protocol-kit';

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
  ethAdapter: EthersAdapter,
) => {
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const safeAddress = await safeFactory.predictSafeAddress(safeAccountConfig, saltNonce);
  return safeAddress;
};

export const createSafe = async (
  safeAccountConfig: SafeAccountConfig,
  saltNonce: string,
  ethAdapter: EthersAdapter,
) => {
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const protocolKitOwner1 = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce,
  });

  const safeAddress = await protocolKitOwner1.getAddress();
  return safeAddress;
};

export function getSafeUrl(safeAddress: string) {
  return `https://app.safe.global/home?safe=sepolia:${safeAddress}`;
}
