import Joi from 'joi';

export enum PositionSide {
  LONG = 'LONG',
  SHORT = 'SHORT',
}

export enum PositionSize {
  BIG = 'BIG',
  SMALL = 'SMALL',
}

export enum Market {
  BTC = 'FuturesMarketBTC',
  ETH = 'FuturesMarketETH',
  LINK = 'FuturesMarketLINK',
}

export const GenerateSvgSchema = Joi.object({
  market: Joi.string().valid(Market.BTC, Market.ETH, Market.LINK).required(),
  size: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  side: Joi.string().valid(PositionSide.LONG, PositionSide.SHORT).required(),
  wallet: Joi.string().required(),
});

export type GenerateSvgArgs = {
  market: Market;
  size: number;
  price: number;
  side: PositionSide;
  wallet: string;
};
