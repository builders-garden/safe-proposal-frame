import { NextRequest, NextResponse } from 'next/server';
import { PROPOSAL_ID } from '../../../lib/constants';
import { FrameActionPayload, validateFrameMessage } from 'frames.js';
import { sendVoteTransaction } from '../../../lib/ethers';
import {
  invalidFidResponse,
  resultsResponse,
  tryAgainResponse,
} from '../../../lib/frame-responses';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();

  const { isValid, message } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(tryAgainResponse());
  }

  if (message?.data.fid! > 20000) {
    console.error('Error: invalid fid', { fid: message?.data.fid });
    return new NextResponse(invalidFidResponse(message!.data.fid!.toString(), 20000));
  }

  try {
    /*const { signer } = getEthers();

    const contractInterface = new ethers.utils.Interface(SAFE_MODULE_ABI);

    const args = getContractCallArgs(body.trustedData.messageBytes);

    const contract = new ethers.Contract(MODULE_ADDRESS, SAFE_MODULE_ABI, signer);
    const hasVoted = await contract.voted(args[0], BigNumber.from(PROPOSAL_ID));

    if (hasVoted) {
      return new NextResponse(resultsResponse(PROPOSAL_ID));
    }*/
    console.log('Sending vote transaction');
    await sendVoteTransaction(body.trustedData.messageBytes, PROPOSAL_ID);
    console.log('Vote transaction sent');

    return new NextResponse(resultsResponse(PROPOSAL_ID));
  } catch (e) {
    console.error('Error creating safe', e);
    return new NextResponse(tryAgainResponse());
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
