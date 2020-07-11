<template>
	
	<header>
		    <img src="../assets/nanhuan.png">
		    <Navi id="myNav" current=1></Navi>
		  </header>
		  
		  
	
</template>

<script>
import axios from 'axios'
import Footer from "./help/Footer.vue"
import Navi from "./help/Navi.vue"

import { MessageBox } from 'mint-ui';



export default{
	components:{
		Footer,
		Navi
	},
}
</script>

<style>
</style>