const Node = require('basis.ui').Node;
const users = require('../../type.js').user;
const Preloader = require('../../ui/preloader/index');
let STATE = require('basis.data').STATE;
let Value = require('basis.data').Value;
let Expression = require('basis.data.value').Expression;
let Filter = require('basis.data.dataset').Filter;

var searchedUser = new Value({ value: '' });

var filtered = new Filter({
    source: users.all,
    rule: function(item) {
        return item.data.email.toLowerCase().indexOf(searchedUser.value.toLowerCase()) !== -1;
    }
});

searchedUser.link(null, () => filtered.applyRule());

module.exports = new Node({
    className:'dashboard.users',
    template: resource('./templates/users.tmpl'),
    active: true,
    selection: true,
    dataSource: filtered,
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
        loading: Value.query('childNodesState').as(state => console.log(state)),
        // loading: Value.query('childNodesState').as(state => state == STATE.PROCESSING),
        isError:Value.query('childNodesState').as(state => state == STATE.ERROR),
        isNotShow:node => new Expression(
            Value.query(node, 'childNodesState'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount || (state == STATE.PROCESSING || state == STATE.ERROR)),
    },
    action: {
        input: function(e){
            searchedUser.set(e.sender.value);
        }
    },
    childClass: {

        template: resource('./templates/users-table-item.tmpl'),
        binding: {
            id: 'data:',
            email: 'data:',
            phone: 'data:',
            confirmed: Value.query('data.confirmed').as(confirmed => confirmed ? 'Да':'Нет'),
            created_at: 'data:',
            recent_activity: 'data:',
        },
        action: {
            select: function(event){
                if (this.selected) {
                    this.unselect();
                } else {
                    this.select();
                }
            }
        }
    },
});