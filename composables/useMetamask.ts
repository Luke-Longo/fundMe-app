import { ethers } from "ethers";

export default async function useMetamask() {
	let provider;
	let signer;
	let network;
	const connect = async () => {
		if (!!window.ethereum) {
			console.log("useMetamask: connect");
			try {
				provider = await new ethers.providers.Web3Provider(window.ethereum);

				await provider.send("eth_requestAccounts", []);

				signer = provider.getSigner();

				network = await provider.getNetwork();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("No MetaMask!");
		}
	};

	const fund = async (ethAmount) => {};

	return { provider, signer, network, connect, fund };
}
