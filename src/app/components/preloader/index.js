const Node = require('basis.ui').Node;


module.exports = Node.subclass({
    className:'preloader',
    template: resource('./templates/preloader.tmpl'),
});