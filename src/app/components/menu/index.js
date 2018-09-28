const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
let Value = require('basis.data').Value;
const menu = require('../../type').menu;
let currentPage = Value.from(router.route('dashboard/:page').param('page'));

module.exports = new Node({
    className:'menu',
    active:true,
    dataSource: menu.all,
    template: resource('./templates/menu.tmpl'),
    childClass: {
        template: resource('./templates/menu-item.tmpl'),
        dataSource: Value.query('data.list'),
        binding: {
            title: 'data:',
        },
        childClass: {
                selected: currentPage.compute(function(node, page){
                    return node.data.url == page
                }),
                template: resource('./templates/menu-li.tmpl'),
                binding: {
                    name:'data:',
                    url:'data:'
                },
                action:{
                    click:function () {
                        router.navigate('dashboard/' + this.data.url);
                    }
                },
            },
    },
});