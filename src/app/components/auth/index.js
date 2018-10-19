const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const STATE = basis.require('basis.data').STATE;
const auth = require('app.auth');
const Expression = require('basis.data.value').Expression;
const validation = require('app.validator.internet');

let Message = require('app.components.message.index');
let authState = Value.state(auth);
let trueEmail = Value.query('data.email').as(email => validation.isEmail(email));


// Message.update({title:'Информация', text:'Просто текст', type:'is-success', duration:3000});
// console.log(Message, 'message from auth components')
// Message.makeActive();

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
            auth.login(this.data.email, this.data.password).then(() => {
                Message.update({title:'Информация', text:'Вы успешно прошли аутентификацию!', type:'is-success', duration:3000, active:true});
            }).catch(err => {
              if (err.response.error = "Unauthorized") {
                  Message.update({title:'Ошибка', text:'Неверный логин или пароль!', type:'is-danger', duration:3000, active:true});
              };
            })
        },
        updateEmail : function (e) {
            this.update({email:e.sender.value});
        },
        updatePassword:function (e) {
            this.update({password:e.sender.value});
        }
    }
});