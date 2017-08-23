var express = require('express');
var router = express.Router();
var dateV=new Date();
var timeStamp= 'v='+dateV.getFullYear()+(dateV.getMonth()+1)+
                  dateV.getDate()+dateV.getHours()+dateV.getMinutes();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(666)
  res.render('index', {
       version: timeStamp,
       resourcesUrl:''
       });
});

/*用户展示端*/
router.get('/h5', function(req, res, next) {

  var destination=(req.query.route||'').replace('-','/').replace('-','/'),
      view=req.query.view,
      routeModel='app/manager/'+destination+'/'+view;
      if(!destination || !view){
        routeModel='app/home';
      }

  res.render(routeModel, {
       version: timeStamp,
       date : (new Date().format("yyyy-MM-dd hh:mm:ss")),
       resourcesUrl:''
       });
});

/*后台管理端*/
router.get('/admin', function(req, res, next) {

  res.render('admin/admin', {
       version: timeStamp,
       date : (new Date().format("yyyy-MM-dd hh:mm:ss")),
       resourcesUrl:''
       });
});

Function.prototype.method=function(name,fn){
    if(!this.prototype[name]){
        this.prototype[name]=fn;
        return this;
    }
};


if(!Date.prototype.format){
    Date.prototype.format =function(format){
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4- RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    };
}




module.exports = router;
