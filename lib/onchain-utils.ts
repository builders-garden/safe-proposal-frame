import { FarcasterNetwork, Message, MessageData, MessageType } from '@farcaster/core';

export const getContractCallArgs = (messageBytes: string): string[] => {
  const message = Message.decode(Buffer.from(messageBytes, 'hex'));
  const messageSignature = message.signature;

  const messageData: MessageData = {
    type: message.data?.type as MessageType,
    fid: message.data?.fid as number,
    timestamp: message.data?.timestamp as number,
    network: message.data?.network as FarcasterNetwork,
    frameActionBody: message.data?.frameActionBody,
  };

  const messageEncoded = MessageData.encode(messageData).finish();

  const args = [
    '0x' + Buffer.from(message.signer).toString('hex'),
    '0x' + Buffer.from(messageSignature).subarray(0, 32).toString('hex'),
    '0x' + Buffer.from(messageSignature).subarray(32, 64).toString('hex'),
    '0x' + Buffer.from(messageEncoded).toString('hex'),
  ];

  return args;
};
