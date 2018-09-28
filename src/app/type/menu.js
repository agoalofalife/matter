let entity = require('basis.entity');
const STATE = basis.require('basis.data').STATE;
let action = require('basis.net.action');


var menu = entity.createType('Menu', { // тут более говорящее название задать
    id: entity.IntId,
    title: String,
    type:String,
    typeName:String,
    list: entity.createSetType('Menu-li')
});

var MenuLi = entity.createType('Menu-li', {
    name: String,
    url: String,
});


menu.all.setSyncAction(function () {
    this.setState(STATE.PROCESSING);
    setTimeout(function () {
        this.setAndDestroyRemoved(menu.readList([
        {
            id: 1,
            title:"Основное",
            type:null,
            typeName:'',
            list:[
                {name: 'Пользователи', url:'users'},
                {name: 'Роли', url:'roles'},
            ],
        },
            {
                id: 2,
                title:"Не основное",
                type:null,
                typeName:'',
                list:[
                    {name: 'Пользователи', url:'users'},
                    {name: 'Роли', url:'roles'},
                ],
            },
        ]));
        this.setState(STATE.READY);
    }.bind(this), 1000)

});


module.exports = menu;
