import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '../../../lib/constants';
import { getSafeUrl } from '../../../lib/safe';

export async function POST(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') ?? undefined;
  // const redirectLocation = `${BASE_URL}/safe?address=${address}`;
  const redirectLocation = getSafeUrl(address!);
  return NextResponse.redirect(redirectLocation, { status: 302 });
}

export const dynamic = 'force-dynamic';
