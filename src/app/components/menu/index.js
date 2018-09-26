const Node = require('basis.ui').Node;
const router = basis.require('basis.router');
const DataObject = require('basis.data').Object;
const Dataset = require('basis.data').Dataset;
let MenuItem = require('../menu-head/index');
let Value = require('basis.data').Value;
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

module.exports = new Node({
    className:'menu',
    // dataSource: dataset,
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
            // menuItem: 'satellite:',
            // id: 'data:',
            title: 'title',
            // name: 'data:',
            // type: 'data:',
            // typeName:'data:',
        },

     // childNodes:[
     //     {
     //         // binding: {
     //         //     type: 'data:type',
     //         //     typeName: 'data:typeName',
     //         // },
     //         template: resource('./templates/menu-li.tmpl'),
     //         dataSource: Value.query('data').as(function (t) {
     //             console.log(t)
     //         }),
     //         childClass: {
     //             template: '<li><a class="is-active">{name}</a></li>',
     //             binding: {
     //                 name: 'data:',
     //             },
     //         },
     //         childFactory:function (config) {
     //             console.log(config)
     //         }
     //     }
     // ]
    // childClass: {
    //          // dataSource: Value.query('data.list'),
    //         template: '<li><a class="is-active">{name}</a></li>',
    //         // template: resource('./templates/menu-li.tmpl'),
    //         binding: {
    //             name:'data:',
    //             url:'data:'
    //         },
    //         action:{
    //             click:function () {
    //                 router.navigate('dashboard/' + this.data.url);
    //             }
    //         },
    //     }
        // childClass:MenuItem,
    },
    childNodes:[{
        title:'Основное',
        childClass: {
                 // dataSource: Value.query('data.list'),
                template: '<li><a class="is-active">{name}</a></li>',
                // template: resource('./templates/menu-li.tmpl'),
                binding: {
                    name:'name',
                    url:'url'
                },
                // action:{
                //     click:function () {
                //         router.navigate('dashboard/' + this.data.url);
                //     }
                // },
            },
        childNodes:[{name: 'Пользователи', url:'users'},]
    }]
});