import { ApolloClient, DefaultOptions, InMemoryCache, gql } from '@apollo/client';

const API_URL = 'https://api.thegraph.com/subgraphs/name/soliditydrone/safe-proposal-frame';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const getVotes = async (fid: string, proposalId: string) => {
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    defaultOptions,
  });

  console.log(fid, proposalId);

  const votesQuery = `
    {
      votes(where: {proposalID: "${proposalId.toString()}", fid: "${fid.toString()}"}) {
        id
        votesCounter
        fid
        proposalID
      }
    }`;

  const { data } = await client.query({
    query: gql(votesQuery),
  });

  return data;
};

export const hasVoted = async (fid: string, proposalId: string): Promise<boolean> => {
  const data = await getVotes(fid, proposalId);
  return data?.votes?.length > 0;
};

export interface Proposal {
  id: string;
  votes: {
    id: string;
  }[];
  votesCount: string;
  minimumFid: string;
  acceptedVotes: string;
  rejectedVotes: string;
  treshold: string;
}

export const getProposal = async (proposalId: string): Promise<Proposal | null> => {
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    defaultOptions,
  });
  const proposalsQuery = `
    {
      proposals(where: {id: ${proposalId.toString()}}) {
        id
        votes {
          id
        }
        acceptedVotes
        rejectedVotes
        minimumFid
        treshold
      }
    }`;

  const { data } = await client.query({
    query: gql(proposalsQuery),
  });

  if (!data.proposals || data.proposals.length === 0) {
    return null;
  }

  return data.proposals[0];
};
