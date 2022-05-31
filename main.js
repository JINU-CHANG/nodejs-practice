var http = require('http'); 
var fs = require('fs'); //filesystem 모듈(비슷한 기능 모아놓은 것)
var url = require('url'); //url 모듈

// templateHTML 함수
function templateHTML (title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
      `;
}

// templateList 함수
function templateList(filelist) {
  var list ='<ul>'
  var i = 0;
  while(i<filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  return list = list + '</ul>';
}


var app = http.createServer(function(request,response){
    //url 가져와서 query 정보와 pathname 변수에 저장하기
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/') {
      //query string의 id 값이 없을 때
      if(queryData.id===undefined){

        //data파일 읽기
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'HEllo, Node.js';
  
          var list = templateList(filelist);
  
          var template = templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);

              response.writeHead(200);
              //성공적으로 실행되면 template 반환
              response.end(template);
          })

      } //query string의 id 값이 있을 때
        else {
          fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${queryData.id}`,'utf8', function(err, description){
              var title = queryData.id;
              var list = templateList(filelist);
              var template = templateHTML(title,list,`<h2>${title}</h2><p>${description}</p>`);
                  response.writeHead(200);
                  response.end(template);
            });
          });
      };
    
      
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);