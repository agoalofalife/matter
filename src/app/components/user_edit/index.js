const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const Expression = require('basis.data.value').Expression;
const validation = require('app.validator.internet');
const maskPhone = require('app.utils.mask').mobile.RU;


let trueEmail = Value.query('data.email').as(email => validation.isEmail(email));
let truePhone = Value.query('data.phone').as(phone => phone ? phone.replace(/\)/, '').replace(/\(/, '').replace(/\-+/, '').replace(/\-/,'').replace(' ', '').length == 10 : false);

module.exports = new Node({
    className:'user.edit',
    template:resource('./templates/user-edit.tmpl'),
    // disabled:new Expression(
    //     trueEmail,
    //     (trueEmail) => trueEmail),
    // disabled:trueEmail,
    binding:{
        id:'data:',
        email:'data:',
        phone:'data:',
        confirmed:'data:',
        created_at:'data:',
        recent_activity:'data:',
        trueEmail:trueEmail,
        truePhone:truePhone
    },
    action:{
        cancel:function () {
            this.setDelegate();
        },
        updateEmail:function (e) {
            this.update({email:e.sender.value})
        },
        inputPhone: function(e){
            let phone = maskPhone(e.sender.value);
            this.update({phone:phone});
            e.sender.value = phone;
        },
        save:function (e) {
            e.die();
            this.setDelegate();
        }
    }
});