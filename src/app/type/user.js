let entity = require('basis.entity');
const STATE = basis.require('basis.data').STATE;
let action = require('basis.net.action');
let wrap = require('basis.data').wrap;
let user = entity.createType('User', {
    id: entity.IntId,
    title: String,
});


user.all.setSyncAction(function () {
    this.setState(STATE.PROCESSING);
    setTimeout(function () {
        this.setAndDestroyRemoved(user.readList([{id:1, title:'email'}]));
        this.setState(STATE.READY);
    }.bind(this), 2500)

});
// user.all.setSyncAction(action.create({
//     url: 'http://localhost:8000/api/users',
//     contentType: 'application/json',
//     success: function(data) {
//         // this.set(wrap(data, true));
//                 this.setAndDestroyRemoved(user.readList(JSON.parse(data)));
//         //         this.setAndDestroyRemoved(user.readList([{id:1, name:'test', email:'email', sxs:'as'}]));
//     }
// }));

module.exports = user;
