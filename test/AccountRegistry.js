const AccountRegistry = artifacts.require("AccountRegistry");
const assert = require("assert");

contract("AccountRegistry", (accounts) => {
  const Account = accounts[0];

  it("should allower a user to register", async () => {
    const instance = await AccountRegistry.deployed();

    await instance.registerAccount({
      from: Account,
    });

    const res = await instance.registeredAccounts(Account, {
      from: Account,
    });

    assert.equal(res, true, "the user should now registered");
  });
});
