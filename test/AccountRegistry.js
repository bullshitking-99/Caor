const AccountRegistry = artifacts.require("AccountRegistry");
const assert = require("assert");

contract("AccountRegistry", (accounts) => {
  const Account = accounts[0]; // 0x3db56db2B74c92700C135c645BacC4193f4eE151
  const PrivateKey =
    "0x1ab8b053cc9414129375d230b4fe8be4545a3e6f135c0b4f55e3dfad74c92f39";

  it("should allower a user to register", async () => {
    const instance = await AccountRegistry.deployed();

    // 签名消息
    const messageHash = web3.utils.soliditySha3(
      instance.address,
      "registerAccount"
    );
    // console.log(messageHash); // different while create everytime

    // 开始签名
    const { signature: _sig } = web3.eth.accounts.sign(messageHash, PrivateKey);
    // console.log(_sig);

    await instance.registerAccount(_sig, {
      from: Account,
    });

    const res = await instance.registeredAccounts(Account, {
      from: Account,
    });

    assert.equal(res, true, "the user should now registered");
  });
});
