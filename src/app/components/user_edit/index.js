const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const Expression = require('basis.data.value').Expression;
const validation = require('app.validator.internet');
const maskPhone = require('app.utils.mask').mobile.RU;
const maskDate = require('app.utils.mask').date.dateTime;


let trueEmail = Value.query('data.email').as(email => validation.isEmail(email));
let truePhone = Value.query('data.phone').as(phone => phone ? phone.replace(/\)/, '').replace(/\(/, '').replace(/\-+/, '').replace(/\-/,'').replace(' ', '').length == 10 : false);
let trueCreatedAt = Value.query('data.created_at').as(createdAt => createdAt ? /((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))\s([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9]))/.test(createdAt) : false);

const node = new Node({
    className:'user.edit',
    template:resource('./templates/user-edit.tmpl'),
    binding:{
        id:'data:',
        email:'data:',
        phone:'data:',
        confirmed:'data:',
        created_at:'data:',
        recent_activity:'data:',
        trueEmail:trueEmail,
        truePhone:truePhone,
        trueCreatedAt:trueCreatedAt,
        notConfirmed:Value.query('data.confirmed').as(confirmed => !confirmed),
        // notSave:node => new Expression(
        //     Value.query(trueEmail),
        //     Value.query(truePhone),
            // trueCreatedAt,
            // (email, phone, created_at) => {
            //     console.log(email, phone, created_at)
            //     return false
            // }),
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
        inputCreatedAt: function(e){
            let createdAt = maskDate(e.sender.value);
            this.update({created_at:createdAt});
            e.sender.value = createdAt;
        },
        changeConfirmed: function (e) {
            var boolValue = e.sender.value == 'true' ? true : false;
            this.update({confirmed:boolValue});
        },
        save:function (e) {
            e.die();
            this.setDelegate();
        }
    }
});


let s = Value.query(node, 'data.email').as(email => validation.isEmail(email)).factory;
console.log(s)
module.exports = node