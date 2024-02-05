import { kv } from '@vercel/kv';

export const setVoted = async (fid: string) => {
  return await kv.set(fid, 'voted');
};

export const getVoted = async (fid: string) => {
  return await kv.get(fid);
};