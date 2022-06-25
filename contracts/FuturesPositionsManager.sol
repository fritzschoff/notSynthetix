//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// Project Imports ///

import "./FuturesNFTPositionFactory.sol";
import "./FuturesNFTPosition.sol";
import "./interfaces/IFuturesMarket.sol";

/**
 * @dev Contract allows users to deposit sUSD and use it as margin for future positions via `Futures*`.
 *
 * sUSD tokens can be minted by staking SNX or obtained by collateralising ETH to borrow sUSD. NOTE sUSD
 * as of writing this is the only margin token allowed by Synthetix.
 *
 * TODO: Should we make this contract upgradeable?
 */
contract FuturesPositionsManager is ReentrancyGuard, Ownable {
  /// Constants ///

  /**
   * @dev sUSD is the margin token we provide to Synthetix to trade with.
   *
   * 0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57
   * TODO: I want to use the AddressResolver Synthetix has. Good idea?
   */
  IERC20 public sUSDToken;

  /**
   * @dev Factory to mint 1/1 NFTs to represent an open position on Synthetix Futures.
   */
  FuturesNFTPositionFactory public positionFactory;

  /// Events ///

  /**
   * @dev Emitted with `amount` sUSD tokens are withdrawn from the margin vault by the `withdrawer`.
   */
  event Withdraw(address withdrawer, address receiver, uint256 amount);

  /**
   * @dev Emitted with `amount` when `depositer` deposits sUSD.
   */
  event Deposit(address depositer, uint256 amount);

  /**
   * @dev Emitted when a position is successfully opened or closed.
   */
  event Trade(address trader, uint256 margin, IFuturesMarket market, address position);

  /// State Variables ///

  mapping (address => uint) public depositsByWalletAddress;

  /// Constructor ///

  constructor (IERC20 _susd, FuturesNFTPositionFactory _positionFactory) {
    sUSDToken = _susd;
    positionFactory = _positionFactory;
  }

  /// Mutative Functions ///

  /**
   * @dev Deposit sUSD into the manager to be used as margin when opening positions.
   */
  function deposit(uint _amount) external {
    require(_amount > 0, "Deposit amount is too small.");
    require(sUSDToken.allowance(msg.sender, address(this)) >= _amount, "Approve sUSD token first!");

    depositsByWalletAddress[msg.sender] += _amount;
    bool isSuccess = sUSDToken.transferFrom(msg.sender, address(this), _amount);
    require(isSuccess, "Deposit failed, bad transfer.");

    emit Deposit(msg.sender, _amount);
  }

  /**
   * @dev Withdraw previously deposited sUSD from the manager. A `_receiver` is specified to signal
   * the address which will be receiving the sUSD upon a successful withdraw.
   */
  function withdraw(uint _amount, address _receiver) public nonReentrant {
    require(_amount > 0, "Withdraw amount is too small.");
    require(_receiver != address(0), "Receiver cannot be NULL.");
    require(depositsByWalletAddress[msg.sender] >= _amount, "Withdrawing more than available.");

    depositsByWalletAddress[msg.sender] -= _amount;
    bool isSuccess = sUSDToken.transfer(_receiver, _amount);
    require(isSuccess, "Withdraw failed, bad transfer.");

    emit Withdraw(msg.sender, _receiver, _amount);
  }

  /**
   * @dev Add `_amount` margin to an existing `_position`.
   *
   * If the margin available in the manager is < the `_amount` specified, this function all request
   * the delta from the caller's wallet. If the result amount is < `_amount` specified then this function
   * will fail and nothing will be committed.
   */
  function depositMargin(FuturesNFTPosition _position, uint _amount) public {
    require(_amount >= 0, "Deposit amount must be negative.");
    _position.depositMargin(int(_amount));
  }

  /**
   * @dev Performs a trade on `_market` using `_amount` margin previously provided in the `FuturesPositionsManager`.
   *
   * This withdraws margin from within the `FuturesPositionsManager` but will revert if `_amount > deposit`. The
   * address of the newly minted NFT position is returned upon successful trade.
   *
   * NOTE this function only supports opening positions and subsequently minting an NFT. It does not
   * yet support the ability to close a position.
   */
  function openPosition(uint _amount, IFuturesMarket _market) external nonReentrant returns (FuturesNFTPosition position) {
    // Is this necessary? Should be double up on `require` or can I rely on `withdraw`?
    require(_amount > 0, "Margin must be non-zero.");
    require(depositsByWalletAddress[msg.sender] >= _amount, "Withdrawing more than available.");

    position = FuturesNFTPosition(positionFactory.clone());
    withdraw(_amount, address(position));

    depositMargin(position, _amount);
    position.openPosition(int(_amount));
    position.initialize(_market);

    emit Trade(msg.sender, _amount, _market, address(position));
  }

  /**
   * @dev Given the `_position`, close if possible and withdraw all margin into the manager.
   *
   * TODO: Liquidated positions with remaining margin should ideally be deposited back into the manager
   * to be withdrawn or used in another position in the future but that is not currently implemented.
   */
  function closePosition(FuturesNFTPosition _position) external {

  }
}
