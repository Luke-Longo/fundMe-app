import { ethers } from "ethers";
import useMetaConnect from "./useMetaConnect";

export default async function useFundMeContract() {
	const { provider } = await useMetaConnect();
	const fundMeContract = new ethers.Contract();
	return fundMeContract;
}
