const Node = require('basis.ui').Node;


module.exports = Node.subclass({
    className:'preloader-vertically',
    template: resource('./templates/preloader.tmpl'),
});