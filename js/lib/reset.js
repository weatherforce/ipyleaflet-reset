var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var L = require('leaflet');
const ipyleaflet = require('jupyter-leaflet');


const reset_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH5AQJDRsoXdLqTQAAAz1JREFUOMutlF1sU2Ucxp9zzntGwynJGptgtrq5Jjrhwg0C2xLaeCHL5gbjjkEikIjjw8TxIYtcOCOYOL2Q6LxYu5qo86NtCGwrxAvcpdFkmRA2DQQSnCwZtutW1NGenvecPl6QLOsKqMRf8t68efJ/8j7Pm79yL2cSj0BKCSEEyPsyVVXxXxCappVcKooCTdPw08QExsbGsLOzE99dugSPx4PtHR0QQvxrA8W0ZNELVFWF0FREIp9iePg8Nm3ajJs3byAei2FLIIDEhYswDOPxDHRdwJI2Xjt0EFJaCAZfwGA4hNWGAcMwcDeTwfc//AhNua+3bGcpuoehLh+eSs2hvbUFfr8f9fUb0XPiDaxd+yQuXPwWmxsaMD4+jprqauzs7MTZc+egaRp0/R/iMi1Jy3b4y7XrDAQC/PDMGR46fJgA2NV1gA5J6RR469dphgcH2X3kKOvq6gmANTV+Do+O0rTkQw9MS3L69gy3be/gO6dOs62tjQD40cf9JLkktGyHy7l2/QZ37dpNXdd57Phx3kmmmJd2iYEKANlsFpqqQgiB2dlZVFRUoLKyEn8u3kPZsgjm5hdwJ5nCH38t4rnaZxCNfoNoLI4vh4Zw7OgR3M1kSr6xYlqSUlpIJBL4amgIT9f44XYb+KS/H23t29Db24v6uucxcfkKPni/DzMzM3C73fD5fGhsbELHjh1IJpNof6kVwWAQX0djKBQKxR3kpc1c3uLVySm+vGcPX9y6lcOjCTY2NPIJr5efff4FB0IhVvp8fK+vj2+ePMmWllZ6vV56PB6+2nWA8fhZrjYMvt7dXRQtVmZm2Q7DgxF6vV4OhMI8dfpdakLQcBusqqrm76k5Zs08F7M5ptJphiMRPlVVRZfLxWdra+lyuXh+ZGTJBA9qniSnf7vNLYEA9+7bx5HRBDds3MCmpiamFzJF2gJJU9p8q/dtlpeXEwDXrV/PVHqe0ik82MC0JKVTYIFkNBbn5NTPNC3J9PwCc3mrRJuXNkny6uQUm5ubWbZqFU/09JAkS1bFyp1UJjTYBAqOA0VRigtcga4LZLM5hEIDWONeg1f278cjDR4HRVEghAYp7eJV8X9Bcmk4APwN971dwEe+bKQAAAAASUVORK5CYII='


const buttonStyle = {
	backgroundColor: "#fff",
	border: '2px solid #eeeeee',
	borderRadius:'4px'
}
// See reset.py for the kernel counterpart to this file.


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.

export class ResetModel extends ipyleaflet.LeafletControlModel {
	defaults(){
		return{
			...super.defaults(),
			_model_name : 'ResetModel',
        	_view_name : 'ResetView',
        	_model_module : 'ipyleaflet-reset',
        	_view_module : 'ipyleaflet-reset',
        	_model_module_version : '0.1.0',
        	_view_module_version : '0.1.0',
			position: 'bottomright',
			value: false 
		}
	}
}

export class ResetView extends ipyleaflet.LeafletControlView{

	initialize(parameters){
		super.initialize(parameters);
		this.map_view = this.options.map_view;
	}

	changed(){
		this.addReset(this.model.get('position'))
	}

	render(){
		this.changed();
        this.model.on('change:value', this.changed, this);
	}

	clickHandler(e){
		this.model.set('value', true)
		this.model.save_changes()
	}
	
	onAdd(map){
		let jsResetName="leaflet-control-reset"
		let container = L.DomUtil.create('div', jsResetName)
		let button = document.createElement("button")
		let icon = document.createElement('img')
		button.value = "reset"
		icon.src = reset_icon
		button.onclick = this.clickHandler.bind(this)
		button.style = 'background-color: #fff; border: "2px solid #eee"; border-radius:2px; margin: 0; padding: 0;' 
		button.appendChild(icon)
		container.appendChild(button)
		return container

	}

	addReset(positionning){
		if(this.obj) this.obj.remove()
		let jsReset = L.control({position: positionning})
		let clickHandler = this.clickHandler
		jsReset.onAdd = this.onAdd.bind(this) 
		this.obj = jsReset
		this.obj.addTo(this.map_view.obj)
	}
}

