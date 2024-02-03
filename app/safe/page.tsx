'use client';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { getSafeUrl } from '../../lib/safe';

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
  redirect(getSafeUrl(address));

  return (
    <div>
      <p>{address}</p>
    </div>
  );
}
