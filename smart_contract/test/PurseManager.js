const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("PurseManager", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const PurseManager = await ethers.getContractFactory("PurseManager");
    const purseManager = await PurseManager.deploy();

    return { purseManager, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the transfer native currency", async function () {
      const { purseManager, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);

      // await otherAccount.s
    });

    it("Should set the right owner", async function () {
      const { purseManager, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await purseManager.owner()).to.equal(owner.address);
    });

  });

  describe("Withdrawals", function () {
    describe("Validations", function () {

      it("Should revert with the right error if called from another account", async function () {
        const { purseManager, owner, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );

        // We use lock.connect() to send a transaction from another account
        await expect(purseManager.withdraw()).not.to.be.reverted;
      });

    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { purseManager, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(purseManager.withdraw())
          .to.emit(purseManager, "Withdrawal")
          .withArgs(anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { purseManager, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(purseManager.withdraw()).to.changeEtherBalances(
          [owner, purseManager],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
