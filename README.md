# Safe Frame

This Safe proposal Frame allows users to vote on a Safe proposal from a Frame.
It leverages the `frame.js` framework for the frame part, a `Safe Module` for proposals and voting management, and `The Graph` for indexing voting data from the blockchain.

## Features

- **On-Chain Voting**: Enable direct voting on on-chain proposals. A Proposal is a transfer of a certain token amount to an address receiver at the moment.
- **Real-Time Indexing**: Use The Graph to index voting data from the chain, ensuring up-to-date information using our subgraph
- **Safe Module**: Utilize a Safe Module for secure and efficient vote handling.
  
## References
- Safe address: 0xAb496b30E812270bf3791ea0c17580499d17F1aD
- Safe Module address: 0x3590D281d523ddCd4c0449C98A1e320066c34636
- Safe Module code: https://github.com/builders-garden/safe-proposal-frame-contracts
- Subgraph: https://thegraph.com/hosted-service/subgraph/soliditydrone/safe-proposal-frame

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12.x or higher recommended)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

1. **Clone the repository:**

git clone https://github.com/builders-garden/safe-proposal-frame.git

cd your-repo-name

2. **Install dependencies:**
yarn

3. **Set up env variables:**
Set up environment (.env file) variables

4. **Run the project:**
yarn dev

# License
The project is released under MIT license, feel free to fork and improve the projects

# Contacts
contact @limone.eth, @frankk, @orbulo on Farcaster




