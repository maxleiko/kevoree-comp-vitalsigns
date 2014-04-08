var jade = require('./runtime');

(function (jade) {
	module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<script src="./node_modules/kevoree-comp-vitalsigns/resources/js/Chart.min.js"></script><style>@import url(\'./node_modules/kevoree-comp-vitalsigns/resources/css/bootstrap.min.css\')\n</style><div class="container-fluid"><div class="row"><canvas id="chart" width="400" height="400"></canvas></div></div>');
}
return buf.join("");
};
})(jade);