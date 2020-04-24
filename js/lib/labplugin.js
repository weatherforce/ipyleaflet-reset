var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'ipyleaflet-reset',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'ipyleaflet-reset',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

