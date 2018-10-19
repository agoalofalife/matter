const Node = require('basis.ui').Node;
const anim = require('basis.animation').FX.CSS;
const Thread = require('basis.animation').Thread;


module.exports = new Node({
    // thread:null,
    /**
     * Helper method
     */
    makeActive:function(){
        this.update({active:true});

        let amin = new Thread({
            duration:this.data.duration
        });

        amin.FadeOut(this.amin, this.element);
        amin.start();
    },
    handler: {
        update: function(sender, delta){
           if (this.data.active === true) {
               // TODO each time a new object is created
               let amin = new Thread({
                   duration:this.data.duration
               });
               anim.FadeOut(amin, this.element);
               amin.start();
               this.data.active = false;
           }
        }
    },
    className:'message',
    template: resource('./templates/message.tmpl'),
    binding: {
        active:'data:',
        title:'data:',
        text:'data:',
        type:'data:'
    },
});