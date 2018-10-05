const Node = require('basis.ui').Node;
const STATE = require('basis.data').STATE;
const Value = require('basis.data').Value;
const Expression = require('basis.data.value').Expression;
const Filter = require('basis.data.dataset').Filter;
const Slice = basis.require('basis.data.dataset').Slice;


let users = require('../../type.js').user;
let Preloader = require('../../ui/preloader/index');
let ModalConfirmed = require('../modal_confirmed/index');
let Paginator = basis.require('basis.ui.paginator').Paginator;
let searchedUser = new Value({ value: '' });
let currentDeleteUser = new Value({value:''});
let paginatorActivePage = new Value({ value:1});

const countItemsPage = 10;

let filtered = new Filter({
    source: users.all,
    rule: item =>  {
        return item.data.email.toLowerCase().indexOf(searchedUser.value.toLowerCase()) !== -1;
    }
});

let sliced = new Slice({
    source: filtered,
    rule: 'data.id',
    offset:countItemsPage,
    orderDesc: true,
    limit: countItemsPage
});

let Modal = new ModalConfirmed({
    question:'Вы уверены что хотите удалить?',
    yes:'Да',
    no:'Нет',
    confirmed: function (e) {
        filtered.source.delete(currentDeleteUser.value);
        this.notActive();
    }
});

searchedUser.link(null, () => filtered.applyRule());
// paginatorActivePage.link(null, () => sliced.applyRule());


module.exports = new Node({
    className:'dashboard.users',
    template: resource('./templates/users.tmpl'),
    active: true,
    selection: true,
    dataSource: sliced,
    satellite: {
        preloader: Preloader,
        modal:Modal,
        paginator: new Paginator({ 
            pageCount: Value.query(filtered, 'itemCount').as(count => count / countItemsPage),
            pageSpan: 10,
            activePage: 1,
            handler: {
                activePageChanged:function (e) {
                    paginatorActivePage.set(e.activePage);
                    sliced.setOffset(e.activePage * countItemsPage);
                    sliced.applyRule();
                }
            }
        }),
    },
    handler: {
        ownerChanged() {
            // data deprecate if owner exist after change
            if (this.owner) {
                // console.log(this.dataSource.source.source)
                this.dataSource.source.source.deprecate();
                // this.dataSource.source.deprecate();
            }
        }
    },
    binding: {
        loading: Value.query('dataSource.source.source.state').as(state => state == STATE.PROCESSING),
        isError:Value.query('dataSource.source.source.state').as(state => state == STATE.ERROR),
        isNotShow:node => new Expression(
            Value.query(node, 'dataSource.source.source.state'),
            Value.query(node, 'dataSource.itemCount'),
            (state, itemCount) => !itemCount || (state == STATE.PROCESSING || state == STATE.ERROR)),

        preloader: 'satellite:',
        modal: 'satellite:',
        paginator:'satellite:'
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
            deleted:function () {
                currentDeleteUser.set(this.data.id);
                Modal.makeActive();
            }
        }
    },
});