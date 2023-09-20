import { CONTRACTADDRESS } from '../index.js';
import { web3 } from './index.js';

const ABICODE             = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "sentBy",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					}
				],
				"internalType": "struct ConprehensiveContract.Data",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "hashes",
		"outputs": [
			{
				"internalType": "address",
				"name": "sentBy",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "putData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const comprehensiveContract =  new web3.eth.Contract(ABICODE, CONTRACTADDRESS);
export default comprehensiveContract;