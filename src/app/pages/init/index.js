const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const DataObject = require('basis.data').Object;
const service = require('app.service');

var profile = new DataObject({
    login: service.createAction({
        secure: false,
        method: 'POST',
        url: 'auth/login',
        request: function(login, pwd){
            return {                       // POST /login
                params: {                    //
                    email: login,              // login=[login]&password=[pwd]
                    password: pwd              //
                }
            }
        },
        success: function(data){
            service.openSession(true);
            localStorage.setItem('access_token', data.access_token)
            router.navigate('dashboard');
        }
    })
});

if (localStorage.getItem('access_token')) {
    service.openSession(true);
    router.navigate('dashboard');
} else {
    router.navigate('');
}


module.exports = new Node({
    template: resource('./template/init.tmpl'),
    action:{
        signIn:function (e) {
            e.die();
            profile.login(this.data.email, this.data.password);
        },
        updateEmail : function (e) {
            this.update({email:e.sender.value});
        },
        updatePassword:function (e) {
            this.update({password:e.sender.value});
        }
    }
});