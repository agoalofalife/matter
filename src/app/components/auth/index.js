const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const STATE = basis.require('basis.data').STATE;
const auth = require('app.auth');
const Expression = require('basis.data.value').Expression;
const validation = require('app.validator.internet');

let authState = Value.state(auth);
let trueEmail = Value.query('data.email').as(email => validation.isEmail(email));
module.exports = new Node({
    template: resource('./templates/auth.tmpl'),
    binding:{
        active:authState.as(state => state != STATE.READY),
        trueEmail:trueEmail,
        notSave:node => new Expression(
            Value.query(node, 'data.email'),
            Value.query(node, 'data.password'),
            (email, phone) => {
                return !validation.isEmail(email) || basis.fn.$isNull(phone) || basis.fn.$undefined(phone) || phone == ''
            }),
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