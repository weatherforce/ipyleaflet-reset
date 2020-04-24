import ipywidgets as widgets
from traitlets import Unicode, Bool, Tuple, Int

# See js/lib/reset.js for the frontend counterpart to this file.


@widgets.register
class Reset(widgets.DOMWidget):
    """A reset widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('ResetView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('ResetModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('ipyleaflet-reset').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('ipyleaflet-reset').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with
    # `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is
    # touched.
    value = Bool(False).tag(sync=True)
    center = Tuple((0, 0)).tag(sync=True)
    zoom = Int(2).tag(sync=True)
    position = Unicode("bottomleft").tag(sync=True)

    def __init__(self, center, zoom, ipyleaflet_map, *args,
                 position="bottomleft", **kwargs):
        super().__init__(*args, **kwargs)
        self.center = center
        self.zoom = zoom
        self.position = position
        self.ipyleaflet_map = ipyleaflet_map
        self.ipyleaflet_map.add_control(self)
        self.observe(self.on_value_change, names="value")

    def on_value_change(self, change):
        if change["new"]:
            self.ipyleaflet_map.zoom = self.zoom
            self.ipyleaflet_map.center = self.center
            self.value = False
