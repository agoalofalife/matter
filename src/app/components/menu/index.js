const Node = require('basis.ui').Node;
let Value = require('basis.data').Value;
let STATE = require('basis.data').STATE;
const Expression = require('basis.data.value').Expression;
const router = basis.require('basis.router');

const preloaderVerically = require('../../ui/preloader-vertically/index');
const menu = require('../../type').menu;
let currentPage = Value.from(router.route('dashboard/:page').param('page'));

module.exports = new Node({
    className:'menu',
    active:true,
    dataSource: menu.all,
    template: resource('./templates/menu.tmpl'),
    binding:{
        preloader:'satellite:',
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        isNotShow:node => new Expression(
            Value.query(node, 'childNodesState'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount || (state == STATE.PROCESSING || state == STATE.ERROR)),
        isError:Value.query('childNodesState').as(state => state == STATE.ERROR),
    },
    satellite: {
        preloader: preloaderVerically,
    },
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