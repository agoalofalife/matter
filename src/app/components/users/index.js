const Node = require('basis.ui').Node;
const users = require('../../type.js').user;
const Preloader = require('../../components/preloader/preloader');
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;

module.exports = new Node({
    className:'dashboard.users',
    template: resource('./templates/users.tmpl'),
    active: true,
    satellite: {
        preloader: Preloader,
    },
    handler: {
        ownerChanged() {
            // data deprecate if owner exist after change
            if (this.owner) {
                this.dataSource.deprecate();
            }
        }
    },
    binding: {
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        preloader: 'satellite:',
    },
    childClass: {
        template: resource('./templates/users-table-item.tmpl'),
        binding: {
            id: 'data:',
            name: 'data:',
            email: 'data:',
        },
    },
    dataSource: users.all,
});