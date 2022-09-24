import { ethers } from "ethers";

export default async function useCrypto() {
	const networkName = ref("");
	const balance = ref("");
	const address = ref("");
	const connect = async () => {
		if (!!window.ethereum) {
			console.log("useMetamask: connect");
			try {
				const provider = await new ethers.providers.Web3Provider(window.ethereum);

				await provider.send("eth_requestAccounts", []);

				const signer = provider.getSigner();

				const network = await provider.getNetwork();
				networkName.value = network.name;
				balance.value = await ethers.utils.formatEther(await signer.getBalance());
				address.value = await signer.getAddress();
				return {
					provider,
					signer,
					network,
				};
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("No MetaMask!");
		}
	};

	const fund = async (ethAmount) => {};

	return { connect, fund, balance, networkName, address };
}
