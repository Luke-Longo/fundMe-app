<template>
	<div class="dark:bg-black">
		<div class="m-20">
			<h3 class="text-2xl text-center">Fund Me Contract</h3>
		</div>
		<div class="flex flex-col gap-4 m-20">
			<div class="">
				<p class="text-xl p-2">Account Address:</p>
				<p class="text-xl p-2">{{ address }}</p>
			</div>
			<div class="flex justify-around">
				<p class="text-xl p-2">Contract Balance: {{ contractBalance }}</p>
				<p class="text-xl p-2">User Balance: {{ balance }}</p>
			</div>
			<div class="flex justify-around">
				<button @click="connect">Connect</button>
				<button @click="handleBalance">Get Contract Balance</button>
				<button @click="handleWithdraw">Withdraw</button>
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
				<button @click="handleFund">Fund</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const {
	connect,
	address,
	networkName,
	fund,
	balance,
	withdraw,
	getBalance,
	contractBalance,
} = await useCrypto();

// const account = await ref(signer.getAddress());

const fundAmount = ref("");

const handleFund = async () => {
	await fund(fundAmount.value);
	fundAmount.value = "";
};

const handleBalance = async () => {
	await getBalance();
};

const handleWithdraw = async () => {
	await withdraw();
};
</script>

<style>
* {
	@apply dark:bg-black dark:text-white text-xl;
}

button {
	@apply dark:hover:bg-gray-700 transition-all px-2 rounded-md py-1;
}
</style>
