const Node = require('basis.ui').Node;
const STATE = require('basis.data').STATE;
const Value = require('basis.data').Value;
const Expression = require('basis.data.value').Expression;
const Filter = require('basis.data.dataset').Filter;

let users = require('../../type.js').user;
let Preloader = require('../../ui/preloader/index');
let ModalConfirmed = require('../modal_confirmed/index');
let searchedUser = new Value({ value: '' });
let activeModal = new Value({value: false});

let filtered = new Filter({
    source: users.all,
    rule: item =>  {
        return item.data.email.toLowerCase().indexOf(searchedUser.value.toLowerCase()) !== -1;
    }
});
let Modal = new ModalConfirmed({
    active: activeModal,
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
        modal:Modal,
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
        loading: Value.query('dataSource.source.state').as(state => state == STATE.PROCESSING),
        isError:Value.query('dataSource.source.state').as(state => state == STATE.ERROR),
        isNotShow:node => new Expression(
            Value.query(node, 'dataSource.source.state'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount || (state == STATE.PROCESSING || state == STATE.ERROR)),

        preloader: 'satellite:',
        modal: 'satellite:',
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
            select: function(e){
                if (this.selected) {
                    this.unselect();
                } else {
                    this.select();
                }
            },
            delete:function (e) {
                activeModal.set(true);
            }
        }
    },
});