var Service = require('basis.net.service').Service;
const Transport = require('basis.net.ajax').Transport;
const settings = require('./settings.json');

var defaultService = new Service({
  secure: true,
  isSessionExpiredError: function(request) {
        console.log('isSessionExpiredError')
        return request.xhr.status == 401;
    },
  transportClass: {
      init: function(){
          this.url = settings.host + '/api/' + this.url;
          Transport.prototype.init.call(this);
      },
      requestHeaders: {
          Accept: 'application/json'
      }
  },
});

defaultService.addHandler({
    sessionOpen: function(){
        console.log('sessionOpen: event context is', this.name);
    },
    sessionFreeze:function () {
        console.log('Session freeze')
    }
});


module.exports = defaultService;
