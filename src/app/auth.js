const DataObject = require('basis.data').Object;
const service = require('app.service');
const STATE = basis.require('basis.data').STATE;

const nameTokenLocalStorage = 'access_token';
var auth = new DataObject({
    init() {
        DataObject.prototype.init.call(this);
        window.addEventListener('storage', function(e) {
            // при удалении из storage token
            if (e.key === nameTokenLocalStorage && basis.fn.$isNull(e.newValue)) {
                this.setState(STATE.UNDEFINED)
            }
        }.bind(this));
        service.addHandler({
            sessionFreeze:function () {
                basis.dev.info('Session freeze');
                this.setState(STATE.UNDEFINED)
            },
            sessionOpen: function(){
                basis.dev.info('Session open');
                this.setState(STATE.READY)
            },
        }, this);
        this.isAuth()
    },
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
        }
    }),
    me:service.createAction({
        method: 'POST',
        url: 'auth/me',
        request: function(){
            return {
                requestHeaders: {
                    Authorization: 'Bearer ' + this.getToken(),
                }
            }
        },
        success: function(data){
            console.log(data, 'me data')
        },
    }),
    isAuth:function () {
        // проверять наличие токена в locale storage
        // проверить актуальность токена
        // - через расшифровку смотреть TTL
        // - через freeze , если устареет, значит заморозить
        // если нет токена в storage и отстутствует session key, то состояние undefined
    // || basis.fn.$undefined(service.sessionKey) || basis.fn.$isNull(service.sessionKey)
        if(basis.fn.$isNull(this.getToken())) {
            this.setState(STATE.UNDEFINED);
            return false;
        }
        this.setState(STATE.READY);
        return true;
    },
    getToken() {
        return localStorage.getItem(nameTokenLocalStorage);
    },
    out(){
        localStorage.removeItem(nameTokenLocalStorage);
        this.setState(STATE.UNDEFINED);
    }
});


module.exports = auth;