let entity = require('basis.entity');
const STATE = basis.require('basis.data').STATE;
let action = require('basis.net.action');
let wrap = require('basis.data').wrap;
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
        this.setAndDestroyRemoved(user.readList([
            {
                id:1,
                email:'af@gmail.com',
                phone:'+7 232 234 34 34',
                confirmed:true,
                created_at:'2018-19-08 18:40:06',
                sign_in_at:'2018-20-08 18:40:06'
            }
            ]));
        this.setState(STATE.READY);
    }.bind(this), 600)

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
