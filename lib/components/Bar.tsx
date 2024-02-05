import React from 'react';

interface BarProps {
  borderColor: string;
  color: string;
  value: number;
  threshold: number;
}

const Bar: React.FC<BarProps> = ({ borderColor, color, value, threshold }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '30px',
        border: `1px solid ${borderColor}`,
        borderRadius: 4,
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          backgroundColor: color,
          width: `${(value / threshold) * 100}%`,
          height: `100%`,
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          color: '#fff',
          whiteSpace: 'nowrap',
          overflow: 'visible',
          paddingLeft: '16px',
        }}
      >
        {value}/{threshold}
      </div>
    </div>
  );
};

export default Bar;
