import { defineStore } from "pinia";
import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/FundMe.sol/FundMe.json";
const contractAddress = "0x578d9152A785b216436A2a8A1EB178cB0e294183";

// this is a form of writing pinia as a composable function instead of an object with getters, state and actions
export const useCryptoStore = defineStore("crypto", () => {
	const connect = async () => {
		if (!!window.ethereum) {
			console.log("ethereum detected");
			try {
				// instantiate the provider
				const provider = await new ethers.providers.Web3Provider(window.ethereum);
				// request access to the user's MetaMask account if not already granted
				await provider.send("eth_requestAccounts", []);
				// get the signer
				const signer = provider.getSigner();
				// get the network
				const network = await provider.getNetwork();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("No MetaMask!");
		}
	};

	const instantiateContract = async () => {
		if (signer.value) {
			contract.value = new ethers.Contract(
				contractAddress,
				contractABI.abi,
				signer.value
			);
		}
	};

	const fund = async (ethAmount) => {
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return {
		provider,
		signer,
		network,
		contract,
		connect,
		fund,
	};
});
