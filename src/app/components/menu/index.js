const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const DataObject = require('basis.data').Object;
const Dataset = require('basis.data').Dataset;
let MenuItem = require('../menu-head/index');
let Value = require('basis.data').Value;
const menu = require('../../type').menu;
// let currentPage = Value.from(router.route('dashboard/:page').param('page'));

var dataset = new Dataset({
    items: [
        {
            id: 1,
            title:"Основное",
            type:null,
            typeName:'',
            list:[
                {name: 'Пользователи', url:'users'},
                {name: 'Роли', url:'roles'},
            ],
        },
    ].map(function (value) {
        return new DataObject({
            data: {
                id: value.id,
                title: value.title,
                type:value.type,
                typeName:value.typeName,
                list:value.list,
            }
        });
    })
});

console.log(menu.all)
module.exports = new Node({
    className:'menu',
    active:true,
    dataSource: menu.all,
    template: resource('./templates/menu.tmpl'),
    // selected: currentPage.compute(function(node, page){
    //     return node.data.url == page
    // }),
    childClass: {
        template: resource('./templates/menu-item.tmpl'),
        dataSource: Value.query('data.list'),
        binding: {
            title: 'data:',
        },
        childClass: {
                 // dataSource: Value.query('data.list'),
                template: '<li><a class="is-active">{name}</a></li>',
                // template: resource('./templates/menu-li.tmpl'),
                binding: {
                    name:'data:',
                    url:'data:'
                },
                // action:{
                //     click:function () {
                //         router.navigate('dashboard/' + this.data.url);
                //     }
                // },
            },
    },
});