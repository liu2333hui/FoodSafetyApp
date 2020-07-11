<template>
  <div id="app">
  
  <!--<header>
    <img src="./assets/nanhuan.png">
    <br />
  </header>-->
  		
	<section>
    <router-view/>
	</section>
  
	<!--<div id="footer">
		<Footer></Footer>
	</div>-->
		
  </div>
</template>

<script>
	
import Footer from "./components/help/Footer.vue"


export default {
  name: 'App',
  components:{
		Footer
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header{
	position:fixed;
	width:100%;
	top:0px;
	z-index:20;
	background:darkorange;
}
#footer{
	position:fixed;
	width:100%;
	bottom:0px;
	left:0px;
	border:0px;
}
.textHeader{
	font-size:20px;
}
</style>
