'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getSafeUrl } from '../../lib/safe';

export default function RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const address = searchParams.get('address');

  console.log('address', address);

  if (!address) {
    throw new Error('Missing address');
  }

  useEffect(() => {
    console.log('here');
    const safeUrl = getSafeUrl(address);

    console.log('safeUrl', safeUrl);

    // Perform the redirect
    window.location.href = safeUrl; // For a full page reload redirect
    // Or use Next.js router for client-side redirect (comment out the line above if using this)
    // router.push(youtubeUrl);
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
