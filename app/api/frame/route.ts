import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createSafe } from '../../../lib/safe';
import { BASE_URL } from '../../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (!accountAddress) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.`,
        post_url: `${BASE_URL}/api/frame`,
      }),
    );
  }

  const newSafeAddress = await createSafe(accountAddress);
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'try again ↩️',
        },
      ],
      image: `${BASE_URL}/api/image?address=${newSafeAddress}.`,
      post_url: `${BASE_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
