import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { SAFE_FACTORY, SAFE_SINGLETON_ABI } from './ABI';
import { createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { encodeFunctionData, numberToBytes } from 'viem';
import crypto from 'crypto';
import {
  ADDRESS_0,
  FALLBACK_HANDLER_ADDRESS,
  SAFE_FACTORY_ADDRESS,
  SAFE_SINGLETON_ADDRESS,
} from './constants';

const walletPvtKey = process.env.WALLET_PVT_KEY || 'DEFAULT_PRIVATE_KEY';
const account = privateKeyToAccount(`0x${walletPvtKey}`);
const accountAddress = account.address;

const client = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

function generateSecureSaltNonce(userAddress: string): BigInt {
  const randomValue = crypto.randomBytes(16).toString('hex');
  const rawNonce = `${userAddress}-${Date.now()}-${randomValue}`;
  const hash = crypto.createHash('sha256').update(rawNonce).digest('hex');
  // Convert hex string to BigInt
  const hashAsBigInt = BigInt('0x' + hash);

  return hashAsBigInt;
}

export const createSafe = async (userAddress: string) => {
  const initData = encodeFunctionData({
    abi: SAFE_SINGLETON_ABI,
    functionName: 'setup',
    args: [
      [userAddress],
      1,
      ADDRESS_0,
      numberToBytes(0),
      FALLBACK_HANDLER_ADDRESS,
      ADDRESS_0,
      0,
      ADDRESS_0,
    ],
  });

  console.log('initData:', initData);

  const saltNonce = generateSecureSaltNonce(userAddress);

  console.log('saltNonce:', saltNonce.toString(16));

  try {
    console.log({
      ...SAFE_FACTORY,
      address: SAFE_FACTORY_ADDRESS,
      functionName: 'createProxyWithNonce',
      args: [SAFE_SINGLETON_ADDRESS, initData, saltNonce],
      account: accountAddress,
    });
    const { result } = await publicClient.simulateContract({
      ...SAFE_FACTORY,
      address: SAFE_FACTORY_ADDRESS,
      functionName: 'createProxyWithNonce',
      args: [SAFE_SINGLETON_ADDRESS, initData, saltNonce],
      account: accountAddress,
    });
    await client.writeContract(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function getSafeUrl(safeAddress: string) {
  return `https://app.safe.global/home?safe=sepolia:${safeAddress}`;
}
