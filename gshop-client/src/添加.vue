<template>
	
	<div id="">
	
		<Return @goToMain="goToMain"></Return>
	
	  	<!--<header>
    		<img src="../assets/nanhuan.png">
  		</header>-->
		<!--<header class="textHeader">
    		<p>添加！</p>
    		<Navi id="myNav" current=2></Navi>
  		</header>-->
  		
  		<header>
		    <img src="../assets/nanhuan.png">
		    <Navi id="myNav" current=2></Navi>
		  </header>
		  
		  
  		
  		<section id="mySection">


		
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
		
    
		<I-Upload :before-upload="handleUpload" 
			action="" 
			:format="['jpg','jpeg','png']"
			ref = "upload"
			>
        	<I-Button icon="ios-cloud-upload-outline">上传图片</I-Button>
    		<!--<img src="" alt="" />-->
    		
		</I-Upload>
		<span>{{file.name}}</span>
		
  		</section>
  		
		<br />
<!--		
		<I-Upload action="//jsonplaceholder.typicode.com/posts/">
        	<I-Button icon="ios-cloud-upload-outline">Upload files</I-Button>
    	</I-Upload>-->
    
		
		<I-Button  class="submitbtn" type="success" long 
			@click="doImageCompress">提交</I-Button>
	
		
		<div id="footer">
			<Footer></Footer>
		</div>
	
	</div>
</template>

<script>
import axios from 'axios'
import Footer from "./help/Footer.vue"
import Navi from './help/Navi.vue'

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

import {toast} from "mint-ui"

import Return from "./回"
export default{
	components:{
		Footer,
		Return,
		Navi
	},
	data(){
		return{
			serverImgBase: //'http://192.168.223.101:3000',
			'http://192.168.12.102:3000',// (floor 1)
			//'http://192.168.13.100:3000',// (floor 3)
			//'http://localhost:3000',
			
			name:'',
			number:1,
			loc: '小货郎',
			locList: ['小货郎', '杰妮wang','家乐福','京客隆','永辉','其他'],
			date:new Date().Format("yyyy-MM-dd"),
			overdate:new Date().Format("yyyy-MM-dd"),
			homeLoc: '吧台冰箱',
			homeLocList: ['吧台冰箱', '蔬菜冰箱','厨房冰箱','吧台','饭桌','蔬菜柜','其他'],
			file: '',
			//imageUrl:''
			
			
			submitLock: 0
		}
	},
	methods:{
		goToMain(data){
			this.$router.push('/main');
		},
		handleUpload (file) {
                this.file = file;
//              console.log(file)
                return false;
        },
        fakeSubmit(){
        	console.log("here")
        	while(true){
        		
        	}
        },
        doImageCompress(){
        	if(this.submitLock == 0){
        		this.submitLock = 1;
        	}else{
        		//No lock, no submit
        		return
        	}
        	
        	//No empty image file
        	if(this.file === ''){
        		toast("请上传图片！")
        		
        		this.submitLock = 0;
        		return
        	}
        	
        	//No empty image file
        	if(this.name === ''){
        		toast("请输入名字！")
        		
        		this.submitLock = 0;
        		return
        	}
        	
        	
        	
        	
        	var img = new Image();
        	var reader = new FileReader();
        	reader.readAsDataURL(this.file);
        	reader.onload = function (ev) {    //监听reader读取完成事件
       			img.src=this.result;           //当读取完成时，reader.result就是要的base64，将它赋值给src
   			}
        	
        	var _this = this;
        	
        	img.onload = function(){
//      		console.log(img)
	        	var canvas = document.createElement('canvas');
	      		var context = canvas.getContext('2d');        //为canvas设置上下文
	       		var targW = 200 , targH = 200;
	       		canvas.width = targW;
	       		canvas.height = targH;
	        	context.clearRect(0,0,targW,targH);           //清除画布
	       		context.drawImage(img,0,0,targW,targH);       //将原图按照比例绘制到新的画布上去
	        	canvas.toBlob(  function(blob){
	        		_this.submit(blob);
	        	})
	        	
        	}
        	
        	
        },
         submit(blob){
        	
        	
        	//console.log("here")
//      	if(this.file === ''){
//      		
//      		toast("请上传图片！")
//      		return
//      	}
        	
        	var imageUploadUrl = this.serverImgBase + "/file/upload"
//      	console.log(this.file)
        	
        	let formdata = new FormData()
        	formdata.append('hehe', blob, this.file.name)//this.file)
        	
        	
        	//the second axios parameters
        	var addUrl = this.serverImgBase + "/food/add";
			var params = {
				'name' : this.name,
				'number': this.number,
				'loc': this.loc,
				'date': this.date,
				'overdate': this.overdate,
				'homeLoc':this.homeLoc,
				imageUrl: ''
			};
        	
        	var router = this.$router
        	var _this = this;
        	
        	 axios({
              method: 'post',
              url: imageUploadUrl,
              data:formdata,
			 	headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(  function (res) {
              console.log(res)
              var imageUrl = "temp"
              params.imageUrl = res.data.url
              console.log(params)
              
              //Perform second axios to submit!
               axios({
              	method: 'post',
              	url: addUrl,
              	data: params
              })
              .then((res)=>{
              	_this.submitLock = 0;
              		console.log(res)
              		toast("成功！")
              		router.push("/main")
              })
              .catch((err) =>{
	              	_this.submitLock = 0;
	            	console.log(err)
            	})
              
            })
            .catch((err) =>{
            	_this.submitLock = 0;
            	console.log(err)
            })
        	
        	
//							var imageUrl = `${serverImgBase}${data.url}`;
//							$('img').attr('src', temp)
							
							
        	
        	
        	

//			
//			axios.post(
//				
//			).then((res) => {
//				console.log(res)
//			}).catch(function (error){
//				console.log(error);
//			}
        	
        }
	}
}
</script>

<style>
.submitbtn{
	height:50px;
	width:80%;
}
header img{
	height:100px;
}
#mySection{
	position:relative;
	margin-top:200px;
}

</style>