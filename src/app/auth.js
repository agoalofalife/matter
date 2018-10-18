const DataObject = require('basis.data').Object;
const service = require('app.service');
const router = basis.require('basis.router');
const STATE = basis.require('basis.data').STATE;

const nameTokenLocalStorage = 'access_token';
var auth = new DataObject({
    state: STATE.UNDEFINED,
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
            localStorage.setItem(nameTokenLocalStorage, data.access_token);
            this.setState(STATE.READY)
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
    isAuth:function () {
        // проверять наличие токена в locale storage
        // проверить актуальность токена
        // - через расшифровку смотреть TTL
        // - через freeze , если устареет, значит заморозить
        // если нет токена в storage и отстутствует session key, то состояние undefined
        if(basis.fn.$isNotNull(localStorage.getItem(nameTokenLocalStorage)) || basis.fn.$defined(service.sessionKey) || basis.fn.$null(service.sessionKey)) {
            this.setState(STATE.UNDEFINED);
        }
    }
});
module.exports = auth;