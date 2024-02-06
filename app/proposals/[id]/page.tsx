import { Frame, getFrameFlattened } from 'frames.js';
import type { Metadata } from 'next';
import { BASE_URL } from '../../../lib/constants';
import { getProposal } from '../../../lib/the-graph';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const proposal = await getProposal(id);

  if (!proposal) {
    return {
      title: `Proposal #${id}`,
      openGraph: {
        title: `Proposal #${id}`,
      },
      metadataBase: new URL(BASE_URL || ''),
    };
  }

  const fcMetadata: Record<string, string> = getFrameFlattened({
    version: 'vNext',
    buttons: [
      {
        label: 'approve ✅',
      },
      {
        label: 'reject ❌',
      },
    ],
    image: `${BASE_URL}/api/proposals/1/image`,
    postUrl: `${BASE_URL}/api/proposals/1`,
  });

  return {
    title: `Proposal #${id}`,
    openGraph: {
      title: `Proposal #${id}`,
      images: [`${BASE_URL}/api/proposals/${id}/image`],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL(BASE_URL || ''),
  };
}

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        padding: '3.5rem',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <a href="https://builders.garden?utm_source=safe-frame" target="_blank">
        <img src={`${BASE_URL}/builders-garden-logo.png`} height={32} width={104} />
      </a>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          fontSize: '48px',
          textAlign: 'center',
          fontFamily: 'Raleway-ExtraBold',
        }}
      >
        Safe Proposal Frame
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          fontSize: '24px',
          textAlign: 'center',
          fontFamily: 'Raleway-Bold',
        }}
      >
        Experimenting with the Safe Modules and Proposals inside a Farcaster Frame
      </div>
    </div>
  );
}
