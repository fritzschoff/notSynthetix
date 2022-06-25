import { useConnectWallet } from '../context/useConnectWalletContext';
import { useForm } from 'react-hook-form';
import { markets } from '../constants/markets';
import './CreatePosition.css';
import { useEffect, useState } from 'react';
import BackButton from './BackButton';

export default function CreatePosition() {
  const [prices, setPrices] = useState<null | {
    link: { usd: number };
    bitcoin: { usd: number };
    ethereum: { usd: number };
  }>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [typeOfPosition, setTypeOfPosition] = useState<null | 'long' | 'short'>(
    null
  );
  const [leverage, setLeverage] = useState<1 | 2 | 5 | 10>(1);
  const { connector } = useConnectWallet();
  const onSubmit = (data: any) => console.log(data, typeOfPosition, leverage);

  useEffect(() => {
    const init = async () => {
      const respEthereum = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      const respBitcoin = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      );
      const respLink = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd'
      );
      const { bitcoin } = await respBitcoin.json();
      const { ethereum } = await respEthereum.json();
      const { chainlink } = await respLink.json();
      setPrices({
        link: chainlink.usd,
        bitcoin: bitcoin.usd,
        ethereum: ethereum.usd,
      });
    };
    init();
  }, []);

  return (
    <>
      <div className="createPositionHeadline">
        <BackButton />
        <h1>Create new Pozition</h1>
      </div>
      <div className="newPositionForm">
        <select {...register('market')}>
          <option value={markets.FuturesMarketETH}>ETH</option>
          <option value={markets.FuturesMarketBTC}>BTC</option>
          <option value={markets.FuturesMarketLINK}>LINK</option>
        </select>
        <input defaultValue="$ Enter Amount" {...register('amount')} />
        <div className="buttonContainer">
          <button
            className="longButton"
            onClick={() => setTypeOfPosition('long')}
          >
            Long
          </button>
          <button
            className="shortButton"
            onClick={() => setTypeOfPosition('short')}
          >
            Short
          </button>
        </div>
        <div className="buttonContainer">
          <button className="leverageButton" onClick={() => setLeverage(1)}>
            1x
          </button>
          <button className="leverageButton" onClick={() => setLeverage(2)}>
            2x
          </button>
          <button className="leverageButton" onClick={() => setLeverage(5)}>
            5x
          </button>
          <button className="leverageButton" onClick={() => setLeverage(10)}>
            10x
          </button>
        </div>
        <button onClick={handleSubmit(onSubmit)} className="submitButton">
          Submit
        </button>
      </div>
      <div>{JSON.stringify(prices)}</div>
    </>
  );
}
