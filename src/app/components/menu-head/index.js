const Node = require('basis.ui').Node;


module.exports = new Node({
    // className:'preloader',
    binding:{
        type: 'data:',
        typeName:'data:',
    },
    template: resource('./templates/menu-head.tmpl'),
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
    // childFactory:function (config) {
    //     console.log(config)
    // }
});