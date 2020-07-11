<template>
	
	<div id="">
	
		<Return @goToMain="goToMain"></Return>
		<!--<div class="returnLabel" @click="goToMain">
			<label for="icon-main">回主页</label>
			<i class="iconfont icon-main"></i>
		</div>-->
		
	
	  	<header class="textHeader">
    		修改！
  		</header>
	
	
		<mt-field label="菜名" placeholder="请输入用菜名" v-model="name"></mt-field>
		<mt-field label="数量" placeholder="请输入数量" type="number" v-model="number"></mt-field>
		<!--<mt-field label="购买地点" placeholder="请输入用购买地点" v-model="loc"></mt-field>-->
		<hr />
		<br />
		
		<label for="selectLoc" style="font-size:17px">购买地点？</label>
		<Select v-model="loc" class="selectLoc" style="width:200px">
        	<Option v-for="item in locList" :value="item" :key="item">
        		{{ item }}
        	</Option>
    	</Select>
    	
		<br />
		<br />
		<label for="selectBar" style="font-size:17px">在家哪里？</label>
		<Select v-model="homeLoc" class="selectBar" style="width:200px">
        	<Option v-for="item in homeLocList" :value="item" :key="item">
        		{{ item }}
        	</Option>
    	</Select>
		
		<br /><br />
		
		
		<mt-field label="购买日" placeholder="请输购买日" type="date" v-model="date"></mt-field>
		<mt-field label="过期日" placeholder="请输入过期日" type="date" v-model="overdate"></mt-field>
		<!--<mt-field label="在家哪里？" placeholder="在家哪里" v-model="homeLoc"></mt-field>	
		-->
		
    

<!--		
		<I-Upload action="//jsonplaceholder.typicode.com/posts/">
        	<I-Button icon="ios-cloud-upload-outline">Upload files</I-Button>
    	</I-Upload>-->
    
		
		<I-Button class="submitbtn" type="success" long @click="submit">修改</I-Button>
	
		
		<div id="footer">
			<Footer></Footer>
		</div>
	
	</div>
</template>

<script>
import axios from 'axios'
import Footer from "./help/Footer.vue"

import {toast} from "mint-ui"

import Return from "./回"
export default{
	components:{
		Footer,
		Return
	},
	props:{
		id: String,
		name:String,
		number:String,
		loc: String,
		date:String,
		overdate:String,
		homeLoc: String,
		imageUrl: String
	},
	mounted(){
		console.log("update")
	},
	data(){
		return{
			serverImgBase: //'http://192.168.223.101:3000',
//			'http://192.168.12.102:3000',// (floor 2)
			//'http://192.168.13.100:3000',// (floor 3)
			
			'http://localhost:3000',
			
//			name:'',
//			number:1,
//			loc: '小货郎',
			locList: ['小货郎', '杰妮wang','家乐福','京客隆','永辉','其他'],
//			date:new Date().Format("yyyy-MM-dd"),
//			overdate:new Date().Format("yyyy-MM-dd"),
//			homeLoc: '吧台冰箱',
			homeLocList: ['吧台冰箱', '蔬菜冰箱','厨房冰箱','吧台','饭桌','饭桌','其他'],
			//file: ''
			//imageUrl:''
		}
	},
	methods:{
		goToMain(data){
			this.$emit("getData", '回');
		},
//		goToMain(){
//			this.$emit("getData", '回');
//		},
//		handleUpload (file) {
//              this.file = file;
////              console.log(file)
//              return false;
//     },
        submit(){
        	
        	//the second axios parameters
        	var updateUrl = this.serverImgBase + "/food/update";
			var params = {
				'name' : this.name,
				'number': this.number,
				'loc': this.loc,
				'date': this.date,
				'overdate': this.overdate,
				'homeLoc':this.homeLoc,
				'imageUrl': this.imageUrl,
				'_id':this.id
			};
        	
        	var router = this.$router
              var _this = this
              
            //Perform second axios to submit!
	        axios({
	          	method: 'post',
	          	url: updateUrl,
	          	data: params
	          })
	          .then((res)=>{
	          		console.log(res)
	          		_this.$emit("getData", '回');
	          })
	          .catch((err) =>{
	        	console.log(err)
	        	})
  

        }
	}
}
</script>

<style>
.submitbtn{
	height:50px;
	width:80%;
}
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