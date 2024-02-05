import sharp from 'sharp';
import { generateInvalidFidImageSvg } from '../../../../lib/satori';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid')!;
  const minFid = searchParams.get('minFid')!;
  const svg = await generateInvalidFidImageSvg(fid, minFid);

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
