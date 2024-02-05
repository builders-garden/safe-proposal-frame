import { ethers } from 'ethers';
import { MODULE_ADDRESS, RPC_URL } from './constants';
import { SAFE_MODULE_ABI } from './ABI';
import { getContractCallArgs } from './onchain-utils';

export const getEthers = () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(process.env.WALLET_PVT_KEY!, provider);
  return {
    signer,
    provider,
  };
};

export const sendVoteTransaction = async (messageBytes: string, proposalId: string) => {
  const { signer } = getEthers();
  const contractInterface = new ethers.utils.Interface(SAFE_MODULE_ABI);

  const args = getContractCallArgs(messageBytes);

  const contract = new ethers.Contract(MODULE_ADDRESS, SAFE_MODULE_ABI, signer);

  signer.sendTransaction({
    to: MODULE_ADDRESS,
    value: 0,
    gasLimit: 3000000,
    data: contractInterface.encodeFunctionData('verifyFrameActionBodyMessage', [
      args[0],
      args[1],
      args[2],
      args[3],
      proposalId,
    ]),
  });
};
