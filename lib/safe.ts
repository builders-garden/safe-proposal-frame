import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import { SAFE_FACTORY, SAFE_SINGLETON_ABI } from './ABI';
import { createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { encodeFunctionData } from 'viem';
import crypto from 'crypto';

const walletPvtKey = process.env.WALLET_PVT_KEY || 'DEFAULT_PRIVATE_KEY';
const account = privateKeyToAccount(`0x${walletPvtKey}`);
const accountAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //TODO: change this to the actual address

const safeSingleton = '0xfb1bffC9d739B8D520DaF37dF666da4C687191EA';

const client = createWalletClient({
  account,
  chain: base,
  transport: http(),
});

const publicClient = createPublicClient({
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
  const initData = encodeFunctionData({
    abi: SAFE_SINGLETON_ABI,
    functionName: 'setup',
    args: [[userAddress], 1, '', '0x', '0x017062a1dE2FE6b99BE3d9d37841FeD19F573804', '', 0, ''],
  });

  const saltNonce = generateSecureSaltNonce(userAddress);

  try {
    const { result } = await publicClient.simulateContract({
      ...SAFE_FACTORY,
      functionName: 'createProxyWithNonce',
      args: [safeSingleton, initData, saltNonce],
      account: accountAddress,
      address: `${accountAddress}`,
    });
    await client.writeContract(result);
    return result;
  }
  catch (error) {
    console.error(error);
    return null;
  }
};

export function getSafeUrl(safeAddress: string) {
  return `https://app.safe.global/home?safe=base:${safeAddress}`;
}