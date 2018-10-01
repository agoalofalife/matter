const Node = require('basis.ui').Node;
const resolveValue = require('basis.data').resolveValue;


module.exports = Node.subclass({
    className:'modal.confirmed',
    template: resource('./templates/modal_confirmed.tmpl'),
    binding: {
     active:'active'
    },
    action: {
        close: function(){
            if (!this.isDisabled())
                this.setActive(false);
        }
    },
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
});