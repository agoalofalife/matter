const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const Value = require('basis.data').Value;
const STATE = basis.require('basis.data').STATE;
let pages = require('./app/pages/index');
let auth = require('app.components.auth.index');
let Message = require('app.components.message.index');
const authObject = require('app.auth');

let page = router
    .route(':page(/:prefix)')
    .param('page')
    .as(function(page) {
        return pages[page] || pages['dashboard'];
    });


let authState = Value.state(authObject);

module.exports = require('basis.app').create({
  title: 'Административная панель',

  init: function(){
    return new Node({
      disabled:authState.as(state => state != STATE.READY),
      // active: authState.as(state => state == STATE.READY),
      template: resource('./app/template/layout.tmpl'),
        binding: {
            init: 'satellite:',
            auth: 'satellite:',
            message: 'satellite:',
        },
        satellite: {
            init: page,
            auth: auth,
            message: Message,
        },
    });
  }
});

router.start();
