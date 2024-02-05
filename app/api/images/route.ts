import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
  // Set the content type to PNG and send the response
  return NextResponse.json({ message: 'what are you doing here?!' });
};

