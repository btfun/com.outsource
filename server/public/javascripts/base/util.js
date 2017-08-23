define(function(require, exports, module) {
'use strict';

exports.util={
        createUUid: () => {
            return Math.random().toString(36).substr(2, 20);
        },
        getCookie: (c_name) => {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {

                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);

                if (c_end == -1) c_end = document.cookie.length;

                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    setCookie: (c_name, value, expiredays) => {
            //根目录设置cookie
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) +
                ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    },
    getUrlParam: (name) => {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
    },
    getUrlParamData: () => {
          //获取url上的参数对象
          var hashStr = location.search.substr(1),
              lis = hashStr.split('&');
          var obj = {};
          for (var i = 0; i < lis.length; i++) {
              var str = lis[i].split('=');
              if (str.length == 2) {
                  obj[str[0]] = str[1];
              }
          }
          return obj;
    }

}






})
