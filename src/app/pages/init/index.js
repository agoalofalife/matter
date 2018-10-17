const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const DataObject = require('basis.data').Object;
const service = require('app.service');
const auth = require('app.auth');

module.exports = new Node({
    template: resource('./template/init.tmpl'),
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