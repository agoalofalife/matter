const Node = require('basis.ui').Node;
const auth = require('app.auth');

module.exports = new Node({
    template: resource('./templates/auth.tmpl'),
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