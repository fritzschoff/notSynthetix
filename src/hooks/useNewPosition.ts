import { BigNumber, constants } from 'ethers';
import { useConnectWallet } from '../context/useConnectWalletContext';
import { useContract } from '../context/useContract';

export default function useNewPosition() {
  const { connector, provider } = useConnectWallet();
  const contracts = useContract();
  const calcDelta = (data: {
    market: string;
    amount: string;
    side: 'long' | 'short';
    leverage: 1 | 2 | 5 | 10;
  }) => {
    if (data.market === 'FuturesMarketBTC') {
    }
    if (data.market === 'FuturesMarketETH') {
    }
    if (data.market === 'FuturesMarketLINK') {
    }
  };
  const approve = async () => {
    if (connector) {
      const data = contracts[
        connector.chainId as 10 | 69
      ].sUSD?.interface.encodeFunctionData('approve', [
        connector.accounts[0],
        constants.MaxUint256,
      ]);
      const res = await connector.sendTransaction({
        to: contracts[connector.chainId as 10 | 69].sUSD?.address,
        data,
        from: connector.accounts[0],
      });
      return res;
    }
    return;
  };
  const hasAllowance = async () => {
    if (provider && connector?.accounts.length) {
      const contract = contracts[connector.chainId as 10 | 69].sUSD!.connect(
        provider[connector.chainId as 10 | 69]!
      );
      const res: BigNumber = await contract.allowance(
        connector.accounts[0],
        contracts[connector.chainId as 10 | 69].FuturesContract?.address
      );
      return res.gt(0);
    }
    return false;
  };
  return { calcDelta, hasAllowance, approve };
}
