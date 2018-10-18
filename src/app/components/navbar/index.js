const Node = require('basis.ui').Node;
const Dataset = require('basis.data').Dataset;
const DataObject = require('basis.data').Object;
const router = basis.require('basis.router');

let test = require('app.auth');
module.exports = new Node({
    className:'navbar',
    data:{
        name:'Matter Admin',
    },
    binding:{
        name:'data:'
    },
    template: resource('./templates/navbar.tmpl'),
    action:{
        signOut: function () {
            test.me();
            // localStorage.removeItem("access_token");
            // router.navigate('');
        }
    },
    childClass: {
        template: resource('./templates/navbar-item.tmpl'),
        binding: {
            title: 'data:',
        },
    },
    dataSource: new Dataset({
        items: [
            { id: 1, title: 'Не заполнено' },
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