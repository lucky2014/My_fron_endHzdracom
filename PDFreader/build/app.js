//可行 http://www.jb51.net/article/87885.htm
//https://segmentfault.com/q/1010000000095621
/*var fs = require('fs');
var readableStream = fs.createReadStream('pdf.worker.js');
var data = '';
 
readableStream.setEncoding('utf8');
 
readableStream.on('data', function(chunk){
 data += chunk;
});
 
readableStream.on('end', function(){
 console.log(data);
});*/

/*var request = require('request');
var fs = require('fs');
request('http://122.224.218.58:8001/downPermissionFile/d5193dbee28d5c5ea0cde796b48a7986c8e2c89fd271e685ddf87749a704fb9d2bf9325bbef5c1a756274ffb471e1d99a24eb609a0a973da88e402b1214b2dd13a9a47e0943b0993999ddc75c2f8abd3ae9bed10').pipe(fs.createWriteStream("1.pdf"));
*/

//http://www.dataguru.cn/article-8785-1.html?union_site=baidu_c

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印google首页
  }
})