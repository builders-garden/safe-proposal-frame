import { BASE_URL } from '../lib/constants';

export default function Page() {
  return (
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
      <a href="https://builders.garden?utm_source=safe-frame" target="_blank">
        <img src={`${BASE_URL}/builders-garden-logo.png`} height={32} width={104} />
      </a>

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
        Safe Proposal Frame
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#10D63F',
          fontSize: '24px',
          textAlign: 'center',
          fontFamily: 'Raleway-Bold',
        }}
      >
        Experimenting with the Safe Modules and Proposals inside a Farcaster Frame
      </div>
    </div>
  );
}
