import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import WalletConnect from '@walletconnect/client';
import { providers } from 'ethers';

interface WalletConnectContextType {
  connector: WalletConnect | null;
  setConnector: Dispatch<SetStateAction<WalletConnect | null>>;
  provider: providers.JsonRpcProvider | null;
}

const WalletConnectContext = createContext<WalletConnectContextType>({
  connector: null,
  setConnector: () => null,
  provider: null,
});

export const useConnectWallet = () => useContext(WalletConnectContext);

export function ConnectWalletProvider({ children }: PropsWithChildren<{}>) {
  const [connector, setConnector] = useState<null | WalletConnect>(null);
  const provider = new providers.JsonRpcProvider(
    'https://optimism-mainnet.infura.io/v3/9428ac75c6694bf69d325e35e89bd266'
  );

  useEffect(() => {
    if (connector) {
      // Check if connection is already established
      if (!connector.connected) {
        // create new session
        connector.createSession();
      }
    }
  }, [connector]);
  return (
    <WalletConnectContext.Provider
      value={{ connector, setConnector, provider }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
}
