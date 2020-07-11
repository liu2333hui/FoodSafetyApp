<template>
	
	<div id="">


	
  
	<div v-if="!updating">
		
		
		
		
		<div class="refreshBtn" @click="refreshList">
			刷新
		</div>
		
		<header>
		    <img src="../assets/nanhuan.png">
		    <Navi id="myNav" current=1></Navi>
		  </header>
		
		
		
		<section id="mySection">
			
		<!-- The Modal -->
		<div id="myModal" class="modal" :class="{modalActive:modalDisplay}">
		  <span class="close" @click="closeModal">×</span>
		  <img class="modal-content" id="img01" :src="modalImage" @click="closeModal">
		  <div id="caption">{{modalCaption}}</div>
		</div>
		
		<!--主页
		{{dataList}}-->

		<mt-loadmore :top-method="refreshListScroll" ref="loadmore">
			
		<Row >
	        <Col :xs="24" :sm="12" :md="8" :lg="8" v-for="(dataItem,key) in dataList" :key="key">
	            <Card>
	            	<p class="cardTitle" slot="title">{{dataItem.name}}</p>
	            	<Row>
	            		<Col span="6" offset="0">
	            			<!--<a :href="serverImgBase+dataItem.imageUrl">-->
	            			<!--<div class="enlarge">-->
            				<img class="cardImage" 
	            			:src='serverImgBase+dataItem.imageUrl'
                			alt=""
                			@click="changeModal(key)"
                			/>
	                			
	                			
	                		<!--</div>-->
	            			<!--</a>-->
	            			<a @click="updateItem(dataItem._id, dataItem)">	
	            				<i class="iconfont icon-edit"></i>
	            			</a>
	            			<a @click="deleteItem(dataItem._id)">	
	            				<i class="iconfont icon-delete"></i>
	            			</a>
	            		</Col>
	            		<Col class="cardDetails" offset="10">
	            			<table>
	            				<tr>
	            					<td>数量</td>
	            					<td>{{dataItem.number}}</td>
	            				</tr>
	            				<tr>
	            					<td>购买地点</td>
	            					<td>{{dataItem.loc}}</td>
	            				</tr>
	            				<tr>
	            					<td>购买日</td>
	            					<td>{{dataItem.date}}</td>
	            				</tr>
	            				<tr>
	            					<td>过期日</td>
	            					<td>{{dataItem.overdate}}</td>
	            				</tr>
	            				<tr>
	            					<td>在家哪里</td>
	            					<td>{{dataItem.homeLoc}}</td>
	            				</tr>
	            			</table>
	            			<!--<p>数量number: {{dataItem.number}}</p>-->
	            			<!--<p>购买地点loc: {{dataItem.loc}}</p>
	            			<p>购买日date: {{dataItem.date}}</p>
	            			<p>过期日overdate: {{dataItem.overdate}}</p>
	            			<p>在家哪里homeLoc: {{dataItem.homeLoc}}</p>-->
                		</Col>
	            	</Row>
	            </Card>
	            <br />
	        </Col>
	        
		</Row>
		
		
		</mt-loadmore>	
		
		
	
	</section>
	</div>
  		
	<div v-else>
		<Updating  
			:id="targetId" 
			:name="targetParams.name"
			:number="targetParams.number"
			:loc = "targetParams.loc"
			:date = "targetParams.date"
			:overdate = "targetParams.overdate"
			:homeLoc= "targetParams.homeLoc"
			:imageUrl = "targetParams.imageUrl"
			@getData="getData"
			></Updating>
	</div>	
	
	
		
		<br />
		<br />
		<br />
		<br />
			
	<div id="footer">
		<Footer></Footer>
	</div>
			
	</div>
	
	
</template>

<script>
import axios from 'axios'
import Footer from "./help/Footer.vue"
import Navi from "./help/Navi.vue"

import {toast} from "mint-ui"

import { MessageBox } from 'mint-ui';

import Updating from "./修改.vue"



export default{
	components:{
		Footer,
		Updating,
		Navi
	},
	data(){
		return{
			serverImgBase: //'http://192.168.223.101:3000',
//			'http://192.168.12.102:3000',// (floor 2)
			//'http://192.168.13.100:3000',// (floor 3)
			'http://localhost:3000',
			dataList:null,
			modalDisplay: false,
			modalImage: '',
			modalCaption:'',
			//currentModalKey: 0
			
			
			updating: false,
			targetId: 0,
			targetParams: {}
		}
	},
	mounted(){
		this.refreshList();
	},
	methods:{
		//Receiving child Updating emit messeges
		getData(data){
			console.log(data)
			if(data === '回'){
				this.updating = false;
				this.refreshList();
			}
		},
		changeModal(key){
//			console.log("here",key)
			//this.currentModalKey = key
			var dataItem = this.dataList[key];
			var imgUrl = this.serverImgBase+ dataItem.imageUrl;
			
			this.modalImage = imgUrl;
			this.modalCaption = dataItem.name;
			this.modalDisplay = true;
			
		},
		closeModal(){
//			console.log("here")
			this.modalDisplay = false;
		},
		refreshListScroll(){
			this.refreshList()
			this.$refs.loadmore.onTopLoaded();
		},
		refreshList(){
			//toast("刷新!")
			console.log("here")
			var apiUrl = this.serverImgBase + "/food/getAllByOverdate" //"/food/getAll"
			var _this = this;
			
			axios.get(
				apiUrl
			).then((res) => {
				console.log(res.data.info.list)
        		_this.dataList = res.data.info.list;
   			 }).catch(function (error) {
       			 console.log(error);
    		});
		},
		refreshListByNumber(){
//			console.log("here")
			var apiUrl = this.serverImgBase + "/food/getAllByNumber"
			var _this = this;
			
			axios.get(
				apiUrl
			).then((res) => {
				console.log(res.data.info.list)
        		_this.dataList = res.data.info.list;
   			 }).catch(function (error) {
       			 console.log(error);
    		});
		},
		refreshListByDate(){
//			console.log("here")
			var apiUrl = this.serverImgBase + "/food/getAllByDate"
			var _this = this;
			
			axios.get(
				apiUrl
			).then((res) => {
				console.log(res.data.info.list)
        		_this.dataList = res.data.info.list;
   			 }).catch(function (error) {
       			 console.log(error);
    		});
		},
		refreshListByOverdate(){
//			console.log("here")
			var apiUrl = this.serverImgBase + "/food/getAllByOverdate"
			var _this = this;
			
			axios.get(
				apiUrl
			).then((res) => {
				console.log(res.data.info.list)
        		_this.dataList = res.data.info.list;
   			 }).catch(function (error) {
       			 console.log(error);
    		});
		},
		deleteItem(id){
//			console.log('here',id)
			
			MessageBox.confirm('删除此物吗?')
			.then((action) => {
				console.log(action)
				console.log('del')
				
				var deleteUrl = this.serverImgBase + "/food/del"
				var param = {"_id": id}
				var _this = this;
				
				axios({
	              method: 'post',
	              url: deleteUrl,
	              data:param
	            })
				.then((res) =>{
					console.log(res)
					toast("删除成功")
					_this.refreshList();
				})
				.catch((err) =>{
					console.log(err)
				})
				
				
				
			})
			.catch((err) => {
				console.log(err)
			})
			
			
		},
		updateItem(id,params){
			//console.log('here',id)
			
			var _this = this;
			
			MessageBox.confirm('修改?')
			.then((action) => {
				console.log(action)
				_this.targetId = id;
				_this.targetParams = params;
				_this.updating = true;
			})
			.catch((err) => {
				console.log(err)
			})
		}
		
		

		
	}
}

</script>

<style>
	/*responsive footer*/
@media (max-width: 799px){
	#footer{
		display:block;
	}	
	#myNav{
		display:none;
	}
	#mySection{
		position:relative;
		margin-top:120px;
	}

}
@media (min-width: 800px){
	#footer{
		display:none;
	}	
	#myNav{
		display:block;
	}
	#mySection{
		position:relative;
		margin-top:180px;
	}

}

	
/*other content*/	


tr > td:first-child{
	color:orange;
	
}


.icon-delete{
	position:relative;
	font-size:25px;
	color:red;
}

.icon-edit{
	position:relative;
	font-size:25px;
	color:deepskyblue;
}

.cardTitle{
	font-size:20px!important;
	color:dodgerblue!important;
}


	
.cardDetails > p{
	font-size:16px;
	color:forestgreen
}

/*pic zoom effect*/
.cardImage{
	height:100px;
	width:100px;
	border-radius:5px;
	cursor:pointer;
	transition:0.3s;
}

.cardImage:hover{
	opacity: 0.7;
}

.close {
    position: absolute;
    top: 50px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
}

.close:hover,
.close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
}


/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 21; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

.modalActive{
	display:block;
}

/* Modal Content (image) */
.modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
}

/* Caption of Modal Image */
#caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
    font-size:20px;
}

/* Add Animation */
.modal-content, #caption {    
    -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.6s;
    animation-name: zoom;
    animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
    from {-webkit-transform: scale(0)} 
    to {-webkit-transform: scale(1)}
}

@keyframes zoom {
    from {transform: scale(0.1)} 
    to {transform: scale(1)}
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
    .modal-content {
        width: 100%;
    }
}


.refreshBtn{
	position:fixed;
	z-index:200;
	top:15px;
	left:15px;
	width:50px;
	background:lightblue;
	font-size:20px;
	border-radius:12px;
	border:3px solid black;
	color:black;
}


.submitbtn{
	height:50px;
	width:80%;
}
header img{
	height:100px;
}




</style>