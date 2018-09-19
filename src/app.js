var Node = require('basis.ui').Node;
var router = basis.require('basis.router');
var pages = require('./app/pages/index');

var page = router
    .route(':page')
    .param('page')
    .as(function(page) {
        return pages[page] || pages[''];
    });


module.exports = require('basis.app').create({
  title: 'Административная панель',

  init: function(){
    return new Node({
      template: resource('./app/template/layout.tmpl'),
        binding: {
            init: 'satellite:',
        },
        satellite: {
            init: page,
        },
    });
  }
});

router.start();
