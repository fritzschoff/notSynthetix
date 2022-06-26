import { markets } from './markets';
export interface GenerateNFTRequest {
  market: keyof typeof markets;
  size: number;
  price: number;
  side: 'long' | 'short';
  wallet: string;
}
