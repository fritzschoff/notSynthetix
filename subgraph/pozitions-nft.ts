import { PositionOpen } from '../generated/PozitionsNFT/PozitionsNFT';

export function PozitionMinted(event: PositionOpen): void {
  const position = new PositionOpen(event.address);
}
