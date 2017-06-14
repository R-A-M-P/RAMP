//------ sections.js ------
// import $ from 'jquery';
// locate sections that can be scraped
// export let sectionsToBeScraped = 0;
export var sections = [];
export function findSections() {
	console.info( '"./checks/sections.js" loaded' );
	console.info( 'findSections() starting' );

	function foundSection( name ) {
		sections.push( name );
		console.log( name + ' section found. There are now ' + sections.length + ' section ready to be scraped.' );
	}

	function areTheyHere() {
		if ( $( '.pv-profile-section' ).length ) {
			foundSection( 'contact' );
		}
		if ( $( '.pv-top-card-section__summary' ).length ) {
			foundSection( 'summary' );
		}
		if ( $( '.experience-section' ).length ) {
			foundSection( 'experience' );
		}
		if ( $( '.education-section' ).length ) {
			foundSection( 'education' );
		}
		if ( $( '.pv-featured-skills-section' ).length ) {
			foundSection( 'skills' );
		}
		if ( $( '.pv-accomplishments-section' ).length ) {
			const self = $( '.pv-accomplishments-section' );
			if ( $( self ).find( 'section.languages' ).length ) {
				foundSection( 'languages' );
			}
			if ( $( self ).find( 'section.certifications' ).length ) {
				foundSection( 'certifications' );
			}
		}
	}

	function dropSections() {
		if ( sections.length ) {
			sections = [];
		}
	}

	function checkEm() {
		if ( sections.length ) {
			$.when( dropSections() ).done( function () {
				areTheyHere();
			} );
		} else {
			areTheyHere();
		}
	}
	$.when( checkEm() ).done( function () {
		if ( sections.length > 0 ) {
			console.log( sections );
			$( 'body' ).animate( {
				scrollTop: 0
			}, function () {
				//
			} );
		} else {
			console.warn( 'No sections found' );
		}
	} );
}
