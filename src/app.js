const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
let pages = require('./app/pages/index');
let auth = require('app.components.auth.index');
let page = router
    .route(':page(/:prefix)')
    .param('page')
    .as(function(page) {
        return pages[page] || pages['dashboard'];
    });


module.exports = require('basis.app').create({
  title: 'Административная панель',

  init: function(){
    return new Node({
      template: resource('./app/template/layout.tmpl'),
        binding: {
            init: 'satellite:',
            auth: 'satellite:',
        },
        satellite: {
            init: page,
            auth: auth,
        },
    });
  }
});

router.start();
