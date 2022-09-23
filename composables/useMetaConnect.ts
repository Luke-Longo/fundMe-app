import { ethers } from "ethers";

export default async function useMetaConnect() {
	if (!!window.ethereum) {
		const provider = await new ethers.providers.Web3Provider(window.ethereum);

		await provider.send("eth_requestAccounts", []);

		const signer = provider.getSigner();

		const network = await provider.getNetwork();
		return {
			provider,
			signer,
			network,
		};
	} else {
		console.log("No MetaMask!");
	}
}
