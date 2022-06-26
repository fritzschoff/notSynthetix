//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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
contract FuturesNFTPosition is Initializable, ERC721, Ownable {
    /// State Variables ///

    /**
    * @dev The futures market we're operating in e.g. sBTC/sUSD.
    */
    IFuturesMarket public market;

    /**
    * @dev The initial amount of margin used for this position when opened.
    */
    uint public margin;

    /**
    * @dev The size used when this position opened.
    */
    uint public size;

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
    * so it coincides well with `initialize`. Upon `initializing`, the NFT is minted and transferred.
    */
    function initialize(
        IFuturesMarket _market,
        address _manager,
        uint _margin,
        uint _size
    ) public initializer {
        market = _market;
        margin = _margin;
        size = _size;

        // FuturesPositionsManager is the only SC to interact with FuturesNFTPosition after creation.
        // transferOwnership(_manager);
    }

    function openAndTransfer(address _trader) public {
        /// We're `int` casting here because contracts in Synthetix Futures account for negatives rather than splitting
        /// the operation into 2 functions (positive is deposit, negative is withdraw).
        ///
        /// This is also true for `depositMargin`.
        market.modifyPosition(int(size));
        isPositionOpen = true;

        _mint(_trader, 0);
    }

    function closeAndBurn() public {
        market.closePosition();
        isPositionOpen = false;

        _burn(0);
    }

    function depositMargin(uint _amount) public {
        market.transferMargin(int(_amount));
    }
}
