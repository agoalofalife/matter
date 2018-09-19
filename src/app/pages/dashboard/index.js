const Node = require('basis.ui').Node;
const Menu = require('./../../components/menu/index');
const DataObject = require('basis.data').Object;
const Dataset = require('basis.data').Dataset;

var dataset = new Dataset({
    items: [
        { id: 1, name: 'Пользователи', url:'/users' },
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

module.exports = new Node({
    template: resource('./templates/dashboard.tmpl'),
    selection: true,
    childClass: Menu,
    dataSource: dataset
});