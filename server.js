var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sample-server');

var schema = new mongoose.Schema({id:String, password:String, name:String, email:String, gender:String, location:String});
const User = mongoose.model('User', schema);

//post signup
app.post('/user', function(req, res){
  var data = req.body;
  console.log('데이터확인', data);
  //res.send({state:'OK', data:req.body});

  const person = new User({id:data.id, password:data.password, name:data.name, email:data.email, gender:data.gender, location:data.location});
  person.save(function(err, ress){
    if(err){
      res.send("error!");
    }else{
      res.send({state:'OK', data:req.body});
    }
  });
});

//login
app.post('/login', function(req, res){
  console.log(req.body);
  User.findOne({id:req.body.id, password:req.body.password}, function(err, user){
    if(err) console.log(err);
    console.log("!!!!!!!"+user);
    if(user){
      //res.send('OK');
      res.redirect('/modify.html?'+'id='+user.id);
    }else{
      res.send('틀린정보');
    }
  });
});

//get search
app.get('/user/search', function(req, res){
  User.findOne({ 'id': req.query.id },'id password name email gender location' ,function (err, user) {
      res.send(user);
    });
});


//put
app.put('/user/update', function(req, res){
  User.findOne({'id':req.body.id}, function(error, result) {
    result.name = req.body.name;
    res.send(result.name);
    result.save();
  });

});

//delete
app.delete('/user/delete', function(req, res){
  User.findOne({id: req.body.id}).remove().exec().next();
  //exec()
});

//static
app.use(express.static('public'));

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
