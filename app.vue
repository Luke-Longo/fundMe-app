<template>
	<div class="dark:bg-black">
		<div class="m-20">
			<h3 class="text-2xl text-center">Fund Me Contract</h3>
		</div>
		<div class="flex flex-col gap-4 m-20">
			<div class="flex justify-around">
				<p class="text-xl p-2">Status: {{ status }}</p>
				<p class="text-xl p-2">Balance: {{ balance }}</p>
			</div>
			<div class="flex justify-around">
				<button @click="connect">Connect</button>
				<button @click="getBalance">Get Contract Balance</button>
				<button @click="withdraw">Withdraw</button>
			</div>
			<div class="flex justify-around">
				<div class="flex gap-2 items-center">
					<label for="">Fund</label>
					<input
						type="text"
						placeholder="0.1 ETH"
						class="border-white border border-solid rounded text-sm pl-2 h-7"
						v-model="fundAmount"
					/>
				</div>
				<button @click="fund">Fund</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";

const connect = async () => {
	const provider = await new ethers.providers.Web3Provider(window.ethereum);

	await provider.send("eth_requestAccounts", []);
};

const status = ref("");
const balance = ref("");
const fundAmount = ref("");

const getBalance = async () => {};
const withdraw = async () => {};
const fund = async () => {};
</script>

<style>
* {
	@apply dark:bg-black dark:text-white text-xl;
}

button {
	@apply dark:hover:bg-gray-700 transition-all px-2 rounded-md py-1;
}
</style>
