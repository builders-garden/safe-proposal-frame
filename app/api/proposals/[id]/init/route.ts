import { NextRequest, NextResponse } from 'next/server';
import { FrameActionPayload, validateFrameMessage } from 'frames.js';
import { initialFrameResponse, tryAgainResponse } from '../../../../../lib/frame-responses';

async function getResponse(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();
  const id = params.id;

  const { isValid } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(tryAgainResponse(id));
  }
  return new NextResponse(initialFrameResponse(id));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  return getResponse(req, { params });
}

export const dynamic = 'force-dynamic';
