<template>
	<div>
		<label for="message">Enter Message:</label>
		<input type="text" name="message" v-model="message"/>
		<button v-on:click="sendMessage()">Send</button>
	</div>
</template>

<script>
export default {
	name:"CustomEventEmitter",
	data() {
		return {
			message:""
		}
	},
	methods: {
		sendMessage:function(){
			this.$emit("my-custom-event",this.message);
		}
	}
}
</script>