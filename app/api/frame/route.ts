import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, CONTRACT_ADDRESS, PROPOSAL_ID, RPC_URL } from '../../../lib/constants';
import { ethers } from 'ethers';
import { getFrameHtml, validateFrameMessage } from 'frames.js';
import { getContractCallArgs } from '../../../lib/onchain-utils';
import { SAFE_MODULE_ABI } from '../../../lib/ABI';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body = await req.json();

  const { isValid, message } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(
      getFrameHtml({
        version: 'vNext',
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        postUrl: `${BASE_URL}/api/frame`,
      }),
    );
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(process.env.WALLET_PVT_KEY!, provider);
    const args = getContractCallArgs(body.messageBytes);

    const Contract = new ethers.Contract(MODULE_ADDRESS, SAFE_MODULE_ABI);

    const tx = Contract.verifyFrameActionBodyMessage(...args, PROPOSAL_ID);

    return new NextResponse(
      getFrameHtml({
        version: 'vNext',
                image: `${BASE_URL}/api/image?address=x`,
        postUrl: `${BASE_URL}/api/redirect?address=x`,
      }),
    );
  } catch (e) {
    console.error('Error creating safe', e);
    return new NextResponse(
      getFrameHtml({
        version: 'vNext',
        buttons: [
          {
            label: 'try again ↩️',
          },
        ],
        image: `${BASE_URL}/error-img.png`,
        postUrl: `${BASE_URL}/api/frame`,
      }),
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
