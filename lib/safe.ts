import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { SAFE_FACTORY, SAFE_SINGLETON_ABI } from './ABI';
import { createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { encodeFunctionData, numberToBytes } from 'viem';
import crypto from 'crypto';

const walletPvtKey = process.env.WALLET_PVT_KEY || 'DEFAULT_PRIVATE_KEY';
const account = privateKeyToAccount(`0x${walletPvtKey}`);
const accountAddress = '0x506A0A501EEa89d36B0308d965F78553D75cCBE5';

const safeFactoryAddress = '0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC';
const safeSingletonAddress = '0xfb1bffC9d739B8D520DaF37dF666da4C687191EA';
const address0 = '0x0000000000000000000000000000000000000000';
const fallbackHandlerAddress = '0x017062a1dE2FE6b99BE3d9d37841FeD19F573804';

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
      address0,
      numberToBytes(0),
      fallbackHandlerAddress,
      address0,
      0,
      address0,
    ],
  });

  const saltNonce = generateSecureSaltNonce(userAddress);

  try {
    const { result } = await publicClient.simulateContract({
      ...SAFE_FACTORY,
      address: safeFactoryAddress,
      functionName: 'createProxyWithNonce',
      args: [safeSingletonAddress, initData, saltNonce],
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
