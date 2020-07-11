var express = require('express')

const multer = require('multer')

var router = express.Router()


/*
 * Stores image into ./static
 */
var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './public');
	},
	filename: function(req, file, cb){
		console.log('----', file)
		let exts = file.originalname.split('.')
		let ext = exts[exts.length - 1]
		
		let tmpname = new Date().getTime() + parseInt(Math.random()*9999)
		cb(null, `${tmpname}.${ext}`);
//		cb(null, 'aaa.jpg');
	}
})
var upload = multer({
	storage: storage
})


/*
 * UPLOAD API
 * 
 * localhost:3000/file/upload
 * POST
 * multi-form submission
 */
router.post('/upload', upload.single('hehe'), (req, res) => {
	
	console.log(req.file)
	
	let {size, mimetype, path} = req.file
	let types=['jpeg', 'jpg', 'png', 'gif']
	let tmpType = mimetype.split('/')[1]
	
	//filters
	if(size >= 50000000){
		return res.send({err:-1, msg:'尺寸太大了'})
	}else if(types.indexOf(tmpType) == -1){
		return res.send({err:-2, msg:'上传类型错误'})
	}else{
		let url = `/public/${req.file.filename}`
		res.send({err:0, msg:'ok', url: url})
	}
//	res.send('uploading ...')
	
	console.log(req.file)
})


module.exports = router