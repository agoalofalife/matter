const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const Value = require('basis.data').Value;
const STATE = basis.require('basis.data').STATE;
let pages = require('./app/pages/index');
let auth = require('app.components.auth.index');

let page = router
    .route(':page(/:prefix)')
    .param('page')
    .as(function(page) {
        return pages[page] || pages['dashboard'];
    });


// authState.as(state => console.log(state))
module.exports = require('basis.app').create({
  title: 'Административная панель',

  init: function(){
    return new Node({
      // active: authState.as(state => state == STATE.READY),
      template: resource('./app/template/layout.tmpl'),
        binding: {
            init: 'satellite:',
            auth: 'satellite:',
            // isAuth: authState.as(state => state == STATE.READY),
        },
        satellite: {
            init: page,
            auth: auth,
        },
    });
  }
});

router.start();
