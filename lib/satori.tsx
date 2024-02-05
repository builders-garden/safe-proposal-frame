import { join } from 'path';
import satori from 'satori';
import * as fs from 'fs';
import { BASE_URL } from './constants';
import Bar from './components/Bar';

const fontPath = join(process.cwd(), 'Raleway-Bold.ttf');
let fontData = fs.readFileSync(fontPath);

const fontExtraBoldPath = join(process.cwd(), 'Raleway-ExtraBold.ttf');
let fontExtraBoldData = fs.readFileSync(fontExtraBoldPath);

const fontSemiBoldItalicPath = join(process.cwd(), 'Raleway-SemiBoldItalic.ttf');
let fontSemiBoldItalicData = fs.readFileSync(fontSemiBoldItalicPath);

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
        Make sure to switch your wallet to Sepolia network in order to check your newly deployed
        Safe!
      </div>
    </div>,
    {
      width: 600,
      height: 315,
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

export const generateInitImageSvg = async (
  acceptVotes: number,
  rejectVotes: number,
  minFid: number,
  threshold: number,
): Promise<string> => {
  return await satori(
    <div
      style={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <img src={`${BASE_URL}/builders-garden-logo.png`} height={32} width={104} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#10D63F',
            fontSize: '42px',
            textAlign: 'center',
            fontFamily: 'Raleway-ExtraBold',
          }}
        >
          Onchain Safe Proposal #1:
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFFF',
            fontSize: '26px',
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: 'Raleway-SemiBoldItalic',
          }}
        >
          "Transfer 1 SepoliaETH to limone.eth"
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          paddingTop: '20px',
          width: '400px',
        }}
      >
        <Bar color="#065519" borderColor="#054D17" value={acceptVotes} threshold={threshold} />
        <Bar color="#660F0F" borderColor="#991717" value={rejectVotes} threshold={threshold} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#A3A3A3',
          fontSize: '16px',
          textAlign: 'center',
          width: '400px',
        }}
      >
        Propagating the vote might take a while, refresh to get the latest status.
      </div>
    </div>,
    {
      width: 600,
      height: 315,
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
        {
          data: fontSemiBoldItalicData,
          name: 'Raleway-SemiBoldItalic',
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
};

export const generateInvalidFidImageSvg = async (fid: string, minFid: string): Promise<string> => {
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
        Invalid FID
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          marginTop: '2rem',
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        Your FID is {fid} but the minimum required FID is {minFid}
      </div>
    </div>,
    {
      width: 600,
      height: 315,
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
