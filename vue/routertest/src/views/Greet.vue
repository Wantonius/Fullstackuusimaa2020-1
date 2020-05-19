<template>
	<div>
		<h1>Hello, {{$route.params.personname}}</h1>
		<button @click="goBack()">Go back!</button>
	</div>
</template>

<script>
export default {
	name:"Greet",
	methods: {
		goBack:function() {
			this.$router.go(-1);
		}
	}
}
</script>