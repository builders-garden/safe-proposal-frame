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

  const safeUrl = getSafeUrl(address);
  redirect(safeUrl);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
