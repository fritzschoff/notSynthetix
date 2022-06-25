//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

/// Local Imports ///

import "./interfaces/IAddressResolver.sol";
import "./interfaces/IFuturesMarket.sol";

/**
 * @dev Contract to represent a single position opened on Synthetix Futures.
 *
 * Positions are created via this contract. All ownership is hence transferrable, allowing users to freely
 * move positions between wallets without closing, possibly incurring a loss, withdrawing margin, and
 * re-creating a new position.
 */
contract FuturesNFTPosition is Initializable, ERC721 {
  /// State Variables ///

  /**
   * @dev The futures market we're operating in e.g. sBTC/sUSD.
   */
  IFuturesMarket private operatingMarket;

  /**
   * @dev Whether this position is open or closed.
   */
  bool public isPositionOpen;

  /// Constructor ///

  constructor() ERC721("Synthetix Futures Position", "SFP") { }

  /// Mutative Functions ///

  /**
   * @dev Initializes this 1/1 NFT, passing and storing the necessary metadata for storage.
   *
   * This effectively mints the NFT. It's important to note that this NFT can only be minted once
   * so it coincides well with `initialize`. Upon `initializing`,the NFT is minted and transferred.
   */
  function initialize(IFuturesMarket _operatingMarket) public initializer {
    operatingMarket = _operatingMarket;
  }

  function closePosition() public {
    operatingMarket.closePosition();
    isPositionOpen = false;
  }

  function openPosition(int _size) public {
    operatingMarket.modifyPosition(_size);
    isPositionOpen = true;
  }

  function depositMargin(int _delta) public {
    operatingMarket.transferMargin(_delta);
  }
}
