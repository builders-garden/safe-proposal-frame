import sharp from 'sharp';
import { generateImageSvg } from '../../../lib/satori';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') ?? undefined;
  if (!address) {
    return new Response('Error: no address', { status: 400 });
  }

  const svg = await generateImageSvg(address);

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
