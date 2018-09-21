var entity = require('basis.entity');
var STATE = basis.require('basis.data').STATE;

let user = entity.createType('User', {
    id: entity.IntId,
    email: String,
    name: String,
});


user.all.setSyncAction(function () {
    this.setState(STATE.PROCESSING);
    setTimeout(function () {
        this.setAndDestroyRemoved(user.readList([{id:1, name:'test', email:'email'}]));
        this.setState(STATE.READY);
    }.bind(this), 2500)

});

module.exports = user;
