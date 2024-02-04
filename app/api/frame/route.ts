import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL, MODULE_ADDRESS, PROPOSAL_ID, RPC_URL } from '../../../lib/constants';
import { BigNumber, ethers } from 'ethers';
import { FrameActionPayload, getFrameHtml, validateFrameMessage } from 'frames.js';
import { getContractCallArgs } from '../../../lib/onchain-utils';
import { SAFE_MODULE_ABI } from '../../../lib/ABI';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();

  const { isValid } = await validateFrameMessage(body);

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
    console.log('getting contract args');
    const args = getContractCallArgs(body.trustedData.messageBytes);
    console.log('args', args);

    const contractInterface = new ethers.utils.Interface(SAFE_MODULE_ABI);

    console.log('executing tx');
    console.log([args[0], args[1], args[2], args[3], BigNumber.from(PROPOSAL_ID)]);
    const tx = signer.sendTransaction({
      to: MODULE_ADDRESS,
      value: 0,
      data: contractInterface.encodeFunctionData('verifyFrameActionBodyMessage', [
        args[0],
        args[1],
        args[2],
        args[3],
        PROPOSAL_ID,
      ]),
    });
    console.log('tx done', tx);
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
