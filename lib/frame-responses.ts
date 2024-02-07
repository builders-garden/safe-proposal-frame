import { getFrameHtml } from 'frames.js';
import { BASE_URL } from './constants';

export const tryAgainResponse = (id: string) =>
  getFrameHtml({
    version: 'vNext',
    buttons: [
      {
        label: 'try again ↩️',
      },
    ],
    image: `${BASE_URL}/error-img.png`,
    postUrl: `${BASE_URL}/api/proposals/${id}/init`,
  });

export const resultsResponse = (proposalId: string) =>
  getFrameHtml({
    version: 'vNext',
    buttons: [
      {
        label: 'refresh 🔄',
      },
    ],
    image: `${BASE_URL}/api/images/results?proposalId=${proposalId}`,
    postUrl: `${BASE_URL}/api/results?proposalId=${proposalId}`,
  });

export const invalidFidResponse = (fid: string, minFid: number, proposalId: string) =>
  getFrameHtml({
    version: 'vNext',
    buttons: [
      {
        label: 'check proposal status ↩️',
      },
    ],
    image: `${BASE_URL}/api/images/invalid-fid?fid=${fid}&minFid=${minFid}`,
    postUrl: `${BASE_URL}/api/results?proposalId=${proposalId}`,
  });

export const initialFrameResponse = (proposalId: string) =>
  getFrameHtml({
    version: 'vNext',
    buttons: [
      {
        label: 'approve ✅',
      },
      {
        label: 'reject ❌',
      },
    ],
    image: `${BASE_URL}/init-img.png`,
    postUrl: `${BASE_URL}/api/proposals/${proposalId}`,
  });

export const alreadyVotedResponse = (proposalId: string) =>
  getFrameHtml({
    version: 'vNext',
    buttons: [
      {
        label: 'check proposal status 📊',
      },
    ],
    image: `${BASE_URL}/api/images/already-voted-img.png`,
    postUrl: `${BASE_URL}/api/results?proposalId=${proposalId}`,
  });

export const thresholdReachedResponse = (proposalId: string) =>
  getFrameHtml({
    version: 'vNext',
    buttons: [
      {
        label: 'check proposal status ↩📊',
      },
    ],
    image: `${BASE_URL}/api/images/threshold-reached-img.png`,
    postUrl: `${BASE_URL}/api/results?proposalId=${proposalId}`,
  });
