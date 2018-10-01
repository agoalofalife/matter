const Node = require('basis.ui').Node;

module.exports = Node.subclass({
    className:'modal.confirmed',
    template: resource('./templates/modal_confirmed.tmpl'),
    binding: {
     active:'active'
    },
    init:function () {
        Node.prototype.init.call(this);
        this.active = false;
    }
});