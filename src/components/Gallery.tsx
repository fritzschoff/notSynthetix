import axios from 'axios';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { graphQueryConfig } from '../constants/subgraph';
import { useConnectWallet } from '../context/useConnectWalletContext';
import './Gallery.css';
import abi from '../abis/FuturesNFTPosition.json';
import NFTPozition from './NFTPozition';

export default function Gallery() {
  const { provider } = useConnectWallet();
  const [uris, setUris] = useState(['']);
  useEffect(() => {
    axios(graphQueryConfig).then((res) => {
      res.data.data.positionOpeneds.map((obj: { position: string }) => {
        new Contract(obj.position, abi, provider[69]!)
          .tokenURI(1)
          .then((uri: string) => {
            axios({ method: 'GET', url: uri }).then((obj: any) => {
              setUris((state) => [...state, obj.data.image]);
            });
          });
      });
    });
  }, []);
  return (
    <div>
      Gallery
      {uris.length && uris.map((uri) => <NFTPozition link={uri} />)}
    </div>
  );
}
