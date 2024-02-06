import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '../../../lib/constants';
import { FrameActionPayload, getFrameHtml, validateFrameMessage } from 'frames.js';
import { resultsResponse, tryAgainResponse } from '../../../lib/frame-responses';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get('proposalId')!;

  const body: FrameActionPayload = await req.json();

  const { isValid } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(tryAgainResponse(proposalId));
  }

  return new NextResponse(resultsResponse(proposalId));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
