import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/FundMe.sol/FundMe.json";
import { fundMeAddress } from "~~/constants";

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

	const fund = async (ethAmount) => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const FundMe = new ethers.Contract(fundMeAddress, contractABI.abi, signer);
		const transaction = await FundMe.fund({
			value: ethers.utils.parseEther(ethAmount),
		});
		await transaction.wait(1);
		console.log("Funded!");
		console.log(transaction);
	};

	const withdraw = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const FundMe = new ethers.Contract(fundMeAddress, contractABI.abi, signer);
		const transaction = await FundMe.withdraw();
		await transaction.wait(1);
		console.log("Withdrawn!");
		console.log(transaction);
	};

	return { connect, fund, balance, networkName, address, withdraw };
}
