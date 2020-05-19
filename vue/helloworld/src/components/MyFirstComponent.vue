<template>
	<div>
		<p>Hello, {{firstname}}</p>
		<p>{{computedHello}}</p>
		<p>{{methodHello()}}</p>
	</div>
</template>

<script>
export default {
	name:"MyFirstComponent",
	props:['firstname'],
	computed: {
		computedHello: function() {
			return "Hello from computed value, "+this.firstname
		}
	},
	methods: {
		methodHello: function() {
			return "Hello from method value, "+this.firstname
		}
	}
}
</script>