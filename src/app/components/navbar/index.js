const Node = require('basis.ui').Node;
const Dataset = require('basis.data').Dataset;
const DataObject = require('basis.data').Object;

module.exports = new Node({
    className:'navbar',
    data:{
        name:'Matter Admin',
    },
    binding:{
        name:'data:'
    },
    template: resource('./templates/navbar.tmpl'),
    childClass: {
        template: resource('./templates/navbar-item.tmpl'),
        binding: {
            id: 'title:',
        },
    },
    dataSource: new Dataset({
        items: [
            { id: 1, title: 'Headcrab' },
            { id: 2, title: 'Magnetto' },
        ].map(function (value) {
            return new DataObject({
                data: {
                    id: value.id,
                    title: value.title
                }
            });
        })
    })
});