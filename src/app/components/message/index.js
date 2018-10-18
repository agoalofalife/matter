const Node = require('basis.ui').Node;
const resolveValue = require('basis.data').resolveValue;

module.exports = Node.subclass({
    init:function () {
        Node.prototype.init.call(this);
        this.setActive(this.active);
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