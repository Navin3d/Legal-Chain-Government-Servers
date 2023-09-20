// const Web3             = require("web3");
// const { WEB3PROVIDER } = require("../index");
import Web3 from "web3";
import { WEB3PROVIDER } from "../index.js";

export const web3             = new Web3(WEB3PROVIDER);

export const getAccounts      = async () => await web3.eth.getAccounts();
