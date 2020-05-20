import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	list:[]
  },
  mutations: {
		changeList:function(state,list) {
			state.list = list
		}
  },
  actions: {
		getList:function(context) {
			axios.get("/api/shopping").then(res => {
				context.commit("changeList",res.data);
			}).catch(err => {
				console.log("Get list failed. Error:"+err);
			})
		},
		addToList:function(context,item) {
			axios.post("/api/shopping",item).then(res => {
				if(res.status===200) {
					context.dispatch("getList");
				} else {
					console.log("Server responded with status:",res.status);
				}
			}).catch(err => {
				console.log("Add to list failed. Error:"+err);
			});
		},
		removeFromList:function(context,id) {
			axios.delete("/api/shopping/"+id).then(res => {
				if(res.status===200) {
					context.dispatch("getList");
				} else {
					console.log("Server responded with status:",res.status);
				}				
			}).catch(err => {
				console.log("remove from list failed. Error:"+err);
			})
		},
		editItem:function(context,item) {
			axios.put("/api/shopping/"+item.id,item).then(res => {
				if(res.status===200) {
					context.dispatch("getList");
				} else {
					console.log("Server responded with status:",res.status);
				}				
			}).catch(err => {
				console.log("edit item failed. Error:"+err);
			})	
		}
  }
})
