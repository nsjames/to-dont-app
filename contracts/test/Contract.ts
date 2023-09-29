import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { assert } from "chai";
import { ethers } from "hardhat";

describe("Contract", function () {
  async function deploy() {
    const Contract = await ethers.getContractFactory("Contract");
    return await Contract.deploy();
  }


  describe("Test", function () {
    it("Should be able to add a task", async function () {
      const contract = await loadFixture(deploy);
      const [owner, otherAccount] = await ethers.getSigners();

      const added = await contract.addTask("Test Task");
      assert(added, "Task was not added");

      assert(await contract.userTotalTasks(owner.address) == 1, "User total tasks is not 1");
    });

    it("Should be able to increment a task", async function () {
      const contract = await loadFixture(deploy);
      const [owner, otherAccount] = await ethers.getSigners();

      await contract.addTask("Test Task");
      await contract.incrementTask(0);

      const task = await contract.tasks(owner.address, 0);
      assert(task && task.count === 1, "Task count is not 1");

    });

    it("Should be able to remove a task", async function () {
      const contract = await loadFixture(deploy);
      const [owner, otherAccount] = await ethers.getSigners();

      await contract.addTask("Test Task");
      await contract.removeTask(0);

      const task = await contract.tasks(owner.address, 0);
      assert(task && task.text === "", "Task was not deleted");
    });

    it("Should be able to get all tasks", async function () {
      const contract = await loadFixture(deploy);
      const [owner, otherAccount] = await ethers.getSigners();

      await contract.addTask("Test Task1");
      await contract.addTask("Test Task2");
      await contract.addTask("Test Task3");
      await contract.removeTask(1);

      const tasks = await contract.getTasks(owner.address);
      assert(tasks.length === 2, "Tasks were not returned properly");
    });

  });
});
