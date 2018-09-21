const Node = require('basis.ui').Node;
const Menu = require('./../../components/menu/index');
const DataObject = require('basis.data').Object;
const Dataset = require('basis.data').Dataset;
const router = basis.require('basis.router');
const pages = require('../dashboard/dashboardRoutes');

var dataset = new Dataset({
    items: [
        { id: 1, name: 'Пользователи', url:'users' },
        { id: 2, name: 'Роли', url:'roles' },
    ].map(function (value) {
        return new DataObject({
            data: {
                id: value.id,
                name: value.name,
                url:value.url
            }
        });
    })
});


let page = router
    .route('dashboard/:area')
    .param('area')
    .as(function(page) {
        return pages[page] || pages['start'];
    });


module.exports = new Node({
    template: resource('./templates/dashboard.tmpl'),
    childClass: Menu,
    dataSource: dataset,
    binding: {
        area: 'satellite:',
    },
    satellite: {
        area: page,
    },
});