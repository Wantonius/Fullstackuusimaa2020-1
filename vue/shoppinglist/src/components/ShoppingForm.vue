<template>
	<div>
		<div class="form form-group">
			<label for="type">Item type:</label>
			<input type="text"
					name="type"
					v-model="item.type"/>
		</div>
		<div class="form form-group">
			<label for="count">Count:</label>
			<input type="number"
					name="count"
					v-model="item.count"/>
		</div>	
		<div class="form form-group">
			<label for="price">Price:</label>
			<input type="number"
					name="price"
					v-model="item.price"/>
		</div>
		<button class="btn btn-primary" @click="addToList()">Add</button>
	</div>
</template>

<script>
export default {
	name:"ShoppingForm",
	data() {
		return {
			item: {
				id:0,
				type:"",
				price:0,
				count:0			
			}
		}
	},
	methods: {
		addToList:function() {
			this.$emit("add-to-list",this.item);
			this.item = {
				id:0,
				type:"",
				price:0,
				count:0					
			}
		}
	}
}
</script>