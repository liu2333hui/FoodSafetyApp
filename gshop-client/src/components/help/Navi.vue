<template>

<Menu theme="dark" class="" mode="horizontal" @active-name="current"
		    	@on-select="(key) => navi(key)">
		        <MenuItem name="1" >
		            <Icon type="ios-paper" />
		                      主页
		        </MenuItem>
		        <MenuItem name="2" >
		            <Icon type="ios-people" />
		           添加
		        </MenuItem>
		         <MenuItem name="3" >
		            <Icon type="ios-stats" />
		            	搜索
		        </MenuItem>
		       </Menu>


</template>

<script>
	export default {
		props:{
			current: String
		},
		methods:{
			navi(key){
			console.log("here", typeof key)
			
			if(key == 1){
				this.$router.push('/main')
				.catch((e)=>{
					console.log("error")
				})
			}else if(key == 2){
				this.$router.push('/add')
				.catch((e)=>{
					console.log("error")
				})
			}
			else if(key == 3){
				this.$router.push('/search')
				.catch((e)=>{
					console.log("error")
				})
			}
		}
			
		}
	}
</script>

<style>
	.ivu-menu-item{
	width:33%;
}
</style>