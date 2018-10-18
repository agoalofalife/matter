const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const STATE = basis.require('basis.data').STATE;
const auth = require('app.auth');

let authState = Value.state(auth);

module.exports = new Node({
    template: resource('./templates/auth.tmpl'),
    binding:{
        active:authState.as(state => state != STATE.READY),
    },
    action:{
        signIn:function (e) {
            e.die();
            auth.login(this.data.email, this.data.password);
        },
        updateEmail : function (e) {
            this.update({email:e.sender.value});
        },
        updatePassword:function (e) {
            this.update({password:e.sender.value});
        }
    }
});