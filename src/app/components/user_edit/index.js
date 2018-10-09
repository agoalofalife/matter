const Node = require('basis.ui').Node;


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