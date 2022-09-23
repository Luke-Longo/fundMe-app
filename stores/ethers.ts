// Proxy wrapping the values is causing issues

// import { defineStore } from "pinia";
// import { ethers } from "ethers";
// import { Network } from "@ethersproject/networks";
// export const useEthersStore = defineStore("ethers", {
// 	state: () => ({
// 		provider: null as ethers.providers.Web3Provider | null,
// 		signer: null as ethers.Signer | null,
// 		network: null as Network,
// 		fundMeContract: null,
// 		fundMeContractAddress: "",
// 	}),
// 	actions: {
// 		async connect() {
// 			// you would wnat to check if metamask exists or what web 3 provider you are using
// 			const metaProvider = await new ethers.providers.Web3Provider(
// 				window.ethereum
// 			);
// 			await metaProvider.send("eth_requestAccounts", []);
// 			this.provider = metaProvider;
// 			const metaSigner = metaProvider.getSigner();
// 			const metaNetwork = await metaProvider.getNetwork();
// 			this.signer = metaSigner;
// 			this.network = metaNetwork;
// 		},
// 		async getFundMeContract() {
// 			const fundMeContract = new ethers.Contract();
// 			this.fundMeContract = fundMeContract;
// 		},
// 		async getBalance() {
// 			const balance = await this.provider?.getBalance();
// 			return balance;
// 		},
// 		async getAddress() {
// 			const address = await this.signer?.getAddress();
// 			return address;
// 		},
// 	},
// });
