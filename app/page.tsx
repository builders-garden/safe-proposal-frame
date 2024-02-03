import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { BASE_URL } from '../lib/constants';
import { privateKeyToAccount } from 'viem/accounts';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'deploy safe 🚀',
    },
  ],
  image: `${BASE_URL}/init-img.png`,
  post_url: `${BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'safe frame',
  description: 'a farcaster frame integrated with safe',
  openGraph: {
    title: 'safe frame',
    description: 'a farcaster frame integrated with safe',
    images: [`${BASE_URL}/init-img.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>safe frame by builders.garden</h1>
    </>
  );
}
