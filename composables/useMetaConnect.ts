import { ethers } from "ethers";

export default async function useMetaConnect() {
	const provider = await new ethers.providers.Web3Provider(window.ethereum);

	await provider.send("eth_requestAccounts", []);

	const signer = provider.getSigner();

	return {
		provider,
		signer,
	};
}
