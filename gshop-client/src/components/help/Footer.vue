<template>
	<div>
		<mt-tabbar v-model="currentTab">
			<mt-tab-item id="/main">
				<span class="iconfont icon-main"></span>
				<br />
          		<span class="tabbar-name">主页</span>
			</mt-tab-item>
			<mt-tab-item id="/add">
				<span class="iconfont icon-add"></span>
				<br />
          		<span class="tabbar-name">添加</span>
			</mt-tab-item>
		</mt-tabbar>
	</div>
			
</template>

<script>
	
	
	
	export default{

		computed:{
			currentTab:{
				get(){
					return this.$route.path
				},
				set(val){
//					console.log(val)
					
					//fix uncaught auto-routing
//					if(val === this.$route.path){
//						return
//					}
					
					switch(val){
					case "/main":
						this.$router.push("/main")
						break
					case "/add":
						this.$router.push("/add")
						break
					}
				}
			}
		},
//		watch:{
//			currentTab: function(val, oldval){
////				console.log(this.$route.path, "/" + val)
////				console.log(oldval, val)
//				if(this.$route.path !== (val)){
//					
//					switch(val){
//					case "/main":
//						this.$router.push("/main")
//						break
//					case "/add":
//						this.$router.push("/add")
//						break
//					}
//				}
//				
//			}
//		}
	}
</script>

<style>
.mint-tabbar{
	height:45px;
	
}
.mint-tab-item{
	background:lightgoldenrodyellow;
	border-radius:10px;
}
.tabbar-name{
	font-size:13px;
}
span.iconfont{
	font-size:13px!important
}


.is-selected{
	background:orange!important
}
.is-selected .tabbar-name{
	color: green;
}
.is-selected .iconfont{
	color: green;
}





</style>