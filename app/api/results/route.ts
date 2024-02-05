import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '../../../lib/constants';
import { FrameActionPayload, getFrameHtml, validateFrameMessage } from 'frames.js';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get('proposalId')!;

  const body: FrameActionPayload = await req.json();

  const { isValid } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(
      getFrameHtml({
        version: 'vNext',
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        postUrl: `${BASE_URL}/api/frame`,
      }),
    );
  }

  return new NextResponse(
    getFrameHtml({
      version: 'vNext',
      buttons: [
        {
          label: 'refresh 🔄',
        },
      ],
      image: `${BASE_URL}/api/results-image?proposalId=${proposalId}`,
      postUrl: `${BASE_URL}/api/results?proposalId=${proposalId}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
