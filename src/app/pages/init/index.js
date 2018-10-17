const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const DataObject = require('basis.data').Object;
const service = require('app.service');

var profile = new DataObject({
    login: service.createAction({
        needSignature: false,            // DEPRECATED иначе запрос не будет выполнятся
        method: 'POST',
        url: '/auth/login',
        request: function(login, pwd){
            return {                       // POST /login
                params: {                    //
                    email: login,              // login=[login]&password=[pwd]
                    password: pwd              //
                }
            }
        },
        success: function(data){
            console.log(data, 'success')
            // предположим, сервер отдал JSON
            // { "status": "ok", "session": "..." }
            // service.openSession(data.session);

            // сохраняем ключ сессии в cookie
            // cookies.set('sessionKey', data.session);
        }
    })
});
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