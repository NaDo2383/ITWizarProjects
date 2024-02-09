import { ethers } from "ethers";

function formatWei(bn) {
  return ethers.utils.formatUnits(bn, "wei");
}

export class BalanceRow {
  constructor(address, beforeElem, afterElem, diffElem) {
    this.address = address;
    this.beforeElem = beforeElem;
    this.afterElem = afterElem;
    this.diffElem = diffElem;
  }

  async updateBefore(provider) {
    this.before = await provider.getBalance(this.address);
    // this.beforeElem.value = this.before.toString();
  }

  async updateAfter(provider) {
    this.after = await provider.getBalance(this.address);
    // this.afterElem.value = this.after.toString();
    this.diff = this.after.sub(this.before);
    // this.diffElem.value = this.diff.toString();
  }
}
