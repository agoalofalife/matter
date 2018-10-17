const DataObject = require('basis.data').Object;
const service = require('app.service');

var auth = new DataObject({
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
            localStorage.setItem('access_token', data.access_token);
            router.navigate('dashboard');
        }
    }),
    isAuth:function () {
        
    }
});


module.exports = auth;