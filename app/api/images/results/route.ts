import sharp from 'sharp';
import { generateResultsImageSvg } from '../../../../lib/satori';
import { getProposal } from '../../../../lib/the-graph';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const proposalId = searchParams.get('proposalId')!;
  const proposal = await getProposal(proposalId);

  if (!proposal) {
    return new Response(null, { status: 404 });
  }

  const svg = await generateResultsImageSvg(
    parseInt(proposal.acceptedVotes),
    parseInt(proposal.rejectedVotes),
    parseInt(proposal.treshold),
  );

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

  // Set the content type to PNG and send the response
  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=10',
    },
  });
};

export const dynamic = 'force-dynamic';
