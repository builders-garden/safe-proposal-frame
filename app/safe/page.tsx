'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSafeUrl } from '../../lib/safe';
import { NextResponse } from 'next/server';

export default function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const address = searchParams.get('address');

  if (!address) {
    return (
      <div>
        <p>address query param not found</p>
      </div>
    );
  }
  console.log('redirecting to', getSafeUrl(address));

  return NextResponse.redirect(getSafeUrl(address), { status: 302 });
}
