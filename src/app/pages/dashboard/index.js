const Node = require('basis.ui').Node;
const router = basis.require('basis.router');

const Menu = require('./../../components/menu/index');
const Navbar = require('../../components/navbar/index');
const pages = require('../dashboard/dashboardRoutes');


let page = router
    .route('dashboard/:area')
    .param('area')
    .as(function(page) {
        return pages[page] || pages['start'];
    });


module.exports = new Node({
    className:'dashboard',
    template: resource('./templates/dashboard.tmpl'),
    binding: {
        area: 'satellite:',
        navbar:'satellite:',
        menu:'satellite:',
    },
    satellite: {
        area: page,
        navbar:Navbar,
        menu:Menu
    },
});