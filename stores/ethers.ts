import { defineStore } from "pinia";
import { ethers } from "ethers";
import { Network } from "@ethersproject/networks";
export const useEthersStore = defineStore("ethers", {
	state: () => ({
		provider: null as ethers.providers.Web3Provider | null,
		signer: null as ethers.Signer | null,
		network: null as Network,
		fundMeContract: null,
		fundMeContractAddress: "",
	}),
	actions: {
		async connect() {
			// you would wnat to check if metamask exists or what web 3 provider you are using
			const provider = await new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const network = await provider.getNetwork();
			this.provider = provider;
			this.signer = signer;
			this.network = network;
		},
		async getFundMeContract() {
			const fundMeContract = new ethers.Contract();
			this.fundMeContract = fundMeContract;
		},
	},
});
