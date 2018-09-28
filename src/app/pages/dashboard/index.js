const Node = require('basis.ui').Node;
const Menu = require('./../../components/menu/index');

const router = basis.require('basis.router');
const pages = require('../dashboard/dashboardRoutes');
const Navbar = require('../../components/navbar/index');


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