let entity = require('basis.entity');
const STATE = basis.require('basis.data').STATE;
let action = require('basis.net.action');
const service = require('app.service');

let user = entity.createType('Profile', {
    id: entity.IntId,
    email: String,
    token: String,
});


user.all.setSyncAction(action.create({
    url: 'http://localhost:8000/api/users',
    contentType: 'application/json',
    success: function(data) {
        // this.set(wrap(data, true));
                this.setAndDestroyRemoved(user.readList(JSON.parse(data)));
        //         this.setAndDestroyRemoved(user.readList([{id:1, name:'test', email:'email', sxs:'as'}]));
    }
}));

module.exports = user;
