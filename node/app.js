const express = require('express')
const os = require('os')
const app = express()
const mongoose = require('mongoose')
// mongodb链接地址
const DB_URL = 'mongodb://root:mongo123@localhost:27017/user?authSource=admin'
// 连接数据库
mongoose.connect(DB_URL)
mongoose.connection.on('connect', () => {
    console.log('mongodb connect success')
})
// 获取本机ip地址
function getLocalIpAddress() {
    let ip = ''
    let netInfo = os.networkInterfaces()
    let osType = os.type()
    if (osType === 'Windows_NT') {
        for (const dev in netInfo) {
            // win7的网络信息中显示为本地连接，win10显示为以太网
            if (dev === '本地连接' || dev === '以太网') {
                for (let j = 0; j < netInfo[dev].length; j++) {
                    if (netInfo[dev][j].family === 'IPv4') {
                        ip = netInfo[dev][j].address;
                        break;
                    }
                }
            }
        }
    } else if (osType === 'Linux') {
        ip = netInfo.eth0[0].address;
    }
    return ip
}
app.get('/getJson', (request, response) => {
    response.send({
        title: 'Hello Express、Hello Docker',
        ip: getLocalIpAddress(),
        env: process.env.NODE_ENV
    })
})


//定义User模型
const User = mongoose.model('user', new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
}))
app.get('/getUser', (request, response) => {
    User.find({}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log(doc)
            response.json(doc)
        }

    })
})
app.get('/addUser', (request, response) => {
    User.create({
        username: 'laowang',
        age: 12
    }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log(doc)
            response.json(doc)
        }

    })
})
// 监听3000端口
app.listen(3000, () => {
    console.log('server is started')
})
