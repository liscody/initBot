const dotenv = require("dotenv");
dotenv.config();

const { Contract, ethers } = require("ethers");
const { abi } = require("./abi.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ADDRESS = process.env.ADDRESS;

const polygonURL = "https://gateway.tenderly.co/public/polygon";

const provider = ethers.getDefaultProvider(polygonURL, {
  name: "polygon-mainnet",
  chainId: 137,
});

const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(ADDRESS, abi, signer);

async function main() {
  const counter = await contract.roomIdCounter();
  console.log("Current room ID on contract", counter.toString());
  console.log("");
}

main();
