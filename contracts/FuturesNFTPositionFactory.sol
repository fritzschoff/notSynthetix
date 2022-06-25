//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Libraries ///

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// Local Imports ///

import "./FuturesNFTPosition.sol";

/**
 * @dev Allows the creation of a more 1/1 FuturePosition NFTs to be transferred to `msg.sender`.
 *
 * Keep in mind this factory follows a minimal proxy contract pattern where newly 'cloned' NFTs
 * simply point to a common implementation contract.
 *
 * _See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol_
 */
contract FuturesNFTPositionFactory is Ownable {

  using Clones for address;

  /// State Variables ///

  /**
   * @dev The smart contract address where all FutureNFTPositions will point to.
   */
  address public implementation;

  /**
   * @dev An array of all mintedPosition addresses.
   */
  mapping (address => address[]) public allMintedPositions;

  /// Events ///

  /**
   * @dev Emitted when a minimal proxy is created, pointing to the `implementation` address.
   */
  event Clone(address minter, address position);

  /**
   * @dev Emitted when the implementation is updated by the owner.
   *
   * NOTE: Probably not needed right now but keeping this here.
   */
  event ImplementationChange(address oldImplementation, address newImplementation, address updater);

  /// Constructor ///

  constructor (address _implementation) {
    implementation = _implementation;
  }

  /// Mutative Functions ///

  /**
   * @dev Creates an exact copy of the `implementation` contract, following the minimal proxy pattern.
   *
   * IMPORTANT: `initialize` is not called here. It's expected the calling function will call `initialize` within
   * the same transaction as `clone`.
   */
  function clone() external onlyOwner returns (address position) {
    position = implementation.clone();
    allMintedPositions[msg.sender].push(position);
    emit Clone(msg.sender, position);
  }
}
