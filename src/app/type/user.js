let entity = require('basis.entity');
const STATE = basis.require('basis.data').STATE;
let action = require('basis.net.action');
let fakeUsers = require('app.fakers.user');


let user = entity.createType('User', {
    id: entity.IntId,
    email: String,
    phone: String,
    confirmed: String,
    created_at:Date,
    recent_activity:Date,
});
user.extendReader(data => data.recent_activity = data.sign_in_at);

user.all.setSyncAction(function () {
    this.setState(STATE.PROCESSING);
    setTimeout(function () {
        this.setAndDestroyRemoved(user.readList(fakeUsers(1000)));
        this.setState(STATE.READY);
    }.bind(this), 900)
});

user.all.delete = function (deletedId) {
    this.setState(STATE.PROCESSING);
    setTimeout(function () {
        this.set(this.getValues('data').filter(function (user) {
            return user.id !== deletedId;
        }));
        this.setState(STATE.READY);
    }.bind(this), 400)
};
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
