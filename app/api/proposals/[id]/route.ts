import { NextRequest, NextResponse } from 'next/server';
import { PROPOSAL_ID } from '../../../../lib/constants';
import { FrameActionPayload, validateFrameMessage } from 'frames.js';
import { sendVoteTransaction } from '../../../../lib/ethers';
import {
  alreadyVotedResponse,
  invalidFidResponse,
  resultsResponse,
  thresholdReachedResponse,
  tryAgainResponse,
} from '../../../../lib/frame-responses';
import { getProposal, hasVoted } from '../../../../lib/the-graph';

async function getResponse(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();
  const id = params.id;

  const { isValid, message } = await validateFrameMessage(body);

  if (!isValid) {
    console.error('Error: invalid message');
    return new NextResponse(tryAgainResponse(id));
  }

  const proposal = await getProposal(id);

  if (!proposal) {
    console.error(`Proposal with ID ${id} not found`);
    return new NextResponse(tryAgainResponse(id));
  }

  if (proposal.votesCount >= proposal.treshold) {
    console.error(`Proposal threshold reached`);
    return new NextResponse(thresholdReachedResponse(id));
  }

  if (message?.data.fid! > 20000) {
    console.error('Error: invalid fid', { fid: message?.data.fid, minFid: proposal?.minimumFid });
    return new NextResponse(
      invalidFidResponse(message!.data.fid!.toString(), parseInt(proposal?.minimumFid!), id),
    );
  }

  try {
    const didVote = await hasVoted(message?.data.fid!.toString()!, id.toString());
    if (didVote) {
      return new NextResponse(alreadyVotedResponse(id));
    }

    console.log('Sending vote transaction');
    await sendVoteTransaction(body.trustedData.messageBytes, id);
    console.log('Vote transaction sent');

    return new NextResponse(resultsResponse(id));
  } catch (e) {
    console.error('Error creating safe', e);
    return new NextResponse(tryAgainResponse(id));
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<Response> {
  return getResponse(req, { params });
}

export const dynamic = 'force-dynamic';
