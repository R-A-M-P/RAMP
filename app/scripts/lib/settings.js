export let numSectionsScraped = 0;
export function incrSectionsScraped() {
	numSectionsScraped++;
}
export function decodeHtml( html ) {
	var txt = document.createElement( "textarea" );
	txt.innerHTML = html;
	return txt.value;
}
export function toDataUrl( url, callback, outputFormat ) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		var canvas = document.createElement( 'CANVAS' );
		var ctx = canvas.getContext( '2d' );
		var dataURL;
		canvas.height = this.height;
		canvas.width = this.width;
		ctx.drawImage( this, 0, 0 );
		dataURL = canvas.toDataURL( outputFormat );
		callback( dataURL );
		canvas = null;
	};
	img.src = url;
}
