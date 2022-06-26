import { Contract } from 'ethers';
import { createContext, PropsWithChildren, useContext } from 'react';
import { KovanFuturesPositionsManager } from '../constants/contracts';
import abi from '../abis/PozitionsNFT.json';

interface Contracts {
  kovan: {
    KovanFuturesContract: Contract | null;
  };
  'optimism-mainnet': {
    KovanFuturesContract: Contract | null;
  };
}

const ContractContext = createContext<Contracts>({
  kovan: {
    KovanFuturesContract: null,
  },
  'optimism-mainnet': {
    KovanFuturesContract: null,
  },
});

export const useContract = () => useContext(ContractContext);

export function ContractProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ContractContext.Provider
      value={{
        kovan: {
          KovanFuturesContract: new Contract(KovanFuturesPositionsManager, abi),
        },
        'optimism-mainnet': {
          // TODO @MF update address to mainnet one
          KovanFuturesContract: new Contract(KovanFuturesPositionsManager, abi),
        },
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}
