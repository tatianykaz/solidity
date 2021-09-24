const { expect } = require("chai");

const Coin = artifacts.require("Coin");

contract("Coin", accounts => {

let owner = accounts[0];
let coin;
let amount = 1000;
let transferAmount = 500;

beforeEach(async function () {
    coin = await Coin.new({ from: owner });
});

it("Check if the minter is the owner", async () => {
    let minter = await coin.minter();
    assert.equal(
    minter,
    owner,
    "Owner Account is not the minter"
    );
});

it("Receiver's balance must be at least the minting amount", async () => {
    await coin.mint(accounts[1], amount, { from: owner });
    let balanceReceiver = await coin.balances(accounts[1]);
    //expect(Number(balanceReceiver)).to.be.at.least(amount);
    assert.isAtLeast(
    Number(balanceReceiver),
    amount,
    "Receiver's balance must be at least the minting amount"
    );
});

it("Minter's balance must be at least the amount it is sending", async () => {
    let balanceSender = await coin.balances(owner);
    assert.isAtLeast(
    Number(balanceSender),
    amount,
    "Insufficient balance."
    );
});

it("Receiver's balance must be at least the amount sent", async () => {
    await coin.send(accounts[1], amount, { from: owner });
    let balanceReceiver = await coin.balances(accounts[1]);
    //expect(Number(balanceReceiver)).to.be.at.least(amount);
    assert.isAtLeast(
    Number(balanceReceiver),
    amount,
    "Receiver's balance must be at least the minting amount"
    );
});

it("Expected to throw if mint is called not from the minter account", async () => {
    try {
        await coin.mint(accounts[2], amount, { from: accounts[1] });
    } catch (error) {
        assert.throws(() => { throw new Error(error) }, Error, "Unauthorized Access");
    }
});

it("Mint amount value to account[1]", async () => {
    await coin.mint(account[1], amount, {from: owner});
    let balanceReceiver = await coin.balances[account[1]];
    assert.isAtLeast(
        Number(balanceReceiver),
        amount,
        "Receiver's balance must be at least the minting amount"
        );
});

/*it("should transfer 500 Coins from second account to third account", async () => {
    await coin.mint(accounts[1], amount, { from: owner });
    await coin.send(accounts[2], transferAmount, { from: accounts[1] });
    let secondAccBalance = await coin.balances(accounts[1]);
    let thirdAccBalance = await coin.balances(accounts[2]);
    assert.equal(
        secondAccBalance.valueOf(), amount - transferAmount,
        "Second Account’s Coin balance is not equal to transfer amount"
    );
    assert.equal(
        thirdAccBalance.valueOf(),
        transferAmount,
        "Third Account’s Coin balance is not equal to transfer amount"
        );
    });*/
});
