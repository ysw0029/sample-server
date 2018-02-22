var express = require('express');
var app = express();

app.get('/', function(req, res){//get방식으로 데이터를 전달하겠다.
  res.send('Hello World!');
});

app.get('/helloWorld', function(req, res){//get방식으로 데이터를 전달하겠다.
  res.send('Hello World!');
});

app.get('/user/serch', function(req, res){
    console.log(req.params.userId+'의 정보를 가져옵니다');

    var user = {
      userId:req.query.userId,
    //  name:'Sungwon',
      email:'ysw0029@gmail.com'
    };

    res.send(user);
});

app.put('/user/:userId', function(req, res){
  res.send('PUT(Update) ');
});

app.delete('/user/:userId', function(req, res){
    res.send('DELETE(Delete) ');
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.post('/user', function(req, res){
  console.log('데이터확인', req.body);
  res.send({state:'OK', data:req.body});
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
