import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { SAFE_FACTORY_ABI } from './ABI';
import { createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getContract } from 'viem';
import { encodeFunctionData } from 'viem';
import { SAFE_ABI } from './ABI';
import crypto from 'crypto';

const walletPvtKey = process.env.WALLET_PVT_KEY || 'DEFAULT_PRIVATE_KEY';
const account = privateKeyToAccount(`0x${walletPvtKey}`);

const safeProxyFactory = '0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC';
const safeSingleton = '0xfb1bffC9d739B8D520DaF37dF666da4C687191EA';

const client = createWalletClient({
  account,
  chain: base,
  transport: http(),
});

function generateSecureSaltNonce(userAddress: string): string {
  const randomValue = crypto.randomBytes(16).toString('hex');
  const rawNonce = `${userAddress}-${Date.now()}-${randomValue}`;
  const hash = crypto.createHash('sha256').update(rawNonce).digest('hex');

  return hash;
}

export const createSafe = async (userAddress: string) => {
  const safeProxyFactoryInstance = getContract({
    address: safeProxyFactory,
    abi: SAFE_FACTORY_ABI,
    client: client,
  });

  const initData = encodeFunctionData({
    abi: SAFE_ABI,
    functionName: 'setup',
    args: [[userAddress], 1, '', '0x', '', '', 0, ''],
  });

  const saltNonce = generateSecureSaltNonce(userAddress);

  const newSafeAddress = safeProxyFactoryInstance.write.createProxyWithNonce([
    safeSingleton,
    initData,
    saltNonce,
  ]);

  return newSafeAddress;
};
