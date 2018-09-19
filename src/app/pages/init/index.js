const Node = require('basis.ui').Node;
const router = basis.require('basis.router');


module.exports = new Node({
    template: resource('./template/init.tmpl'),
    action:{
        signIn:function (e) {
            router.navigate('dashboard')
        }
    }
});