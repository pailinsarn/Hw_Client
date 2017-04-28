var express = require('express')
var app = express()
var router = express.Router()
var bodyParser = require('body-parser')
app.use('/',express.static(__dirname + '/public')); 

var items = [{'id':0,'name':'Pepsi','bth':20,type:'drink'},
			 {'id':1,'name':'nail','bth':2,type:'equip'},
			 {'id':2,'name':'Doll','bth':30,type:'toy'}]
var b_items = []
var itemIndex=3;
var cashIndex=0;

router.route('/Market')
	  .get(function(req, res) {
	  	res.json(items)
	  })
	  .post(function(req,res){
	  	var item = {}
	  	if(items == {}){
	  		itemIndex = 0;
	  	}
	  	item.id = itemIndex++;	
	  	item.name = req.body.name
	  	item.bth = req.body.bth
	  	item.type = req.body.type
	  	items.push(item)
	  	res.json({message : 'success'})
	  })
router.route('/Market/:item_id')
	  .delete( function (req,res){
	   var id = req.params.item_id
	   delete items[id] 

	   res.json({message : ' delete'})
	  })
router.route('/Shopping')
	  .get(function(req, res) {
	  	res.json(b_items)
	  })
	  .post(function(req,res){
	    var item = {}
	    item.id = cashIndex++
	    item.name = req.body.name
	    item.bth = req.body.bth
	    item.number = req.body.number
	  	b_items.push(item)
	  	res.json({message : 'Sumbth'})
	  })	  

router.route('/Shopping/:shop_id')
	  .delete( function (req,res){
	   var id = req.params.shop_id
	   delete b_items[id] 

	   res.json({message : ' delete'})
	  })
router.route('/SumIeam')
	  .get(function(req, res) {
	  var sum = 0;
	  for(i in b_items)
	  	{ sum += (b_items[i].bth * b_items[i].number)}
	  	console.log(sum)
	  	  	res.json([{message: sum}])
	  	 })

app.use('/api', bodyParser.json(), router)
app.listen(8000, function() {
	console.log('server is running...')
})