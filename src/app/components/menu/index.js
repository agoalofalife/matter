const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
let Value = require('basis.data').Value;
let currentPage = Value.from(router.route('dashboard/:page').param('page'));

module.exports = Node.subclass({
    template: resource('./templates/menu.tmpl'),
    binding: {
        name: 'data:',
        url:'data:'
    },
    selected: currentPage.compute(function(node, page){
        return node.data.url == page
    }),
    action:{
        click:function () {
            router.navigate('dashboard/' + this.data.url);
        }
    }
});