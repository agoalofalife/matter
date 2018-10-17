const DataObject = require('basis.data').Object;
const service = require('app.service');
const router = basis.require('basis.router');

var auth = new DataObject({
    login: service.createAction({
        secure: false,
        method: 'POST',
        url: 'auth/login',
        request: function(login, pwd){
            return {
                params: {
                    email: login,
                    password: pwd
                }
            }
        },
        success: function(data){
            service.openSession(true);
            localStorage.setItem('access_token', data.access_token);
            router.navigate('dashboard');
        }
    }),
    me:service.createAction({
        method: 'POST',
        url: 'auth/me',
        request: function(token){
            return {
                requestHeaders: {
                    Authorization: 'Bearer ' + token,
                }
            }
        },
        success: function(data){
            console.log(data, 'me data')
        }
    }),
});
module.exports = auth;