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
import WalletConnectProvider from '@walletconnect/web3-provider';
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
    '9428ac75c6694bf69d325e35e89bd266'
  );

  useEffect(() => {
    if (connector) {
      // Check if connection is already established
      if (!connector.connected) {
        // create new session
        connector.createSession();
      }

      // Subscribe to connection events
      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
      });

      connector.on('session_update', (error, payload) => {
        if (error) {
          throw error;
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
      });
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
