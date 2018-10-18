const Node = require('basis.ui').Node;


module.exports = Node.subclass({
    className:'message',
    template: resource('./templates/message.tmpl'),
    binding: {
        active:'active',
        title:'title',
        text:'text',
    },
});