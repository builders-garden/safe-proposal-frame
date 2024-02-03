import { kv } from '@vercel/kv';

export const setDeployedSafeAddress = async (address: string, safeAddress: string) => {
  return await kv.set(address, safeAddress);
};

export const getDeployedSafeAddress = async (address: string) => {
  return await kv.get(address);
};
