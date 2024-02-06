import { NextResponse } from 'next/server';
import { getVotes } from '../../../lib/the-graph';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get('proposalId')!;
  const fid = searchParams.get('fid')!;
  const results = await getVotes(fid, proposalId);
  const proposal = results.proposal;
  // Set the content type to PNG and send the response
  return NextResponse.json({ results, proposal });
};

export const dynamic = 'force-dynamic';
