import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { createSafe, getSafeConfig, predictSafeAddress } from '../../../lib/safe';
import { BASE_URL, RPC_URL } from '../../../lib/constants';
import { ethers } from 'ethers';
import { EthersAdapter } from '@safe-global/protocol-kit';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (!accountAddress) {
    console.error('Error: no account address');
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        post_url: `${BASE_URL}/api/frame`,
      }),
    );
  }

  try {
    const safeAccountConfig = getSafeConfig(accountAddress);
    const saltNonce = Date.now().toString();
    
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Initialize signers
    const signer = new ethers.Wallet(process.env.WALLET_PVT_KEY!, provider);

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const predictedSafeAddress = await predictSafeAddress(safeAccountConfig, saltNonce, ethAdapter);
    const newSafeAddress = createSafe(safeAccountConfig, saltNonce, ethAdapter);
    console.log('Predicted safe address:', predictedSafeAddress);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'check your safe 📦',
            action: 'post_redirect',
          },
        ],
        image: `${BASE_URL}/api/image?address=${predictedSafeAddress}`,
        post_url: `${BASE_URL}/api/redirect?address=${predictedSafeAddress}`,
      }),
    );
  } catch (e) {
    console.error('Error creating safe', e);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        post_url: `${BASE_URL}/api/frame`,
      }),
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
