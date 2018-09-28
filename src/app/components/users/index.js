const Node = require('basis.ui').Node;
const users = require('../../type.js').user;
const Preloader = require('../preloader/index');
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;
let Expression = require('basis.data.value').Expression;

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
        preloader: 'satellite:',
        loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        isError:Value.query('childNodesState').as(state => state == STATE.ERROR),
        isNotShow:node => new Expression(
            Value.query(node, 'childNodesState'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount && (state == STATE.READY || state == STATE.ERROR)),
    },
    childClass: {
        template: resource('./templates/users-table-item.tmpl'),
        binding: {
            id: 'data:',
            name: 'data:',
            title: 'data:',
        },
    },
    dataSource: users.all,
});