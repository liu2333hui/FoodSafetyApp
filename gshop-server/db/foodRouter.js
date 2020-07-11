var express = require('express')
var router = express.Router()
var foodModel = require('./foodModel')
var fs = require('fs')

/*
 * DATABASE PERSISTANCE API
 * 
 * localhost:3000/food
 * GET
 */
router.get('/', (req, res) =>{
	res.send('/food')
})


/*
 * DELETE DATABASEITEM API
 * 
 * localhost:3000/food
 * POST
 * @param _id
 * 
 */
router.post('/del', (req, res) => {
	let {_id} = req.body
	
	
	//Remove the image too
	foodModel.find({_id})
	.then((data) => {
		//res.send({err:0, msg:"查找ok", list:data})
		console.log(data[0].imageUrl)
		var imgPath = '.' + data[0].imageUrl
		fs.stat(imgPath, function(err, stats) {
			if (stats == undefined){
				console.log("没有图片")
			}
			else if(stats.isFile()){
				console.log(imgPath, 'here')
				fs.unlink(imgPath, (err) => {
					console.log(err)
				})
			}
		})		
		
	})
	.catch((err) => {
		console.log(err)
	})
	
	foodModel.deleteOne({_id})
			.then((data) => {
				res.send({err:0, msg:"删除ok", list:data})
			})
			.catch(() => {
				res.send({err:-1, msg:"删除no"})
			})
	
	
	
	
	
	

})

/*
 * UPDATE DATABASE ITEM API
 * 
 * localhost:3000/food
 * POST
 * @param {name, number, loc, date, overdate, homeLoc,imageUrl, _id}
 */
router.post('/update', (req, res) => {
	let {name, number, loc, date, overdate, homeLoc,imageUrl, _id} = req.body
	
	foodModel.update({_id}, {name, number, loc, date, overdate, homeLoc,imageUrl})
	.then((data) => {
		res.send({err:0, msg:"修改ok", list:data})
	})
	.catch(() => {
		res.send({err:-1, msg:"修改no"})
	})

})


/*
 * RETRIEVE DATABASE ITEM API
 * 
 * localhost:3000/food
 * POST
 * @param {name, number, loc, date, overdate, homeLoc,imageUrl, _id}
 */
router.post('/getInfoByType', (req, res) => {
	//let typeid = 4
	
	let {typeid} = req.body
	
	foodModel.find({typeid})
	.then((data) => {
		res.send({err:0, msg:"查询ok", list:data})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})
})

router.post('/getInfoByKw', (req, res) => {
	//let typeid = 4
	
	let {kw} = req.body
	let reg = new RegExp(kw)
	
//	res.send({$regex:reg})
//	foodModel.find({name:{$regex:reg}})
foodModel.find({$or:[{name:{$regex:reg}}, {desc:{$regex:reg}}]})
	.then((data) => {
		res.send({err:0, msg:"查询ok", list:data})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})
})

/*
 * RETRIVE DATABASE ITEM API
 * 
 * localhost:3000/food/getInfoByPage
 * POST
 * @param {pageSize, page}
 */
router.post('/getInfoByPage', (req, res) => {
	//let typeid = 4
	let pageSize = req.body.pageSize || 5
	let page = req.body.page || 1
	
	foodModel.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
	.then((data) => {
		res.send({err:0, msg:"查询ok", list:data})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})

})


/*
 * RETRIVE DATABASE ITEM API
 * 
 * localhost:3000/food/getInfoByPageX
 * POST
 * @param {pageSize, page}
 */
router.post('/getInfoByPageX', (req, res) => {
	//let typeid = 4
	let pageSize = req.body.pageSize || 2
	let page = req.body.page || 1
	
	let count = 0
	
	foodModel.find()
	.then((list) => {
		count = list.length //Total counts
		return foodModel.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
	})
	.then((data) => {
		
		let allpage = Math.ceil(count / pageSize)
		
		res.send({err:0, msg:"查询ok", info:{list:data, count:count, allpage: allpage}})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})

})


/*
 * RETRIVE ALL DATABASE  ITEM API
 * 
 * localhost:3000/food/getAll
 * GET
 */
router.get('/getAll', (req, res) => {
	
	foodModel.find()
	.then((data) => {
		res.send({err:0, msg:"查询ok", info:{list:data, count:data.length}})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})

})

/*
 * RETRIVE ALL DATABASE  ITEM API
 * SORTBYNUMBER
 * 
 * localhost:3000/food/getAll
 * GET
 * @queryparam q -1 (desc) or 1 (asc)
 */
router.get('/getAllByNumber', (req, res) => {
	
	let {q} = req.query
	console.log(q)
	
	var asc = q || 1;
	
	foodModel.find().sort({number:asc})
	.then((data) => {
		res.send({err:0, msg:"查询ok", info:{list:data, count:data.length}})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})

})

/*
 * RETRIVE ALL DATABASE  ITEM API
 * SORT BY DATE
 * 
 * localhost:3000/food/getAll
 * GET
 * @queryparam q -1 (desc) or 1 (asc)
 */
router.get('/getAllByDate', (req, res) => {
	
	let {q} = req.query
	console.log(q)
	
	var asc = q || 1;
	
	foodModel.find().sort({date:asc})
	.then((data) => {
		res.send({err:0, msg:"查询ok", info:{list:data, count:data.length}})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})

})

/*
 * RETRIVE ALL DATABASE  ITEM API
 * SORT BY OVERDUE DATE
 * 
 * localhost:3000/food/getAll
 * GET
 * @queryparam q -1 (desc) or 1 (asc)
 */
router.get('/getAllByOverdate', (req, res) => {
	
	let {q} = req.query
	console.log(q)
	
	var asc = q || 1;
	
	foodModel.find().sort({overdate:asc})
	.then((data) => {
		res.send({err:0, msg:"查询ok", info:{list:data, count:data.length}})
	})
	.catch(() => {
		res.send({err: -1, msg:"查询失败"})
	})

})


/*
 * CREATE DATABASE ITEM API
 * 
 * localhost:3000/food/add
 * POST
 * @param {name, number, loc, date, overdate, homeLoc,imageUrl}
 */
router.post('/add', (req, res) => {
	
	let {name, number, loc, date, overdate, homeLoc,imageUrl} = req.body
	
	console.log({name, number, loc, date, overdate, homeLoc,imageUrl})
	
	foodModel.insertMany({name, number, loc, date, overdate, homeLoc,imageUrl})
	.then((data) => {
		res.send({err:0, msg:'添加成功'})
	})
	.catch(() => {
		res.send({err: -1, msg: '没有添加'})
	})
	
})





module.exports = router