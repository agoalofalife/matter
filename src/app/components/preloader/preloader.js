const Node = require('basis.ui').Node;


module.exports = Node.subclass({
    className:'preloader',
    data:{
        // path:'https://pbs.twimg.com/profile_images/532918085586407424/-1HSoYMO_400x400.jpeg',
        path:asset('./../../assets/images/spinner.gif'),
    },
    binding:{
        path:'data:'
    },
    template: '<img src="{path}" alt="preloader" style="    max-width: 5%;">',
});