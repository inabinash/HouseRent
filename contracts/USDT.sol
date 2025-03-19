// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20 {
    address public wallet1 = 0x776fba2AF8A5dC05fF5009442CA95f3247c19e12;
    address public wallet2 = 0xDEAc4B4b12735b5c853012Eef51AbDe3233238b4;

    constructor() ERC20("USDT", "USDT") {
        uint256 totalAmount = 1000 * (10 ** uint256(decimals())); // 1000 tokens
        uint256 distributedAmount = 100 * (10 ** uint256(decimals())); // 100 tokens

         _mint(address(this), totalAmount); // Mint tokens to contract
        _transfer(address(this), wallet1, distributedAmount); // Send 500 tokens to wallet1
        _transfer(address(this), wallet2, distributedAmount); // Send 500 tokens to wallet2
    }
}
