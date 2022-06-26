import { PositionOpened } from '../generated/schema';
import {
  PositionClose,
  PositionOpen,
} from '../generated/PozitionsNFT/PozitionsNFT';
import { BigInt } from '@graphprotocol/graph-ts';

export function handlePozitionMinted(event: PositionOpen): void {
  const positionEvent = new PositionOpened(
    event.params.trader.toHex().concat(event.address.toHex())
  );
  positionEvent.size = event.params.size;
  positionEvent.trader = event.params.trader;
  positionEvent.margin = event.params.margin;
  positionEvent.market = event.params.market;
  positionEvent.position = event.params.position;
  positionEvent.save();
}

export function handlePozitionWithdrawal(event: PositionClose): void {
  const position = PositionOpened.load(
    event.params.trader.toHex().concat(event.address.toHex())
  );
  if (position) {
    position.margin = new BigInt(0);
    position.save();
  }
}
