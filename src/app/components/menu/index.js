const Node = require('basis.ui').Node;
const router = basis.require('basis.router');

module.exports = Node.subclass({
    template: resource('./templates/menu.tmpl'),
    binding: {
        name: 'data:',
        url:'data:'
    },
    action:{
        actionLink:function (e) {
            // router.navigate(e.sender.dataset.url);
        }
    }
});