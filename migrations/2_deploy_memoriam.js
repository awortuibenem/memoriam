const Memoriam = artifacts.require("Memoriam");

module.exports = function(deployer) {
  deployer.deploy(Memoriam);
};
