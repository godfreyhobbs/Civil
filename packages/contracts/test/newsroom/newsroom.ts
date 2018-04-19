import * as chai from "chai";
import { configureChai } from "@joincivil/dev-utils";

import { events, NEWSROOM_ROLE_EDITOR, NEWSROOM_ROLE_REPORTER, REVERTED } from "../utils/constants";
import { findEvent, idFromEvent, is0x0Address, timestampFromTx } from "../utils/contractutils";

const Newsroom = artifacts.require("Newsroom");

configureChai(chai);
const expect = chai.expect;

const FIRST_NEWSROOM_NAME = "TEST NAME, PLEASE IGNORE";
const SOME_URI = "http://thiistest.uri";
const SOME_HASH = web3.sha3();

contract("Newsroom", (accounts: string[]) => {
  const defaultAccount = accounts[0];
  let newsroom: any;

  beforeEach(async () => {
    newsroom = await Newsroom.new(FIRST_NEWSROOM_NAME);
  });

  describe("author", () => {
    let id: any;

    beforeEach(async () => {
      await newsroom.addRole(accounts[1], NEWSROOM_ROLE_EDITOR);
      const tx = await newsroom.addContent(SOME_URI, SOME_HASH, { from: accounts[1] });
      id = idFromEvent(tx);
    });

    it("returns 0x0 on non-existent content", async () => {
      const is0x0 = is0x0Address(await newsroom.author(9999));
      expect(is0x0).to.be.true();
    });
    // TODO(ritave): add associating author flow
    xit("returns proper author", async () => {
      await expect(newsroom.author(id, { from: defaultAccount })).to.eventually.be.equal(accounts[1]);
    });
  });

  describe("uri", () => {
    let id: any;

    beforeEach(async () => {
      await newsroom.addRole(defaultAccount, NEWSROOM_ROLE_EDITOR);
      const tx = await newsroom.addContent(SOME_URI, SOME_HASH);
      id = idFromEvent(tx);
    });

    it("returns empty string on non-existen content", async () => {
      await expect(newsroom.uri(9999)).to.eventually.be.equal("");
    });

    it("returns proper uri", async () => {
      await expect(newsroom.uri(id)).to.eventually.be.equal(SOME_URI);
    });
  });

  describe("timestamp", () => {
    let id: any;
    let timestamp: any;

    beforeEach(async () => {
      await newsroom.addRole(defaultAccount, NEWSROOM_ROLE_EDITOR);
      const tx = await newsroom.addContent(SOME_URI, SOME_HASH);
      id = idFromEvent(tx);
      timestamp = await timestampFromTx(web3, tx.receipt);
    });

    it("returns proper timestamp", async () => {
      expect(timestamp).not.to.be.bignumber.equal(0);

      await expect(newsroom.timestamp(id)).to.eventually.be.bignumber.equal(timestamp);
    });

    it("returns zero on not existent content", async () => {
      await expect(newsroom.timestamp(9999)).to.eventually.be.bignumber.equal(0);
    });
  });

  describe("hash", () => {
    let id: any;

    beforeEach(async () => {
      await newsroom.addRole(defaultAccount, NEWSROOM_ROLE_EDITOR);
      const tx = await newsroom.addContent(SOME_URI, SOME_HASH);
      id = idFromEvent(tx);
    });

    it("returns empty string on non-existen content", async () => {
      await expect(newsroom.uri(9999)).to.eventually.be.equal("");
    });

    it("returns proper hash", async () => {
      const hash = await newsroom.hash(id);
      await expect(newsroom.hash(id)).to.eventually.be.equal(`${SOME_HASH}`);
    });
  });

  describe("addContent", () => {
    it("forbids empty uris", async () => {
      await newsroom.addRole(defaultAccount, NEWSROOM_ROLE_EDITOR);
      await expect(newsroom.addContent("", SOME_HASH)).to.be.rejectedWith(REVERTED);
    });

    it("finishes", async () => {
      await newsroom.addRole(defaultAccount, NEWSROOM_ROLE_EDITOR);
      await expect(newsroom.addContent(SOME_URI, SOME_HASH)).to.eventually.be.fulfilled();
    });

    it("creates an event", async () => {
      const tx = await newsroom.addContent(SOME_URI, SOME_HASH);
      const event = findEvent(tx, events.NEWSROOM_ADDED);
      expect(event).to.not.be.undefined();
      expect(event!.args.editor).to.be.equal(defaultAccount);
    });

    it("fails with reporter role", async () => {
      await newsroom.addRole(accounts[1], NEWSROOM_ROLE_REPORTER);
      const proposeContent = newsroom.addContent(SOME_URI, SOME_HASH, { from: accounts[1] });

      await expect(proposeContent).to.eventually.be.rejectedWith(REVERTED);
    });

    it("succeeds with editor role", async () => {
      await newsroom.addRole(accounts[1], NEWSROOM_ROLE_EDITOR);

      const tx = await newsroom.addContent(SOME_URI, SOME_HASH, { from: accounts[1] });
      const id = idFromEvent(tx);

      await expect(newsroom.uri(id)).to.eventually.be.equal(SOME_URI);
    });
  });

  describe("addRole", () => {
    beforeEach(async () => {
      await newsroom.addRole(accounts[1], NEWSROOM_ROLE_EDITOR);
    });

    it("works with superpowers", async () => {
      const addRole = newsroom.addRole(accounts[2], NEWSROOM_ROLE_EDITOR);

      await expect(addRole).to.eventually.be.fulfilled();
      expect(await newsroom.hasRole(accounts[2], NEWSROOM_ROLE_EDITOR)).to.be.true();
    });

    it("works with editor role", async () => {
      const addRole = newsroom.addRole(accounts[2], NEWSROOM_ROLE_EDITOR, { from: accounts[1] });

      await expect(addRole).to.eventually.be.fulfilled();
      expect(await newsroom.hasRole(accounts[2], NEWSROOM_ROLE_EDITOR)).to.be.true();
    });

    it("doesn't work without any role", async () => {
      const addRole = newsroom.addRole(accounts[2], NEWSROOM_ROLE_EDITOR, { from: accounts[2] });

      await expect(addRole).to.eventually.be.rejectedWith(REVERTED);
      expect(await newsroom.hasRole(accounts[2], NEWSROOM_ROLE_EDITOR)).to.be.false();
    });

    it("doesn't work with reporter role", async () => {
      await newsroom.addRole(accounts[2], NEWSROOM_ROLE_REPORTER);
      const addRole = newsroom.addRole(accounts[2], NEWSROOM_ROLE_EDITOR, { from: accounts[2] });

      await expect(addRole).to.eventually.be.rejectedWith(REVERTED);
      expect(await newsroom.hasRole(accounts[2], NEWSROOM_ROLE_REPORTER)).to.be.true();
      expect(await newsroom.hasRole(accounts[2], NEWSROOM_ROLE_EDITOR)).to.be.false();
    });
  });

  describe("removeRole", () => {
    beforeEach(async () => {
      await newsroom.addRole(accounts[1], NEWSROOM_ROLE_EDITOR);
    });

    it("works with superpowers", async () => {
      const removeRole = newsroom.removeRole(accounts[1], NEWSROOM_ROLE_EDITOR);

      await expect(removeRole).to.eventually.be.fulfilled();
      expect(await newsroom.hasRole(accounts[1], NEWSROOM_ROLE_EDITOR)).to.be.false();
    });

    it("works with editor role", async () => {
      const removeRole = newsroom.removeRole(accounts[1], NEWSROOM_ROLE_EDITOR, { from: accounts[1] });

      await expect(removeRole).to.eventually.be.fulfilled();
      expect(await newsroom.hasRole(accounts[1], NEWSROOM_ROLE_EDITOR)).to.be.false();
    });

    it("doesn't work without any role", async () => {
      const removeRole = newsroom.removeRole(accounts[1], NEWSROOM_ROLE_EDITOR, { from: accounts[2] });

      await expect(removeRole).to.eventually.be.rejectedWith(REVERTED);
      expect(await newsroom.hasRole(accounts[1], NEWSROOM_ROLE_EDITOR)).to.be.true();
    });

    it("doesn't work with reporter role", async () => {
      await newsroom.addRole(accounts[2], NEWSROOM_ROLE_REPORTER);
      const removeRole = newsroom.removeRole(accounts[1], NEWSROOM_ROLE_EDITOR, { from: accounts[2] });

      await expect(removeRole).to.eventually.be.rejectedWith(REVERTED);
      expect(await newsroom.hasRole(accounts[1], NEWSROOM_ROLE_EDITOR)).to.be.true();
    });
  });

  describe("setName", () => {
    it("sets the name in constructor", async () => {
      const name = await newsroom.name();
      expect(name).to.be.equal(FIRST_NEWSROOM_NAME);
    });

    it("can't set empty name", async () => {
      await expect(newsroom.setName("")).to.eventually.be.rejectedWith(REVERTED);
    });

    it("changes name", async () => {
      const NEW_NAME = "new name here";

      expect(await newsroom.name()).to.be.equal(FIRST_NEWSROOM_NAME);

      await newsroom.setName(NEW_NAME);

      expect(await newsroom.name()).to.be.equal(NEW_NAME);
    });

    it("can't be used by non-owner", async () => {
      await expect(newsroom.setName("something", { from: accounts[1] })).to.eventually.be.rejectedWith(REVERTED);
    });

    it("fires an event", async () => {
      const receipt = await newsroom.setName("something");

      const event = findEvent(receipt, "NameChanged");

      expect(event).to.not.be.null();
    });
  });
});
