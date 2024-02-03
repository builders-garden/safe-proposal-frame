import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createSafe, getSafeUrl } from '../../../lib/safe';
import { BASE_URL } from '../../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (isValid) {
    console.log(message.interactor.verified_accounts);
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (!accountAddress) {
    console.error('Error: no account address');
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        post_url: `${BASE_URL}/api/frame`,
      }),
    );
  }

  try {
    const newSafeAddress = await createSafe(accountAddress);
    console.log('New safe address:', newSafeAddress);
    if (!newSafeAddress) {
      throw new Error('Error creating safe');
    }
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'check your safe 📦',
            action: 'post_redirect',
          },
        ],
        image: `${BASE_URL}/api/image?address=${newSafeAddress}`,
        post_url: getSafeUrl(newSafeAddress!),
      }),
    );
  } catch (e) {
    console.error('Error creating safe', e);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        post_url: `${BASE_URL}/api/frame`,
      }),
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
