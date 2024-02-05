import { NextRequest, NextResponse } from 'next/server';
import { FrameActionPayload, getFrameHtml, validateFrameMessage } from 'frames.js';
import { initialFrameResponse, tryAgainResponse } from '../../../lib/frame-responses';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();

  const { isValid } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(tryAgainResponse());
  }
  return new NextResponse(initialFrameResponse());
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
