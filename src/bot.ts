const dotenv = require("dotenv");
dotenv.config();

const { Contract, ethers } = require("ethers");
const { abi } = require("./abi.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ADDRESS = process.env.ADDRESS;

const polygonURL = "https://gateway.tenderly.co/public/polygon";

const txHash =
  "0x2468ea36e289e94a7b3a9b4d361d03792a1a85713ec0a3a66781876a6163df8f";

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

  const activeRooms = await contract.activeRoomCounter();
  console.log("Active rooms", activeRooms.toString());
  
  // get first event from contract
  const filter = contract.filters.Initialized(null);
  const events = await contract.queryFilter(filter);
  const event = events[0];
  // console.log("Event", event);
  const block = await provider.getBlock(event.blockNumber);
  console.log("Block", block.number); 
}

main();
// Run the bot
// node src/bot.ts