import { join } from 'path';
import satori from 'satori';
import * as fs from 'fs';
import { BASE_URL } from './constants';

const fontPath = join(process.cwd(), 'HirukoBlackAlternate.ttf');
let fontData = fs.readFileSync(fontPath);

const scoreFontPath = join(process.cwd(), 'DK-Smiling-Cat.otf');
let scoreFontData = fs.readFileSync(scoreFontPath);

export const generateImageSvg = async (safeAddress: string): Promise<string> => {
  return await satori(
    <div
      style={{
        backgroundColor: '#BDE86B',
        display: 'flex',
        flexDirection: 'column',
        padding: '3.5rem',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'space-around',
      }}
    >
      <img src={`${BASE_URL}/builders-garden-logo.png`} height={130} width={42} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {safeAddress}
      </div>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          data: fontData,
          name: 'Hiruko',
          style: 'normal',
          weight: 400,
        },
        {
          data: scoreFontData,
          name: 'DKSmilingCat',
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
};
