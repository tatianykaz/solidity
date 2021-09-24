// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Coin {
    address public minter;
    mapping (address => uint) public balances;

    event Sent(address from, address to, uint amount);

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public {
        console.log("Mint Function ---- Minter is %s ", minter);
        console.log("Mint Function ---- Message sender is %s ", msg.sender);
        console.log("Mint Function ---- Minting %s coins to %s ", amount, receiver);
        console.log("Send Function ---- Receiver's balance before is %s", balances[receiver] );

        require(msg.sender == minter);
        balances[receiver] += amount;

        console.log("Send Function ---- Receiver's balance after is %s", balances[receiver] );
    }

    error InsufficientBalance(uint requested, uint available);

    function send(address receiver, uint amount) public {

        console.log("Send Function ---- Minter is %s ", minter);
        console.log("Send Function ---- Message sender is %s ", msg.sender);
        console.log("Send Function ---- Sending %s coins from %s to %s ", amount, msg.sender, receiver);

        console.log("Send Function ---- Sender's balance before is %s", balances[msg.sender] );
        console.log("Send Function ---- Receiver's balance before is %s", balances[receiver] );

        if (amount > balances[msg.sender])
            revert InsufficientBalance({
                requested: amount,
                available: balances[msg.sender]
            });

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);

        console.log("Send Function ---- Sender's balance after is %s", balances[msg.sender] );
        console.log("Send Function ---- Receiver's balance after is %s", balances[receiver] );
    }
}