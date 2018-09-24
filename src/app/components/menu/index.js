const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
// let Value = require('basis.data').Value;
// let currentPage = Value.from(router.route('dashboard/:page').param('page'));

module.exports = new Node({
    className:'menu',
    template: resource('./templates/menu.tmpl'),
    // binding: {
    //     id: 'data:',
    //     title: 'data:',
    //     type: 'data:',
    //     typeName:'data:',
    // },
    // selected: currentPage.compute(function(node, page){
    //     return node.data.url == page
    // }),
    childClass: {
        template: resource('./templates/menu-item.tmpl'),
        binding: {
            id: 'data:',
            title: 'data:',
            type: 'data:',
            typeName:'data:',
        },
        // childClass: {
        //     template: resource('./templates/menu-li.tmpl'),
        //     binding: {
        //         name:'data:',
        //         url:'data:'
        //     },
        //     action:{
        //         click:function () {
        //             router.navigate('dashboard/' + this.data.url);
        //         }
        //     },
        // },
    }
});