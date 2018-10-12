const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const Expression = require('basis.data.value').Expression;
const validation = require('app.validator.internet');
const maskPhone = require('app.utils.mask').mobile.RU;


let trueEmail = Value.query('data.email').as(email => validation.isEmail(email));

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
            this.update({phone:phone})
            e.sender.value = phone;
        },
        save:function (e) {
            console.log(this);
            // for (let field of this.tmpl.form ) {
            //     console.log(field)
            // }
            // console.dir(this.binding);
            e.die();
            this.setDelegate();
        }
    }
});