//------ experience.js ------
import {
	sectionsToBeScraped,
	numSectionsScraped,
	incrSectionsScraped,
	decodeHtml,
	toDataUrl
} from '../lib/settings.js';
import { experience } from '../scrape/data.js';
// scrape experience
export function scrape() {
	console.log( './scrape/experience.js' );

	function fetchExperiences() {
		// console.warn('Could not fetch Experience data automaticly. Initiating manuall scraping...');
		$( '.experience-section' ).find( 'ul.pv-profile-section__section-info' ).find( 'li' ).each( function ( index ) {
			var $entry = $( this );
			// $(this).find('button.pv-profile-section__show-more-detail').click();
			var experienceTitle;
			var experienceCompanyName;
			var experienceDescription;
			var experienceLocation
			var experienceStartDate;
			var experienceEndDate;
			var experienceCurrent = 0;
			// setTimeout(function () {
			var $experienceDescription = $entry.find( '.pv-entity__description' );
			if ( $experienceDescription ) {
				experienceDescription = $experienceDescription.clone() //clone the element
					.children() //select all the children
					.remove() //remove all the children
					.end() //again go back to selected element
					.text();

				function myTrim( x ) {
					return x.replace( /^\s+|\s+$/gm, '' );
				}
				experienceDescription = myTrim( experienceDescription );
				experienceDescription = decodeHtml( experienceDescription );
				experienceDescription = experienceDescription.replace( /(<br>)+/g, '\n ' );
				if ( experienceDescription.trim() ) {
					// console.log(experienceDescription);
				}
			} else {
				console.log( 'No Experience description...' );
			}
			// }, 400);
			// setTimeout(function () {
			var $experienceTitle = $entry.find( '.pv-entity__summary-info > h3' );
			var $experienceCompanyName = $entry.find( '.pv-entity__summary-info > h4 > .pv-entity__secondary-title' );
			var $experienceLocation = $entry.find( '.pv-entity__summary-info > h4.pv-entity__location > span:not(.visually-hidden)' );
			var $experienceDateRange = $entry.find( '.pv-entity__summary-info > h4.pv-entity__date-range > span:not(.visually-hidden)' );
			if ( $experienceTitle ) {
				experienceTitle = $experienceTitle.text();
			}
			if ( $experienceCompanyName ) {
				experienceCompanyName = $experienceCompanyName.text();
			}
			if ( $experienceLocation ) {
				experienceLocation = $experienceLocation.text();
			}
			if ( $experienceDateRange ) {
				var experienceDateRange = $experienceDateRange.text();
				// console.log(experienceDateRange);
				$experienceDateRange.each( function ( index ) {
					if ( experienceDateRange.indexOf( ' – ' ) > -1 ) {
						var experienceDatesSplit = experienceDateRange.split( ' – ' );
					} else if ( experienceDateRange.indexOf( ' - ' ) > -1 ) {
						var experienceDatesSplit = experienceDateRange.split( ' - ' );
					}
					var experienceDateStart = experienceDatesSplit[ 0 ];
					var experienceDateEnd = experienceDatesSplit[ 1 ];
					// console.log(experienceDateStart);
					// console.log(experienceDateEnd);
					var experienceDates = [];
					experienceDates.push( experienceDateStart );
					experienceDates.push( experienceDateEnd );
					// console.log(experienceDates);
					// var experienceDateLength = 0;
					$.each( experienceDates, function ( index, value ) {
						// experienceDateLength++
						// console.log(index + ": " + $(this).text());
						// console.log('experienceDates ' + index + ': ' + value);
						// var experienceDate = $(this).text();
						var experienceDateSplit = value.split( ' ' );
						var experienceMonth = experienceDateSplit[ 0 ];
						var experienceYear = experienceDateSplit[ 1 ];

						function setExperienceMonth() {
							if ( experienceMonth === 'Jan' ) {
								experienceMonth = '01';
							} else if ( experienceMonth === 'Feb' ) {
								experienceMonth = '02';
							} else if ( experienceMonth === 'Mar' ) {
								experienceMonth = '03';
							} else if ( experienceMonth === 'Apr' ) {
								experienceMonth = '04';
							} else if ( experienceMonth === 'May' ) {
								experienceMonth = '05';
							} else if ( experienceMonth === 'Jun' ) {
								experienceMonth = '06';
							} else if ( experienceMonth === 'Jul' ) {
								experienceMonth = '07';
							} else if ( experienceMonth === 'Aug' ) {
								experienceMonth = '08';
							} else if ( experienceMonth === 'Sep' ) {
								experienceMonth = '09';
							} else if ( experienceMonth === 'Oct' ) {
								experienceMonth = '10';
							} else if ( experienceMonth === 'Nov' ) {
								experienceMonth = '11';
							} else if ( experienceMonth === 'Dec' ) {
								experienceMonth = '12';
							} else if ( experienceMonth === 'jan.' ) {
								experienceMonth = '01';
							} else if ( experienceMonth === 'feb.' ) {
								experienceMonth = '02';
							} else if ( experienceMonth === 'mar.' ) {
								experienceMonth = '03';
							} else if ( experienceMonth === 'apr.' ) {
								experienceMonth = '04';
							} else if ( experienceMonth === 'mai.' ) {
								experienceMonth = '05';
							} else if ( experienceMonth === 'jun.' ) {
								experienceMonth = '06';
							} else if ( experienceMonth === 'jul.' ) {
								experienceMonth = '07';
							} else if ( experienceMonth === 'aug.' ) {
								experienceMonth = '08';
							} else if ( experienceMonth === 'sep.' ) {
								experienceMonth = '09';
							} else if ( experienceMonth === 'okt.' ) {
								experienceMonth = '10';
							} else if ( experienceMonth === 'nov.' ) {
								experienceMonth = '11';
							} else if ( experienceMonth === 'des.' ) {
								experienceMonth = '12';
							} else {
								experienceMonth = '01';
							}
							if ( index === 0 ) {
								experienceStartDate = '01.' + experienceMonth + '.' + experienceYear;
							} else if ( index === 1 ) {
								experienceEndDate = '01.' + experienceMonth + '.' + experienceYear;
							}
						}
						if ( experienceMonth == 'Present' || value == 'nå' ) {
							experienceCurrent = 1;
							experienceEndDate = null;
						} else {
							if ( experienceYear === undefined ) {
								experienceMonth = '01';
								experienceYear = experienceDateSplit[ 0 ];
							}
							setExperienceMonth();
						}
					} );
				} );
			}
			experience.push( {
				title: experienceTitle,
				companyName: experienceCompanyName,
				location: experienceLocation,
				startDate: experienceStartDate,
				endDate: experienceEndDate,
				description: experienceDescription,
				current: experienceCurrent,
			} );
			// console.log(experience);
			// }, 500);
		} ).promise().done( function () {
			incrSectionsScraped();
			console.log( 'Experience section scraped. Total sections scraped is now ' + numSectionsScraped );
		} );
	}
	const sectionIntervalSpeed = 500;
	if ( $( '.experience-section' ).find( '.pv-profile-section__actions-inline' ).find( 'button.link' ).length ) {
		var setIntervalValue = 0;

		function startSetInterval() {
			var setIntervalAdd = setInterval( function () {
				if ( setIntervalValue < 25 ) {
					setIntervalValue++;
					if ( $( '.experience-section .pv-profile-section__actions-inline button' ).attr( 'aria-expanded' ) === 'false' ) {
						console.log( 'seeMoreExperienceButton clicked ' + setIntervalValue + ' times.' );
						$( '.experience-section .pv-profile-section__actions-inline button' ).click();
					} else if ( $( '.experience-section .pv-profile-section__actions-inline button' ).attr( 'aria-expanded' ) === 'true' ) {
						console.log( 'all positions showing' );
						clearInterval( setIntervalAdd );
						// sectionsScraped++;
						// console.log( 'Experience section scraped. Total sections scraped is now ', sectionsScraped + ' of ' + sectionsToBeScraped );
						fetchExperiences();
					}
				} else {
					console.log( 'setIntervalValue har reached it\'s limit' );
					clearInterval( setIntervalAdd );
				}
			}, sectionIntervalSpeed );
			setIntervalAdd;
		}
		startSetInterval();
	} else {
		fetchExperiences();
	}
}
export numSectionsScraped from '../lib/settings.js';
console.log( 'Experience section scraped. Total sections scraped is now ' + numSectionsScraped );
