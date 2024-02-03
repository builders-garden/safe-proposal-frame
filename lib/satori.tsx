import { join } from 'path';
import satori from 'satori';
import * as fs from 'fs';
import { BASE_URL } from './constants';

const fontPath = join(process.cwd(), 'Raleway-Bold.ttf');
let fontData = fs.readFileSync(fontPath);

const fontExtraBoldPath = join(process.cwd(), 'Raleway-ExtraBold.ttf');
let fontExtraBoldData = fs.readFileSync(fontExtraBoldPath);

export const generateImageSvg = async (safeAddress: string): Promise<string> => {
  return await satori(
    <div
      style={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        padding: '3.5rem',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <img src={`${BASE_URL}/builders-garden-logo.png`} height={32} width={104} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          fontSize: '48px',
          textAlign: 'center',
          fontFamily: 'Raleway-ExtraBold',
        }}
      >
        Safe successfully deployed!
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          marginTop: '2rem',
          fontSize: '24px',
        }}
      >
        {safeAddress}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          marginTop: '2rem',
          fontSize: '16px',
          textAlign: 'center',
        }}
      >
        Make sure to switch your wallet to Sepolia network in order to check your newly deployed Safe!
      </div>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          data: fontData,
          name: 'Raleway-Bold',
          style: 'normal',
          weight: 400,
        },
        {
          data: fontExtraBoldData,
          name: 'Raleway-ExtraBold',
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
};
