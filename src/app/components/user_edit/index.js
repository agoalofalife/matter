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
        }
    }
});