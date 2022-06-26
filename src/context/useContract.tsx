import { Contract } from 'ethers';
import { createContext, PropsWithChildren, useContext } from 'react';
import erc20 from '../abis//ERC20.json';
import abi from '../abis/PozitionsNFT.json';

interface Contracts {
  69: {
    FuturesContract: Contract | null;
    sUSD: Contract | null;
  };
  10: {
    FuturesContract: Contract | null;
    sUSD: Contract | null;
  };
}

const ContractContext = createContext<Contracts>({
  69: {
    FuturesContract: null,
    sUSD: null,
  },
  10: {
    FuturesContract: null,
    sUSD: null,
  },
});

export const useContract = () => useContext(ContractContext);

export function ContractProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ContractContext.Provider
      value={{
        69: {
          FuturesContract: new Contract(
            '0x3A38D3012C8E30AE9F1daf9dC44BAB0fd3c6d37B',
            abi
          ),
          sUSD: new Contract(
            '0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57',
            erc20
          ),
        },
        10: {
          // TODO @MF update address to mainnet one
          FuturesContract: new Contract(
            '0x3A38D3012C8E30AE9F1daf9dC44BAB0fd3c6d37B',
            abi
          ),
          sUSD: new Contract(
            '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
            erc20
          ),
        },
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}
