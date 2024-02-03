import { getFrameHtmlResponse, getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { BASE_URL } from '../lib/constants';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'deploy safe 🚀',
    },
  ],
  image: `${BASE_URL}/init-img.png`,
  post_url: `${BASE_URL}/api/frame`,
});

const frameRedirectMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'check your safe 📦',
      action: 'post_redirect',
    },
  ],
  image: `${BASE_URL}/api/image?address=x`,
  post_url: `${BASE_URL}/api/redirect?address=x`,
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
    ...frameRedirectMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>safe frame by builders.garden</h1>
    </>
  );
}
