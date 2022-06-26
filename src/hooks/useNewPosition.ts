import { BigNumber, constants, Contract } from 'ethers';
import { KovanFactoryManager, KovanSUSD } from '../constants/contracts';
import { useConnectWallet } from '../context/useConnectWalletContext';
import erc20 from '../abis/ERC20.json';
import { Interface } from 'ethers/lib/utils';

export default function useNewPosition() {
  const { connector, provider } = useConnectWallet();
  const calcDelta = (data: {
    market: string;
    amount: string;
    side: 'long' | 'short';
    leverage: 1 | 2 | 5 | 10;
  }) => {
    if (data.market === 'FuturesMarketBTC') {
    }
  };

  const approve = async () => {
    const data = new Interface(erc20).encodeFunctionData('approve', [
      KovanFactoryManager,
      constants.MaxUint256,
    ]);
    const res = await connector?.sendTransaction({
      to: KovanSUSD,
      data,
      from: connector.accounts[0],
    });
    return res;
  };
  const hasAllowance = async () => {
    if (provider && connector?.accounts.length) {
      const contract = new Contract(KovanSUSD, erc20, provider);
      const res: BigNumber = await contract.functions.allowance(
        connector.accounts[0],
        KovanFactoryManager
      );
      return res.gt(0);
    }
    return false;
  };
  return { calcDelta, hasAllowance, approve };
}
