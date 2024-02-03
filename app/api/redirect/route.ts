import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '../../../lib/constants';

export async function POST(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') ?? undefined;
  const redirectLocation = `${BASE_URL}/safe?address=${address}`;
  return new NextResponse(null, {
    status: 302,
    headers: { Location: redirectLocation },
  });
}

export const dynamic = 'force-dynamic';
