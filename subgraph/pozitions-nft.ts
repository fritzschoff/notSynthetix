import { PositionOpened } from '../generated/schema';
import {
  PositionClose,
  PositionOpen,
} from '../generated/PozitionsNFT/PozitionsNFT';
import { BigInt } from '@graphprotocol/graph-ts';

export function PozitionMinted(event: PositionOpen): void {
  const position = new PositionOpened(
    event.params.trader.toString().concat(event.address.toString())
  );
  position.size = event.params.size;
  position.trader = event.params.trader;
  position.margin = event.params.margin;
  position.market = event.params.market;
  position.save();
}

export function PozitionWithdrawal(event: PositionClose): void {
  const position = PositionOpened.load(
    event.params.trader.toString().concat(event.address.toString())
  );
  if (position) {
    position.margin = new BigInt(0);
    position.save();
  }
}
