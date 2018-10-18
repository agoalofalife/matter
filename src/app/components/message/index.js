const Node = require('basis.ui').Node;
const resolveValue = require('basis.data').resolveValue;
const anim = require('basis.animation').FX.CSS;
const Thread = require('basis.animation').Thread;


module.exports = Node.subclass({
    init:function () {
        Node.prototype.init.call(this);
        this.setActive(this.active);

        this.amin = new Thread({
            duration:this.duration
        });
    },
    /**
     * Modal active flag.
     * @type {string}
     */
    active: '',
    activeRA_: null,

    /**
     * Set new active and update binding.
     * @param {string} active
     */
    setActive: function(active){
        active = resolveValue(this, this.setActive, active, 'activeRA_');

        if (this.active != active)
        {
            this.active = active;

            // for backward capability
            if (this.tmpl)
                this.updateBind('active');
        }
    },
    /**
     * Helper method
     */
    makeActive:function(){
        this.setActive(true);
        anim.FadeOut(this.amin, this.element);
        this.amin.start();
    },
    className:'message',
    template: resource('./templates/message.tmpl'),
    binding: {
        active:'active',
        title:'title',
        text:'text',
        type:'type'
    },
});