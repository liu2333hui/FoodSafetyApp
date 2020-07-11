<template>
	<div>
		<div class="returnLabel" @click="goToMain">
			<label for="icon-main">回主页</label>
			<i class="iconfont icon-main"></i>
		</div>
	</div>
		
		
</template>

<script>
export default{
	methods:{
		goToMain(){
			this.$emit("goToMain", '回');
		}
	}
}
</script>

<style>
.returnLabel{
	position:fixed;
	z-index:200;
	top:5px;
	font-size:20px;
	color:yellow;
	left:5px;
	border: 1px solid black;
	border-radius:6px;
	background:blue;
}
</style>