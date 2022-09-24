import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/FundMe.sol/FundMe.json";
import { fundMeAddress } from "~~/constants";
import { resolve } from "path";

export default async function useCrypto() {
	const networkName = ref("");
	const balance = ref("");
	const address = ref("");
	const contractBalance = ref("");
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

	const getContract = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const FundMe = new ethers.Contract(fundMeAddress, contractABI.abi, signer);
		return FundMe;
	};

	const getBalance = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		contractBalance.value = ethers.utils.formatEther(
			await provider.getBalance(fundMeAddress)
		);
	};

	const listenForTransactionMined = async (txRes, provider) => {
		console.log(`Mininig... ${txRes.hash}`);
		return new Promise((resolve, reject) => {
			provider.once(txRes.hash, (txReceipt) => {
				console.log("Mined!");
				resolve(txReceipt);
			});
		});
	};

	const fund = async (ethAmount) => {
		try {
			const FundMe = await getContract();
			const tx = await FundMe.fund({
				value: ethers.utils.parseEther(ethAmount),
			});
			const txReceipt = await listenForTransactionMined(tx, FundMe.provider);
			console.log("tx Receipt", txReceipt);
			console.log("Funded!");
		} catch (error) {
			console.log(error);
		}
	};

	const withdraw = async () => {
		const FundMe = await getContract();
		try {
			const transaction = await FundMe.withdraw();
			const txReceipt = await listenForTransactionMined(
				transaction,
				FundMe.provider
			);
			console.log("Withdrawn!");
			console.log(txReceipt);
			contractBalance.value = "0";
		} catch (error) {
			console.log(error);
		}
	};

	return {
		connect,
		fund,
		balance,
		networkName,
		address,
		withdraw,
		getBalance,
		contractBalance,
	};
}
