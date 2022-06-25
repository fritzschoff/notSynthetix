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

interface WalletConnectContextType {
  connector: WalletConnect | null;
  setConnector: Dispatch<SetStateAction<WalletConnect | null>>;
}

const WalletConnectContext = createContext<unknown>(null);

export const useConnectWallet = () => {
  return useContext(WalletConnectContext) as WalletConnectContextType;
};

export function ConnectWalletProvider({ children }: PropsWithChildren<{}>) {
  const [connector, setConnector] = useState<null | WalletConnect>(null);

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
    <WalletConnectContext.Provider value={{ connector, setConnector }}>
      {children}
    </WalletConnectContext.Provider>
  );
}
