const Node = require('basis.ui').Node;
const Value = require('basis.data').Value;
const validation = require('app.validator.internet');

module.exports = new Node({
    className:'user.edit',
    template:resource('./templates/user-edit.tmpl'),
    binding:{
        id:'data:',
        email:'data:',
        phone:'data:',
        confirmed:'data:',
        created_at:'data:',
        recent_activity:'data:',
        trueEmail:Value.query('data.email').as(email => validation.isEmail(email)),
    },
    action:{
        cancel:function () {
            this.setDelegate();
        },
        updateEmail:function (e) {
            this.update({email:e.sender.value})
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