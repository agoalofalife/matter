var Service = require('basis.net.service').Service;

var defaultService = new Service({
  isSecure: true,
  transportClass: {
      // init: function(){
          // console.log(this)
          // this.url = '/api/' + this.controller;
          // basis.net.ajax.Transport.prototype.init.call(this);
      // },
      requestHeaders: {   // добавляем заголовок по умолчанию
          Accept: 'application/json'
      }
  }
});

module.exports = defaultService;
