
const express = require('express')
const app = express()  // 实例化express对象
const mysql = require('mysql')
var bodyParser = require('body-parser'); 
 
// 创建连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database:'nodemysql'
})
 
// 使用db.connect()方法连接，这个方法接收一个参数，有错误就报错
db.connect((err) => {
    if(err) {
        throw err;
        console.log('连接成功');
    }
})

 
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.urlencoded({  
    extended: true
}));
app.use(bodyParser.json()); 
//user表
app.get('/selectuser', (req, res) => {
    // res.send('Hello World!')
    let sql = 'SELECT * FROM user'
    db.query(sql, (err, data) => {
        if(err) {
            throw err;
        }
        res.send(data)
    })
})
app.get('/selectinfo', (req, res) => {
    console.log(req.query.name);
    let name= req.query.name;
    let sql = 'SELECT * FROM user WHERE name ='+ "'"+name+"'"
    db.query(sql, (err, data) => {
        if(err) {
            throw err;
        }
        res.send(data);
    })
})
app.post('/adduser', (req, res) => {
    let sql = 'insert into user set ?'
    let data = req.body;
    res.send(data);
    console.log(data);
    db.query(sql, data, (err, data) => {})
 })
//wage表
//查看数据库中的数据
 app.get('/selectwage', (req, res) => {
     let sql = 'select * from wage';
        db.query(sql, (err, data) => {
            if(err) {
                throw err;
            }
            res.send(data);
        })
 }) 
//添加数据 --------
 app.post('/addwage', (req, res) => {
    let sql = 'insert into wage set ?'
    let data = req.body;
    res.send(data);
    console.log(data);
    db.query(sql, data, (err, data) => {})
 })
//删除数据
    app.post('/delwage', (req, res) => {
        let id = req.body.id;
        console.log(id);
        let sql = 'delete  from wage where id = '+id;
        db.query(sql, id, (err, data) => {
            if(err) {
                throw err;
            }
            console.log('删除成功');
            res.send('删除成功');
        })
    })
//userinfo查询
     app.get('/selectuserinfo', (req, res) => {
        let sql = 'select * from infos';
        db.query(sql, (err, data) => {
            if(err) {
                throw err;
            }
            res.send(data);
        })
     })
//userinfor修改
        app.post('/updateuserinfo', (req, res) => {
            let id = req.body.id;
            console.log(id);
            let sql = 'update infos set ? where id = '+id;
            let data = req.body;
            console.log(data);
            db.query(sql, data, (err, data) => {
                if(err) {
                    throw err;
                }
                res.send('修改成功');
            })
        })

// 开启一个服务器
app.listen(
    3000, () => {
        console.log('服务器开启在3000端口....');
    }
)