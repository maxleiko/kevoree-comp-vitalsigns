var AbstractComponent = require('kevoree-entities').AbstractComponent,
    vitalsigns        = require('vitalsigns'),
    Chart             = require('./Chart'),
    view              = require('../generated-ui/view');

/**
 * Kevoree component
 * @type {VitalSigns}
 */
var VitalSigns = AbstractComponent.extend({
    toString: 'VitalSigns',

    /**
     * this method will be called by the Kevoree platform when your component has to start
     */
    start: function (_super) {
        _super.call(this);
        this.vitals = new vitalsigns({autoCheck: true});

        if (this.dic_cpu.value === true) {
            this.vitals.monitor('cpu');
        }

        if (this.dic_mem.value === true) {
            this.vitals.monitor('mem', {units: 'MB'});
        }

        if (this.dic_tick.value === true) {
            this.vitals.monitor('tick');
        }

        if (this.dic_uptime.value === true) {
            this.vitals.monitor('uptime');
        }

        this.setUIContent(view(), function (err, root) {
            if (err) {

            } else {
                var context = root.querySelector('#chart').getContext('2d');
                var chart = new Chart(context).Line({
                    labels : ["January","February","March","April","May","June","July"],
                    datasets : [
                        {
                            fillColor : "rgba(220,220,220,0.5)",
                            strokeColor : "rgba(220,220,220,1)",
                            pointColor : "rgba(220,220,220,1)",
                            pointStrokeColor : "#fff",
                            data : [65,59,90,81,56,55,40]
                        },
                        {
                            fillColor : "rgba(151,187,205,0.5)",
                            strokeColor : "rgba(151,187,205,1)",
                            pointColor : "rgba(151,187,205,1)",
                            pointStrokeColor : "#fff",
                            data : [28,48,40,19,96,27,100]
                        }
                    ]
                });

            }
        });
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     */
    stop: function (_super) {
        _super.call(this);
        if (this.vitals) {
            this.vitals.destroy();
        }
    },

    dic_cpu: {
        optional: false,
        defaultValue: true,
        update: function (oldVal) {
            if (oldVal === false && this.dic_cpu.value === true) {
                this.vitals.monitor('cpu');
            }
        }
    },

    dic_mem: {
        optional: false,
        defaultValue: true,
        update: function (oldVal) {
            if (oldVal === false && this.dic_mem.value === true) {
                this.vitals.monitor('mem', {units: 'MB'});
            }
        }
    },

    dic_tick: {
        optional: false,
        defaultValue: false,
        update: function (oldVal) {
            if (oldVal === false && this.dic_tick.value === true) {
                this.vitals.monitor('tick');
            }
        }
    },

    dic_uptime: {
        optional: false,
        defaultValue: false,
        update: function (oldVal) {
            if (oldVal === false && this.dic_uptime.value === true) {
                this.vitals.monitor('uptime');
            }
        }
    }
});

module.exports = VitalSigns;
