import { useForm } from 'react-hook-form';
import { markets } from '../constants/markets';
import './CreatePosition.css';
import { useEffect, useState } from 'react';
import BackButton from './BackButton';
import useNewPosition from '../hooks/useNewPosition';
import { useConnectWallet } from '../context/useConnectWalletContext';

export default function CreatePosition() {
  const [prices, setPrices] = useState<null | {
    link: number;
    bitcoin: number;
    ethereum: number;
  }>();
  const { register, handleSubmit } = useForm();
  const { connector } = useConnectWallet();
  const { calcDelta, approve, hasAllowance } = useNewPosition();
  const [allowance, setAllowance] = useState(false);
  const [typeOfPosition, setTypeOfPosition] = useState<'long' | 'short'>(
    'long'
  );
  const [leverage, setLeverage] = useState<1 | 2 | 5 | 10>(1);
  const onSubmit = (data: any) => {
    calcDelta({ ...data, leverage, side: typeOfPosition });
  };

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

  useEffect(() => {
    if (connector) {
      hasAllowance().then((data) => setAllowance(data));
    }
  }, [hasAllowance, connector]);

  const handleApprove = () => {
    approve().then(() => hasAllowance().then((data) => setAllowance(data)));
  };

  return (
    <>
      <div className="createPositionHeadline">
        <BackButton />
        <h1>Create new Pozition</h1>
      </div>
      <div className="priceWrapper">
        <div className="price">
          <img src="/eth.png" width={32} height={32} />${prices?.ethereum}
        </div>
        <div className="price">
          <img src="/bitcoin.png" width={32} height={32} />${prices?.bitcoin}
        </div>
        <div className="price">
          <img src="/link.png" width={32} height={32} />${prices?.link}
        </div>
      </div>
      <div className="newPositionForm">
        <select {...register('market')}>
          <option value={markets.FuturesMarketETH}>ETH</option>
          <option value={markets.FuturesMarketBTC}>BTC</option>
          <option value={markets.FuturesMarketLINK}>LINK</option>
        </select>
        <input placeholder="$ Enter Amount" {...register('amount')} />
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

        {allowance ? (
          <button onClick={handleSubmit(onSubmit)} className="submitButton">
            Submit
          </button>
        ) : (
          <button onClick={handleApprove} className="submitButton">
            Approve
          </button>
        )}
      </div>
    </>
  );
}
