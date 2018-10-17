var Service = require('basis.net.service').Service;
const Transport = require('basis.net.ajax').Transport;
const settings = require('./settings.json');

var defaultService = new Service({
  secure: true,
  transportClass: {
      init: function(){
          this.url = settings.host + '/api/' + this.url;
          Transport.prototype.init.call(this);
      },
      requestHeaders: {
          Accept: 'application/json'
      }
  },
   isSessionExpiredError: function(request) {
        return request.xhr.status == 401;
  }
});

module.exports = defaultService;
