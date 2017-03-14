import $ from 'jquery';
import swal from 'sweetalert2';
import * as firebase from 'firebase/app';
import 'firebase/database';
import * as toastr from 'toastr';

console.log('RAMP loaded');

(function (window, document, $, undefined) {

	'use strict';

	window.RAMP = {};

	var candidateFirstName;
	var candidateLastName;
	var mobilePhone;
	var email;
	var twitter;
	var facebook;
	var web;
	var dob;
	var summary = [];
	var experience = [];
	var education = [];
	var skills = [];
	var certifications = [];
	var languages = [];
	var rmLanguageList = [{
			"languageId": 1,
			"languageName": "Afrikaans"
		},
		{
			"languageId": 2,
			"languageName": "Arabic"
		},
		{
			"languageId": 3,
			"languageName": "Bahasa Indonesia"
		},
		{
			"languageId": 4,
			"languageName": "Azeri"
		},
		{
			"languageId": 5,
			"languageName": "Belarusian"
		},
		{
			"languageId": 6,
			"languageName": "Bulgarian"
		},
		{
			"languageId": 7,
			"languageName": "Bosnian"
		},
		{
			"languageId": 8,
			"languageName": "Catalan"
		},
		{
			"languageId": 9,
			"languageName": "Czech"
		},
		{
			"languageId": 10,
			"languageName": "Welsh"
		},
		{
			"languageId": 11,
			"languageName": "Danish"
		},
		{
			"languageId": 12,
			"languageName": "German"
		},
		{
			"languageId": 13,
			"languageName": "Divehi"
		},
		{
			"languageId": 14,
			"languageName": "Greek"
		},
		{
			"languageId": 15,
			"languageName": "English"
		},
		{
			"languageId": 16,
			"languageName": "Esperanto"
		},
		{
			"languageId": 17,
			"languageName": "Spanish"
		},
		{
			"languageId": 18,
			"languageName": "Estonian"
		},
		{
			"languageId": 19,
			"languageName": "Basque"
		},
		{
			"languageId": 20,
			"languageName": "Farsi"
		},
		{
			"languageId": 21,
			"languageName": "Finnish"
		},
		{
			"languageId": 22,
			"languageName": "Faroese"
		},
		{
			"languageId": 23,
			"languageName": "French"
		},
		{
			"languageId": 24,
			"languageName": "Galician"
		},
		{
			"languageId": 25,
			"languageName": "Gujarati"
		},
		{
			"languageId": 26,
			"languageName": "Hebrew"
		},
		{
			"languageId": 27,
			"languageName": "Hindi"
		},
		{
			"languageId": 28,
			"languageName": "Croatian"
		},
		{
			"languageId": 29,
			"languageName": "Hungarian"
		},
		{
			"languageId": 30,
			"languageName": "Armenian"
		},
		{
			"languageId": 31,
			"languageName": "Indonesian"
		},
		{
			"languageId": 32,
			"languageName": "Icelandic"
		},
		{
			"languageId": 33,
			"languageName": "Italian"
		},
		{
			"languageId": 34,
			"languageName": "Japanese"
		},
		{
			"languageId": 35,
			"languageName": "Georgian"
		},
		{
			"languageId": 36,
			"languageName": "Kazakh"
		},
		{
			"languageId": 37,
			"languageName": "Kannada"
		},
		{
			"languageId": 38,
			"languageName": "Korean"
		},
		{
			"languageId": 39,
			"languageName": "Konkani"
		},
		{
			"languageId": 40,
			"languageName": "Kyrgyz"
		},
		{
			"languageId": 41,
			"languageName": "Lithuanian"
		},
		{
			"languageId": 42,
			"languageName": "Latvian"
		},
		{
			"languageId": 43,
			"languageName": "Maori"
		},
		{
			"languageId": 44,
			"languageName": "FYRO Macedonian"
		},
		{
			"languageId": 45,
			"languageName": "Mongolian"
		},
		{
			"languageId": 46,
			"languageName": "Marathi"
		},
		{
			"languageId": 47,
			"languageName": "Malay"
		},
		{
			"languageId": 48,
			"languageName": "Maltese"
		},
		{
			"languageId": 49,
			"languageName": "Norwegian"
		},
		{
			"languageId": 50,
			"languageName": "Slovenian"
		},
		{
			"languageId": 51,
			"languageName": "Dutch"
		},
		{
			"languageId": 52,
			"languageName": "Northern Sotho"
		},
		{
			"languageId": 53,
			"languageName": "Punjabi"
		},
		{
			"languageId": 54,
			"languageName": "Polish"
		},
		{
			"languageId": 55,
			"languageName": "Pashto"
		},
		{
			"languageId": 56,
			"languageName": "Portuguese"
		},
		{
			"languageId": 57,
			"languageName": "Quechua"
		},
		{
			"languageId": 58,
			"languageName": "Romanian"
		},
		{
			"languageId": 59,
			"languageName": "Russian"
		},
		{
			"languageId": 60,
			"languageName": "Sanskrit"
		},
		{
			"languageId": 61,
			"languageName": "Sami"
		},
		{
			"languageId": 62,
			"languageName": "Slovak"
		},
		{
			"languageId": 63,
			"languageName": "Albanian"
		},
		{
			"languageId": 64,
			"languageName": "Serbian"
		},
		{
			"languageId": 65,
			"languageName": "Swedish"
		},
		{
			"languageId": 66,
			"languageName": "Swahili"
		},
		{
			"languageId": 67,
			"languageName": "Syriac"
		},
		{
			"languageId": 68,
			"languageName": "Tamil"
		},
		{
			"languageId": 69,
			"languageName": "Telugu"
		},
		{
			"languageId": 70,
			"languageName": "Thai"
		},
		{
			"languageId": 71,
			"languageName": "Tagalog"
		},
		{
			"languageId": 72,
			"languageName": "Tswana"
		},
		{
			"languageId": 73,
			"languageName": "Turkish"
		},
		{
			"languageId": 74,
			"languageName": "Tatar"
		},
		{
			"languageId": 75,
			"languageName": "Tsonga"
		},
		{
			"languageId": 76,
			"languageName": "Ukrainian"
		},
		{
			"languageId": 77,
			"languageName": "Urdu"
		},
		{
			"languageId": 78,
			"languageName": "Uzbek"
		},
		{
			"languageId": 79,
			"languageName": "Vietnamese"
		},
		{
			"languageId": 80,
			"languageName": "Xhosa"
		},
		{
			"languageId": 81,
			"languageName": "Chinese"
		},
		{
			"languageId": 82,
			"languageName": "Zulu"
		},
		{
			"languageId": 85,
			"languageName": "Somali"
		},
		{
			"languageId": 86,
			"languageName": "Norsk tegnspråk"
		},
		{
			"languageId": 87,
			"languageName": "Philippine"
		},
		{
			"languageId": 88,
			"languageName": "Kurdish"
		},
		{
			"languageId": 89,
			"languageName": "Latin"
		},
		{
			"languageId": 90,
			"languageName": "Bengali"
		},
		{
			"languageId": 91,
			"languageName": "Amharic"
		},
		{
			"languageId": 92,
			"languageName": "Dari"
		},
		{
			"languageId": 93,
			"languageName": "Nepali"
		},
		{
			"languageId": 94,
			"languageName": "Kirundi"
		},
		{
			"languageId": 95,
			"languageName": "Chechen"
		},
		{
			"languageId": 96,
			"languageName": "Burmese"
		},
		{
			"languageId": 97,
			"languageName": "Tigrinya"
		},
		{
			"languageId": 98,
			"languageName": "Greenlandic"
		}
	];

	RAMP.init = function () {

		// developers can access this
		RAMP.genericCacheSelectors();
		RAMP.whereWeAt();
		RAMP.initFirebase();
		RAMP.startOver();
		// RAMP.inHotjar();
		// debugger;

	}

	var preferedLanguage = localStorage.getItem('preferedLanguage');
	console.log('Your prefered language is ' + preferedLanguage);

	RAMP.whatThatLanguage = function () {
		var i18nLocale = RAMP.i18nLocale;

		console.log(i18nLocale);

		function changeLanguage() {
			swal({
				type: 'info',
				title: 'RAMP currently supports English and Norwegian',
				text: 'Please select your preferd language.',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonText: 'English',
				confirmButtonColor: '#0084BF',
				showCancelButton: true,
				cancelButtonText: 'Norwegian',
				cancelButtonColor: '#0084BF'
			}).then(function (result) {
				// handle confirm, result is needed for modals with input
				preferedLanguage = 'en';
				localStorage.setItem('preferedLanguage', preferedLanguage);
				console.log('Your prefered language is ' + preferedLanguage);
				i18nLocale = preferedLanguage;
				location.reload();
			}, function (dismiss) {
				// dismiss can be "cancel" | "close" | "outside"
				preferedLanguage = 'no';
				localStorage.setItem('preferedLanguage', preferedLanguage);
				console.log('Your prefered language is ' + preferedLanguage);
				i18nLocale = preferedLanguage;
				location.reload();
			});
		}

		if (i18nLocale !== preferedLanguage) {

			console.log('i18nLocale is not the same as your prefered language: ' + i18nLocale + '/' + preferedLanguage);

			if (i18nLocale === 'no' || i18nLocale === 'en') {

				preferedLanguage = i18nLocale;
				localStorage.setItem('preferedLanguage', preferedLanguage);
				console.log('Your prefered language is i18nLocale: ' + preferedLanguage);

			} else if (preferedLanguage === null) {

				changeLanguage();

			}

		} else if (i18nLocale === 'no' || i18nLocale === 'en') {
			preferedLanguage = i18nLocale;
			localStorage.setItem('preferedLanguage', preferedLanguage);
			console.log('Your prefered language is i18nLocale: ' + preferedLanguage);
		}

		chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

			if (msg.action === 'change_language') {

				changeLanguage();

			}

		});

	}

	RAMP.initIn = function () {

		// var installType;

		chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

			if (msg.installType === 'development') {

				// installType = 'development';

				console.info('Running in Local Dev mode.');

				var epoch = (new Date).getTime();

				chrome.storage.sync.set({
					extension_state: 'activated',
					apiKey: '170112120136kedc2aa94ef6fa55d22ce634b04077e501350567785',
					plan: 'superAdmin',
					trial_started_at: epoch,
					corporation_id: 429,
					department_id: 1143,
					department_name: 'LinkedIn to RM',
					intercom_company_account_manager_id: 5465,
					intercom_company_account_manager_name: 'Christian Wick',
					intercom_company_account_manager_email: 'christian@recmanplugins.no',
					intercom_company_account_manager_phone: '+4792125512',
					intercom_employeee_id: 5465,
					intercom_employeee_name: 'Christian Wick',
					intercom_employeee_email: 'christian@recmanplugins.no',
					intercom_employeee_created_at: epoch

				}, function () {

					console.log('User data manually created for local Dev Env.');

				});

			}

		});

		// if (installType = 'development') {
		//
		// 	console.info('Running in Local Dev mode.');
		//
		// }

		// chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
		//
		//   if (msg.action === 'active_and_ready_to_reload') {
		//
		//     swal({
		//       type: 'success',
		//       title: 'Success!',
		//       text: 'Setup was successful and RAMP is ready!',
		//       confirmButtonText: 'Start using RAMP',
		//     }).then(function() {
		//       location.reload();
		//     })
		//
		//   }
		//
		// });

		// developers can access this
		RAMP.inCacheSelectors();
		RAMP.whatThatLanguage();
		// RAMP.whoThatMember();

		chrome.storage.sync.get(null, function (storrageResult) {

			var allKeys = Object.keys(storrageResult);

			console.log(allKeys);

			if (storrageResult.apiKey === undefined) {

				swal({
					type: 'warning',
					title: 'Oops!',
					text: 'Please complete setup to use RAMP.',
					allowOutsideClick: true,
					allowEscapeKey: true,
					reverseButtons: true,
					confirmButtonText: 'Go to RAMP Setup',
					confirmButtonColor: '#E74B3B',
					showCancelButton: true,
					cancelButtonText: 'Close'
				}).then(function () {
					// location.reload();
					window.open('https://setup.recmanplugins.no/', '"_blank');
				})

			} else {

				console.log('API Key: ' + storrageResult.apiKey);
				console.log('Corporation ID: ' + storrageResult.corporation_id);
				console.log('Department ID: ' + storrageResult.department_id);
				console.log('User ID: ' + storrageResult.intercom_employeee_id);
				console.log('Full name: ' + storrageResult.intercom_employeee_name);
				console.log('Email address: ' + storrageResult.intercom_employeee_email);
				console.log('Signup date: ' + storrageResult.intercom_employeee_created_at);

				// Save data to sessionStorage
				sessionStorage.setItem('sessionStorage_intercom_employeee_id', storrageResult.intercom_employeee_id);
				sessionStorage.setItem('sessionStorage_intercom_employeee_name', storrageResult.intercom_employeee_name);
				sessionStorage.setItem('sessionStorage_intercom_employeee_email', storrageResult.intercom_employeee_email);
				sessionStorage.setItem('sessionStorage_intercom_employeee_created_at', storrageResult.intercom_employeee_created_at);

				// var extension_state = 'activated';
				// var apiKey = result.apiKey;
				// var plan = result.plan;
				// var trial_started_at = result.trial_started_at;
				// var corporation_id = result.corporation_id;
				// var department_id = result.department_id;
				// var department_name = result.department_name;
				// var intercom_company_account_manager_id = result.intercom_company_account_manager_id;
				// var intercom_company_account_manager_name = result.intercom_company_account_manager_name;
				// var intercom_company_account_manager_email = result.intercom_company_account_manager_email;
				// var intercom_company_account_manager_phone = result.intercom_company_account_manager_phone;
				// var intercom_employeee_id = result.intercom_employeee_id;
				// var intercom_employeee_name = result.intercom_employeee_name;
				// var intercom_employeee_email = result.intercom_employeee_email;
				// var intercom_employeee_created_at = result.intercom_employeee_created_at;


				// If theres no activity for 1 second do something
				var activityTimeout = setTimeout(inActive, 500);

				function resetActive() {
					clearTimeout(activityTimeout);
				}

				// No activity do something.
				function inActive() {
					if ($('body:not(".ramp")')) {
						goGoGo();
					}
				}

				function removeInjectedByRamp() {
					$('body').find('.ramp').remove();

					// $('.ramp').each(function(i, obj) {
					//   $(this).remove();
					// });
				}

				$(function () {

					var should_i_init = false;

					if (window.location.href.indexOf('https://www.linkedin.com/in/unavailable/') > -1) {

						location.href = 'https://www.linkedin.com';

					} else if (window.location.href.indexOf('https://www.linkedin.com/in/') > -1) {

						chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

							if (msg.action === 'init') {

								should_i_init = true;

								if (should_i_init === true) {
									resetActive();
									if ($('body:not(".ramp")')) {
										goGoGo();
										// chrome.extension.sendMessage('showPageActionIn');
									}
								}

							}

						});
					}

				});

				function goGoGo() {

					removeInjectedByRamp();

					$('body').addClass('ramp');

					if (window.location.href.indexOf('https://www.linkedin.com/in/') > -1) {

						if ($('body').hasClass('ember-application')) {

							console.log('Loading RAMP for new LinkedIn Desktop - January 2017!');

							// $('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL('bower_components/sweetalert2/dist/sweetalert2.min.css') + '" integrity="sha256-PBR+4K2BiC67LZSWk+zxcpHo7sIgQBmc8q/n9e8vo+I=" crossorigin="anonymous" />');

							// console.clear();

							var i18nLocale = RAMP.i18nLocale;
							console.log(i18nLocale);


							var publicIdentifierPath = window.location.pathname;
							publicIdentifierPath = publicIdentifierPath.split('/in/');
							publicIdentifierPath = publicIdentifierPath[1];
							publicIdentifierPath = publicIdentifierPath.split('/');
							var publicIdentifier = publicIdentifierPath[0];
							var publicIdentifier = decodeURI(publicIdentifier);
							console.log(publicIdentifier);
							var codeObject = [];

							function getObjects(obj, key, val) {
								var objects = [];
								for (var i in obj) {
									if (!obj.hasOwnProperty(i)) continue;
									if (typeof obj[i] == 'object') {
										objects = objects.concat(getObjects(obj[i], key, val));
									} else
										//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
										if (i == key && obj[i] == val || i == key && val == '') { //
											objects.push(obj);
										} else if (obj[i] == val && key == '') {
										//only add if the object is not already in the array
										if (objects.lastIndexOf(obj) == -1) {
											objects.push(obj);
										}
									}
								}
								return objects;
							}

							function getValues(obj, key) {
								var objects = [];
								for (var i in obj) {
									if (!obj.hasOwnProperty(i)) continue;
									if (typeof obj[i] == 'object') {
										objects = objects.concat(getValues(obj[i], key));
									} else if (i == key) {
										objects.push(obj[i]);
									}
								}
								return objects;
							}
							$('code:contains("firstName"):contains("lastName"):contains("occupation"):contains("objectUrn"):contains(' + publicIdentifier + ')').each(function () {
								var inner = $(this).html();
								var code = $.parseJSON(inner);
								codeObject.push({
									code
								});
							}).promise().done(function () {
								var inMemberObject = getObjects(codeObject, 'publicIdentifier', publicIdentifier);
								inMemberObject = inMemberObject[0];
								if (inMemberObject === undefined) {
									console.error('Error fetching "inMemberObject"...');
									swal({
										title: 'Oops...',
										text: 'Something went wrong!',
										type: 'error',
										allowOutsideClick: false,
										allowEscapeKey: false,
										confirmButtonText: 'Click to reload page',
										timer: 5000
									}).then(
										function () {
											console.warn('Initializing page reloading...');
											location.reload();
										},
										function () {
											console.warn('Initializing page reloading...');
											location.reload();
										}
									)
								} else {
									console.log(inMemberObject);

									var candidateFirstName = inMemberObject.firstName;
									var candidateLastName = inMemberObject.lastName;
									// console.log(candidateFirstName);
									// console.log(candidateLastName);

									var inMemberObjectUrn = inMemberObject.objectUrn;
									inMemberObjectUrn = inMemberObjectUrn.split('urn:li:member:');
									var inMemberId = inMemberObjectUrn[1];
									console.log(inMemberId);

									$.getJSON(chrome.extension.getURL('_locales/' + preferedLanguage + '/messages.json'), function () {
											console.log('success');
										})
										.done(function (callback) {
											console.log(callback);
											console.log(callback.btnSendToRM.message);

											function addRampBanner() {
												var rampAdBannerH1 = '<h1>automagically</h1>';
												var rampAdBannerH2 = '<h2>[aw-tuh-maj-ik-lee]</h2>';
												var rampAdBannerH3 = '<h3>adverb</h3>';
												var rampAdBannerP = '<ol><li><p><strong>automatically;</strong> in a way that is hidden from or not understood by you, the user, and in that sense, apparently “magical”:</p>';
												var rampAdBannerSmall = '<cite>I use an extension that automagically adds candidates from LinkedIn to Recruitment Manager.</cite></li></ol>';
												$('<section id="ramp_info_section" class="ramp"></section>').insertAfter('.right-rail__info_container');
												$('#ramp_info_section').append('<h2 class="pv-profile-section__card-heading Sans-17px-black-85%">' + callback.dialog__text_plain__sidebar_section_title_tips.message + ' ' + callback.dialog__text_service__service_name_ramp.shortname + '</h2>');
												$('#ramp_info_section').append('<div class="ramp-ad-banner">' + rampAdBannerH1 + rampAdBannerH2 + rampAdBannerH3 + rampAdBannerP + rampAdBannerSmall + '</div>');
											}

											if (window.location.href === 'https://www.linkedin.com/in/iamchriswick/') {
												addRampBanner();
											} else if (window.location.href === 'https://www.linkedin.com/in/glennlindmark/') {
												addRampBanner();
											} else if (window.location.href === 'https://www.linkedin.com/in/larsvegardflo/') {
												addRampBanner();
											} else if (window.location.href === 'https://www.linkedin.com/in/finnmartinsen/') {
												addRampBanner();
											}

											$('<button id="send_to_rm" class="connect primary top-card-action ember-view ramp" disabled><span class="default-text">' + callback.btnSendToRM.message + '</span></button>').appendTo('.pv-top-card-section__actions');

											var linkedInProfileId = inMemberId;
											// // console.log(linkedInProfileId);
											//
											var top_card = '%2C' + 'top_card';
											// var profile_v2_summary_upsell = '%2C' + 'profile_v2_summary_upsell';
											// var profile_v2_megaphone_marquee = '%2C' + 'profile_v2_megaphone_marquee';

											var profile_v2_summary = '%2C' + 'profile_v2_summary';
											var profile_v2_educations = '%2C' + 'profile_v2_educations';
											var profile_v2_positions = '%2C' + 'profile_v2_positions';
											var profile_v2_volunteering = '%2C' + 'profile_v2_volunteering';
											var profile_v2_languages = '%2C' + 'profile_v2_languages';
											var profile_v2_skills = '%2C' + 'profile_v2_skills';
											var profile_v2_certifications = '%2C' + 'profile_v2_certifications';
											var profile_v2_patents = '%2C' + 'profile_v2_patents';
											var profile_v2_publications = '%2C' + 'profile_v2_publications';
											var profile_v2_honors = '%2C' + 'profile_v2_honors';
											var profile_v2_test_scores = '%2C' + 'profile_v2_test_scores';
											var profile_v2_organizations = '%2C' + 'profile_v2_organizations';
											var profile_v2_courses = '%2C' + 'profile_v2_courses';
											var profile_v2_projects = '%2C' + 'profile_v2_projects';
											var profile_v2_endorsements = '%2C' + 'profile_v2_endorsements';

											var linkedInProfileData = top_card + profile_v2_summary + profile_v2_educations + profile_v2_positions + profile_v2_volunteering + profile_v2_languages + profile_v2_skills + profile_v2_certifications + profile_v2_patents + profile_v2_publications + profile_v2_honors + profile_v2_test_scores + profile_v2_organizations + profile_v2_courses + profile_v2_projects + profile_v2_endorsements;

											// console.log(linkedInProfileData);

											$.getJSON('//www.linkedin.com/profile/mappers?id=' + linkedInProfileId + '&promoId=&snapshotID=&primaryAction=&authToken=vCzw&locale=en_US&x-a=' + linkedInProfileData, function () {
													console.log('SUCCESS: LinkedIn profile data loaded');
												}).done(function (json) {

													// var descriptionRegex = '/<br\s*[\/]?>/gi';
													// var htmlEntetiesRegex = '/&#([0-9]{1,3});/gi';

													// function parseHtmlEnteties(str) {
													// 	return str.replace(htmlEntetiesRegex, function (match, numStr) {
													// 		var num = parseInt(numStr, 10); // read num as normal number
													// 		return String.fromCharCode(num);
													// 	});
													// }

													function decodeHtml(html) {
														var txt = document.createElement("textarea");
														txt.innerHTML = html;
														return txt.value;
													}

													console.log(json);

													/**
													 * Get and push Experiences.
													 */

													// var experience = [];

													RAMP.scrapeExperiences = function () {

														if ('li.position-entity') {

															console.warn('Could not fetch Experience data automaticly. Initiating manuall scraping...');

															$('li.position-entity').each(function (index) {

																var $entry = $(this);

																// $(this).find('button.pv-profile-section__show-more-detail').click();

																var $showMoreButton = $(this).find('button.pv-profile-section__show-more-detail');

																if ($showMoreButton) {

																	$showMoreButton.click();

																	setTimeout(function () {

																		var experienceTitle;
																		var experienceCompanyName;
																		var experienceDescription;
																		var experienceStartDate;
																		var experienceEndDate;

																		var $experienceTitle = $entry.find('.pv-entity__summary-info > h3');
																		var $experienceCompanyName = $entry.find('.pv-entity__summary-info > h4 > .pv-entity__secondary-title');
																		var $experienceDescription = $entry.find('.pv-entity__description');
																		var $experienceDateRange = $entry.find('.pv-entity__date-range');

																		var current = 0;

																		if ($experienceTitle) {

																			experienceTitle = $experienceTitle.text();

																		}

																		if ($experienceCompanyName) {

																			experienceCompanyName = $experienceCompanyName.text();

																		}

																		if ($experienceDescription) {

																			experienceDescription = $experienceDescription
																				.clone() //clone the element
																				.children() //select all the children
																				.remove() //remove all the children
																				.end() //again go back to selected element
																				.text();

																			function myTrim(x) {
																				return x.replace(/^\s+|\s+$/gm, '');
																			}

																			experienceDescription = myTrim(experienceDescription);
																			experienceDescription = decodeHtml(experienceDescription);
																			experienceDescription = experienceDescription.replace(/(<br>)+/g, '\n ');

																			// console.log(experienceDescription);

																		}

																		if ($experienceDateRange) {

																			$experienceDateRange.each(function (index) {

																				var $experienceDates = $experienceDateRange.find('time');

																				var experienceDateLength = 0;

																				$experienceDates.each(function (index) {

																					experienceDateLength++

																					// console.log(index + ": " + $(this).text());

																					var experienceDate = $(this).text();

																					var experienceDateSplit = experienceDate.split(' ');
																					var experienceMonth = experienceDateSplit[0];
																					var experienceYear = experienceDateSplit[1];

																					if (experienceMonth === 'Jan') {

																						experienceMonth = '01';

																					} else if (experienceMonth === 'Feb') {

																						experienceMonth = '02';

																					} else if (experienceMonth === 'Mar') {

																						experienceMonth = '03';

																					} else if (experienceMonth === 'Apr') {

																						experienceMonth = '04';

																					} else if (experienceMonth === 'May') {

																						experienceMonth = '05';

																					} else if (experienceMonth === 'Jun') {

																						experienceMonth = '06';

																					} else if (experienceMonth === 'Jul') {

																						experienceMonth = '07';

																					} else if (experienceMonth === 'Aug') {

																						experienceMonth = '08';

																					} else if (experienceMonth === 'Sep') {

																						experienceMonth = '09';

																					} else if (experienceMonth === 'Oct') {

																						experienceMonth = '10';

																					} else if (experienceMonth === 'Nov') {

																						experienceMonth = '11';

																					} else if (experienceMonth === 'Dec') {

																						experienceMonth = '12';

																					} else if (experienceMonth === 'jan.') {

																						experienceMonth = '01';

																					} else if (experienceMonth === 'feb.') {

																						experienceMonth = '02';

																					} else if (experienceMonth === 'mar.') {

																						experienceMonth = '03';

																					} else if (experienceMonth === 'apr.') {

																						experienceMonth = '04';

																					} else if (experienceMonth === 'mai.') {

																						experienceMonth = '05';

																					} else if (experienceMonth === 'jun.') {

																						experienceMonth = '06';

																					} else if (experienceMonth === 'jul.') {

																						experienceMonth = '07';

																					} else if (experienceMonth === 'aug.') {

																						experienceMonth = '08';

																					} else if (experienceMonth === 'sep.') {

																						experienceMonth = '09';

																					} else if (experienceMonth === 'okt.') {

																						experienceMonth = '10';

																					} else if (experienceMonth === 'nov.') {

																						experienceMonth = '11';

																					} else if (experienceMonth === 'des.') {

																						experienceMonth = '12';

																					}

																					if (index === 0) {

																						experienceStartDate = '01.' + experienceMonth + '.' + experienceYear;

																					} else if (index === 1) {

																						experienceEndDate = '01.' + experienceMonth + '.' + experienceYear;

																					}

																				});

																				// console.log(experienceDateLength);

																				if (experienceDateLength === 1) {

																					current = 1;


																				} else if (experienceDateLength === 2) {

																					current = 0;

																				}

																			});

																		}

																		experience.push({
																			title: experienceTitle,
																			companyName: experienceCompanyName,
																			// location: location,
																			startDate: experienceStartDate,
																			endDate: experienceEndDate,
																			description: experienceDescription,
																			current: current,
																		});

																		// console.log(experience);

																	}, 500);

																}

															});

														} else {

															console.warn('Sorry, no Experience to scrape...');

														}

													}

													if (json.content.Experience.positionsMpr.positions) {

														$.each(json.content.Experience.positionsMpr.positions, function (key, value) {

															var companyName = value.companyName;
															var title = value.title;
															var location = value.fmt_location;
															var description = value.summary_lb;
															var current = 1;

															if (value.hasOwnProperty('summary_lb')) {
																description = decodeHtml(description);
																description = description.replace(/(<br>)+/g, '\n');
															}

															if (value.startDate) {
																if (value.startDate.isMonthDefined === true) {
																	var startdate_iso = value.startdate_iso.split('-');
																	var startDate = startdate_iso[2] + '.' + startdate_iso[1] + '.' + startdate_iso[0];
																} else {
																	var startDate = '01.01.' + value.startDate.year;
																}
															}

															if (value.endDate) {
																if (value.enddate_iso === undefined) {
																	current = 1;
																} else {
																	current = 0;
																	if (value.endDate.isMonthDefined === true) {
																		var enddate_iso = value.enddate_iso.split('-');
																		var endDate = enddate_iso[2] + '.' + enddate_iso[1] + '.' + enddate_iso[0];
																	} else {
																		var endDate = '01.01.' + value.endDate.year;
																	}
																}
															}

															experience.push({
																companyName: companyName,
																title: title,
																location: location,
																startDate: startDate,
																endDate: endDate,
																description: description,
																current: current,
															})

														});

														// console.log(experience);

													} else if (json.content.TopCard && json.content.TopCard.positionsMpr) {

														if (json.content.TopCard.positionsMpr.positions) {

															$.each(json.content.TopCard.positionsMpr.positions, function (key, value) {

																var companyName = value.companyName;
																var title = value.title;
																var location = value.locationName;
																var current = 1;

																if (value.startDate) {
																	if (value.startDate.isMonthDefined === true) {
																		var startDate = '01' + '.' + value.startDate.month + '.' + value.startDate.year;
																	} else {
																		var startDate = '01.01.' + value.startDate.year;
																	}
																}

																if (value.endDate) {
																	if (value.endDate.year === undefined) {
																		current = 1;
																	} else {
																		current = 0;
																		if (value.endDate.isMonthDefined === true) {
																			var endDate = '01' + '.' + value.endDate.month + '.' + value.endDate.year;
																		} else {
																			var endDate = '01.01.' + value.endDate.year;
																		}
																	}
																}

																experience.push({
																	companyName: companyName,
																	title: title,
																	location: location,
																	startDate: startDate,
																	endDate: endDate,
																	current: current,
																})

															});


														} else {

															RAMP.scrapeExperiences();

														}

													} else {

														RAMP.scrapeExperiences();

													}

													// console.log(experience);

													/**
													 * Get and push Educations.
													 */

													if (json.content.Education.educationsMpr.educations) {

														$.each(json.content.Education.educationsMpr.educations, function (key, value) {

															var schoolName = value.schoolName;
															var eudcationType = value.fieldOfStudy;
															var degree = value.degree;
															var description = value.summary_lb;

															// console.log(eudcationType);

															if (value.hasOwnProperty('summary_lb')) {
																description = decodeHtml(description);
																description = description.replace(/(<br>)+/g, '\n');
															}

															if (value.hasOwnProperty('startDate') && value.startDate.isMonthDefined === true) {
																var startDate = '15.' + value.startDate.month + '.' + value.startDate.year;
															} else if (value.hasOwnProperty('startDate')) {
																var startDate = '15.08.' + value.startDate.year;
															}

															if (value.hasOwnProperty('endDate') && value.endDate.isMonthDefined === true) {
																var endDate = '15.' + value.endDate.month + '.' + value.endDate.year;
															} else if (value.hasOwnProperty('endDate')) {
																var endDate = '15.06.' + value.endDate.year;
															}

															education.push({
																schoolName: schoolName,
																eudcationType: eudcationType,
																degree: degree,
																startDate: startDate,
																endDate: endDate,
																description: description,
															})

														});

													} else if (json.content.Education.educationsMpr.topEducations) {

														$.each(json.content.Education.educationsMpr.topEducations, function (key, value) {

															var schoolName = value.schoolName;
															var eudcationType = value.fieldOfStudy;
															var degree = value.degree;
															var current = 1;

															if (value.startDate) {
																if (value.startDate.isMonthDefined === true) {
																	var startDate = '15' + '.' + value.startDate.month + '.' + value.startDate.year;
																} else {
																	var startDate = '15.08.' + value.startDate.year;
																}
															}

															if (value.endDate) {
																if (value.endDate.year === undefined) {
																	current = 1;
																} else {
																	current = 0;
																	if (value.endDate.isMonthDefined === true) {
																		var endDate = '15' + '.' + value.endDate.month + '.' + value.endDate.year;
																	} else {
																		var endDate = '15.06.' + value.endDate.year;
																	}
																}
															}

															education.push({
																schoolName: schoolName,
																eudcationType: eudcationType,
																degree: degree,
																startDate: startDate,
																endDate: endDate,
															})

														});

														if (json.content.Education.educationsMpr.moreEducations) {

															$.each(json.content.Education.educationsMpr.moreEducations, function (key, value) {

																var schoolName = value.schoolName;
																var eudcationType = value.fieldOfStudy;
																var degree = value.degree;
																var current = 1;

																if (value.startDate) {
																	if (value.startDate.isMonthDefined === true) {
																		var startDate = '15' + '.' + value.startDate.month + '.' + value.startDate.year;
																	} else {
																		var startDate = '15.08.' + value.startDate.year;
																	}
																}

																if (value.endDate) {
																	if (value.endDate.year === undefined) {
																		current = 1;
																	} else {
																		current = 0;
																		if (value.endDate.isMonthDefined === true) {
																			var endDate = '15' + '.' + value.endDate.month + '.' + value.endDate.year;
																		} else {
																			var endDate = '15.06.' + value.endDate.year;
																		}
																	}
																}

																education.push({
																	schoolName: schoolName,
																	eudcationType: eudcationType,
																	degree: degree,
																	startDate: startDate,
																	endDate: endDate,
																})

															});

														}


													} else if (json.content.TopCard && json.content.TopCard.educationsMpr) {

														if (json.content.TopCard.educationsMpr.educations) {

															$.each(json.content.TopCard.educationsMpr.educations, function (key, value) {

																var schoolName = value.schoolName;
																var eudcationType = value.fieldOfStudy;
																var degree = value.degree;
																var current = 1;

																if (value.startDate) {
																	if (value.startDate.isMonthDefined === true) {
																		var startDate = '15' + '.' + value.startDate.month + '.' + value.startDate.year;
																	} else {
																		var startDate = '15.08.' + value.startDate.year;
																	}
																}

																if (value.endDate) {
																	if (value.endDate.year === undefined) {
																		current = 1;
																	} else {
																		current = 0;
																		if (value.endDate.isMonthDefined === true) {
																			var endDate = '15' + '.' + value.endDate.month + '.' + value.endDate.year;
																		} else {
																			var endDate = '15.06.' + value.endDate.year;
																		}
																	}
																}

																education.push({
																	schoolName: schoolName,
																	eudcationType: eudcationType,
																	degree: degree,
																	startDate: startDate,
																	endDate: endDate,
																})

															});


														} else if (json.content.TopCard.educationsMpr.topEducations) {

															$.each(json.content.TopCard.educationsMpr.topEducations, function (key, value) {

																var schoolName = value.schoolName;
																var eudcationType = value.fieldOfStudy;
																var degree = value.degree;
																var current = 1;

																if (value.startDate) {
																	if (value.startDate.isMonthDefined === true) {
																		var startDate = '15' + '.' + value.startDate.month + '.' + value.startDate.year;
																	} else {
																		var startDate = '15.08.' + value.startDate.year;
																	}
																}

																if (value.endDate) {
																	if (value.endDate.year === undefined) {
																		current = 1;
																	} else {
																		current = 0;
																		if (value.endDate.isMonthDefined === true) {
																			var endDate = '15' + '.' + value.endDate.month + '.' + value.endDate.year;
																		} else {
																			var endDate = '15.06.' + value.endDate.year;
																		}
																	}
																}

																education.push({
																	schoolName: schoolName,
																	eudcationType: eudcationType,
																	degree: degree,
																	startDate: startDate,
																	endDate: endDate,
																})

															});

															if (json.content.TopCard.educationsMpr.moreEducations) {

																$.each(json.content.TopCard.educationsMpr.moreEducations, function (key, value) {

																	var schoolName = value.schoolName;
																	var eudcationType = value.fieldOfStudy;
																	var degree = value.degree;
																	var current = 1;

																	if (value.startDate) {
																		if (value.startDate.isMonthDefined === true) {
																			var startDate = '15' + '.' + value.startDate.month + '.' + value.startDate.year;
																		} else {
																			var startDate = '15.08.' + value.startDate.year;
																		}
																	}

																	if (value.endDate) {
																		if (value.endDate.year === undefined) {
																			current = 1;
																		} else {
																			current = 0;
																			if (value.endDate.isMonthDefined === true) {
																				var endDate = '15' + '.' + value.endDate.month + '.' + value.endDate.year;
																			} else {
																				var endDate = '15.06.' + value.endDate.year;
																			}
																		}
																	}

																	education.push({
																		schoolName: schoolName,
																		educationType: educationType,
																		degree: degree,
																		startDate: startDate,
																		endDate: endDate,
																	})

																});

															}

														} else {

															// RAMP.scrapeEducation();

														}

													} else {

														// RAMP.scrapeEducation();

													}

													// console.log(education);

													if (json.content.TopCard) {

														if (json.content.TopCard.contact_info.hasOwnProperty('phones')) {
															mobilePhone = json.content.TopCard.contact_info.phones[0].number;
														}

														if (json.content.TopCard.contact_info.emails) {

															$.each(json.content.TopCard.contact_info.emails, function (i, item) {

																if (item.email.indexOf('facebook.com') >= 0) {

																	facebook = item.email;

																	facebook = facebook.split('@');

																	facebook = 'https://www.facebook.com/' + facebook[0];

																} else {

																	email = item.email;

																}

															});

														}

														if (json.content.TopCard.contact_info.hasOwnProperty('twitterAccounts')) {
															twitter = 'https://twitter.com/' + json.content.TopCard.contact_info.twitterAccounts[0].twitterHandle;
														}

														if (json.content.TopCard.contact_info.hasOwnProperty('websites')) {
															web = json.content.TopCard.contact_info.websites[0].URL;
														}

														if (json.content.TopCard.additional_info.hasAdditionalInfo === true) {
															var additional_info = json.content.TopCard.additional_info;
															dob = additional_info.birthDay + '.' + additional_info.birthMonth + '.' + additional_info.birthYear;
														}
													}

													if (window.location.href.indexOf('https://www.linkedin.com/') > -1) {

														var notes = callback.dialog__text_plain__imported_from_message_generic.message + ' LinkedIn'

													} else if (window.location.href.indexOf('https://www.nav.no/') > -1) {

														var notes = callback.dialog__text_plain__imported_from_message_generic.message + ' NAV.no'

													} else if (window.location.href.indexOf('https://m.finn.no/') > -1) {

														var notes = callback.dialog__text_plain__imported_from_message_generic.message + ' Finn.no'

													}

													// var skills = [];

													if (json.content.Skills) {
														$.each(json.content.Skills.skillsMpr.skills, function (key, value) {

															// var name = value.fmt__skill_name;

															skills.push({
																'name': value.fmt__skill_name,
																'rating': 0
															})

														});

														// console.log(skills);
													}

													// var summary;

													RAMP.scrapeSummary = function () {

														// swal({
														// 	type: 'info',
														// 	title: 'Notice!',
														// 	html: 'This profile might be missing some relevant information like <b>Periods on Experience and Education</b> objects when sendt to Recruitment Manager.'
														// });

														if ('.pv-top-card-section__summary') {

															console.warn('Could not fetch Summary data automaticly. Initiating manuall scraping...');

															$('.pv-top-card-section__summary').find('button.truncate-multiline--button').click();

															setTimeout(function () {

																var summaryText = $('p.pv-top-card-section__summary')
																	.clone() //clone the element
																	.children() //select all the children
																	.remove() //remove all the children
																	.end() //again go back to selected element
																	.text();

																function myTrim(x) {
																	return x.replace(/^\s+|\s+$/gm, '');
																}

																summaryText = myTrim(summaryText);

																summaryText = decodeHtml(summaryText);
																summaryText = summaryText.replace(/(<br>)+/g, '\n');

																summary.push(summaryText);

																// console.log(summary);

															}, 500);

														}

													}

													if (json.content.Summary) {

														if (json.content.Summary.summary.hasOwnProperty('summary_lb')) {

															var summaryText = json.content.Summary.summary.summary_lb;
															summaryText = decodeHtml(summaryText);
															summaryText = summaryText.replace(/(<br>)+/g, '\n');

															summary.push(summaryText);

														} else {

															RAMP.scrapeSummary();

														}

													} else {

														RAMP.scrapeSummary();

													}

													if (json.content.Languages.languages.languagesData) {

														var proficiency;

														$.each(json.content.Languages.languages.languagesData, function (key, value) {

															if (value.proficiencyData && value.proficiencyData === 'elementary') {

																proficiency = 'elementary';

															} else if (value.proficiencyData && value.proficiencyData === 'limited_working') {

																proficiency = 'limitedWorking';

															} else if (value.proficiencyData && value.proficiencyData === 'professional_working') {

																proficiency = 'professionalWorking';

															} else if (value.proficiencyData && value.proficiencyData === 'full_professional') {

																proficiency = 'fullProfessional';

															} else if (value.proficiencyData && value.proficiencyData === 'native_or_bilingual') {

																proficiency = 'navtiveOrBilingual';

															}

															$.each(rmLanguageList, function (k, v) {

																if (value.proficiencyData && value.lang === v.languageName) {

																	languages.push({
																		languageId: v.languageId,
																		proficiency: proficiency
																	});

																} else if (value.lang === v.languageName) {

																	// console.log(v.languageId);
																	// console.log(v.languageName);

																	languages.push({
																		languageId: v.languageId,
																		proficiency: 'elementary'
																	});

																}

															});

														});

													}

													if (json.content.Courses && json.content.Courses.courses_by_occupation && json.content.Courses.courses_by_occupation.occupationsCourses) {

														$.each(json.content.Courses.courses_by_occupation.occupationsCourses, function (key, value) {

															if (value.courses) {

																$.each(value.courses, function (k, v) {

																	certifications.push({
																		name: v.name
																	});

																});

															}

														});

													}

													if (json.content.Certifications.certsMpr.certifications) {

														$.each(json.content.Certifications.certsMpr.certifications, function (key, value) {

															certifications.push({
																name: value.certificationName
															});

														});

													}

													if (json.content.TopCard) {

														if (json.content.TopCard.picture.pictureID === undefined) {
															var imageUrl = json.content.TopCard.img_blank_200;
															var profileImageExtension = 'png';
															// console.log(imageUrl);
														} else {
															var imageUrl = '//media.licdn.com/mpr/mpr' + json.content.TopCard.picture.pictureID;
															var profileImageExtension = 'jpg';
															// console.log(imageUrl);
														}

														if (json.content.Experience === undefined && json.content.TopCard.positionsMpr.positions === undefined && json.content.Education === undefined && json.content.TopCard.educationsMpr.educations === undefined) {

															swal({
																type: 'info',
																title: 'Notice!',
																html: 'This profile might be missing some relevant information like <b>Job Title</b> on Experience objects and <b>Description</b> and <b>Periods on Experience and Education</b> objects when sendt to Recruitment Manager.'
															})

														} else if (json.content.Experience === undefined && json.content.TopCard.positionsMpr.positions === undefined && json.content.Education !== undefined && json.content.TopCard.educationsMpr.educations !== undefined) {

															swal({
																type: 'info',
																title: 'Notice!',
																html: 'This profile might be missing some relevant information like <b>Job Title</b>, <b>Job Description</b> and <b>Job Period</b> on objects when sendt to Recruitment Manager.'
															})

														} else if (json.content.Experience !== undefined && json.content.TopCard.positionsMpr.positions === undefined && json.content.Education !== undefined && json.content.TopCard.educationsMpr.educations !== undefined) {

															swal({
																type: 'info',
																title: 'Notice!',
																html: 'This profile might be missing some relevant information like <b>Education Periods</b> on objects when sendt to Recruitment Manager.'
															})

														}

													} else {

														swal({
															type: 'warning',
															title: 'We\'re sorry!',
															confirmButtonText: 'Connect',
															html: 'This profile is missing most of the content that makes sending it to Recrutment Manager worthwhile.<br><br>You could try to connect with <b>' + inMemberObject.firstName + ' ' + inMemberObject.lastName + '</b> to see if they are using a <a href="https://www.linkedin.com/help/linkedin/answer/77" target="_blank">limited public profile</a>, as this could be the reason for the lack of information available.<br><br><i>We are currently in the process of investigating alternative methods to gather information from limited profiles.</i>',
															showCancelButton: true,
															reverseButtons: true,
															cancelButtonText: 'Close'
														}).then(function () {
															setTimeout(function () {
																$('.pv-top-card-section__actions button.connect').click();
															}, 300);

														})

													}

													function toDataUrl(url, callback, outputFormat) {
														var img = new Image();
														img.crossOrigin = 'Anonymous';
														img.onload = function () {
															var canvas = document.createElement('CANVAS');
															var ctx = canvas.getContext('2d');
															var dataURL;
															canvas.height = this.height;
															canvas.width = this.width;
															ctx.drawImage(this, 0, 0);
															dataURL = canvas.toDataURL(outputFormat);
															callback(dataURL);
															canvas = null;
														};
														img.src = url;
													}

													toDataUrl(imageUrl, function (base64Img) {
														var base64ImgSplit = base64Img.split(',');
														base64Img = base64ImgSplit[1];

														chrome.storage.local.set({
															'base64Img': base64Img
														}, function () {
															// Notify that we saved.

															chrome.storage.local.get('base64Img', function (result) {
																console.log(result);

																var profilePicture = {
																	'extension': profileImageExtension,
																	'base64': result.base64Img
																};

																// var candidateData = {
																// 	'key': storrageResult.apiKey,
																// 	'scope': 'candidate',
																// 	'operation': 'insert',
																// 	'data': {
																// 		// 'corporationId': 2,
																// 		'corporationId': storrageResult.corporation_id,
																// 		'connectDepartment': [storrageResult.department_id],
																// 		'connectUser': [storrageResult.intercom_employeee_id],
																// 		'firstName': candidateFirstName,
																// 		'lastName': candidateLastName,
																// 		'title': json.content.TopCard.basic_info.memberHeadline,
																// 		'mobilePhone': mobilePhone,
																// 		'email': email,
																// 		'twitter': twitter,
																// 		'web': web,
																// 		'dob': dob,
																// 		'description': summary,
																// 		'linkedin': json.content.TopCard.public_url.canonicalUrl,
																// 		'experience': experience,
																// 		'education': education,
																// 		'skills': skills,
																// 		'profilePicture': profilePicture,
																// 		// 'certifications': certifications,
																// 		// 'languages': languages,
																// 		'notes': notes
																// 	}
																// };
																//
																// // console.log(candidateData);
																//
																// var candidateData = JSON.stringify(candidateData);
																//
																// // console.log(candidateData);

																$('#send_to_rm').prop('disabled', false);

																// console.log(candidateData);

																// console.log(json.content.Skills.skillsMpr.skills);

																$('#send_to_rm').on('click', function (e) {

																	// console.log(summary);

																	var candidateData = {
																		'key': storrageResult.apiKey,
																		'scope': 'candidate',
																		'operation': 'insert',
																		'data': {
																			'corporationId': storrageResult.corporation_id,
																			'connectDepartment': [storrageResult.department_id],
																			'connectUser': [storrageResult.intercom_employeee_id],
																			'firstName': candidateFirstName,
																			'lastName': candidateLastName,
																			'title': json.content.TopCard.basic_info.memberHeadline,
																			'mobilePhone': mobilePhone,
																			'email': email,
																			'twitter': twitter,
																			'facebook': facebook,
																			'web': web,
																			'dob': dob,
																			'description': summary[0],
																			'linkedin': json.content.TopCard.public_url.canonicalUrl,
																			'experience': experience,
																			'education': education,
																			'skills': skills,
																			'profilePicture': profilePicture,
																			'certifications': certifications,
																			'languages': languages,
																			'notes': notes
																		}
																	};

																	console.log(candidateData);

																	var candidateData = JSON.stringify(candidateData);

																	// console.log(candidateData);
																	// sendCandidateToRm(candidateData);

																	console.log('API Key: ' + storrageResult.apiKey);
																	console.log('Corporation ID: ' + storrageResult.corporation_id);
																	console.log('Department ID: ' + storrageResult.department_id);
																	console.log('User ID: ' + storrageResult.intercom_employeee_id);

																	swal({
																		title: callback.dialog__text_plain__request_process_title_generic.message,
																		text: callback.dialog__text_plain__request_process_message_generic.message,
																		type: "info",
																		showLoaderOnConfirm: true,
																		onOpen: function () {
																			swal.clickConfirm();
																		},
																		preConfirm: function () {
																			return new Promise(function (resolve) {

																				var xhr = new XMLHttpRequest();
																				// xhr.withCredentials = true;

																				xhr.addEventListener('readystatechange', function () {

																					// console.log(this);

																					if (this.readyState === 4) {

																						var response = $.parseJSON(this.response);
																						// console.log(response);

																						if (response.success === true) {

																							console.group('CANDIDATE EXPORT INITIATED');
																							console.log(this.responseText);

																							var totalExportedLinkedInRef = firebase.database().ref('statistics/candidates/exported/LinkedIn');
																							totalExportedLinkedInRef.transaction(function (currentExported) {
																								return currentExported + 1;
																							}, function (error, committed, snapshot) {
																								if (error) {
																									console.log('Transaction failed abnormally!', error);
																								} else if (!committed) {
																									console.log('We aborted the transaction (because ada already exists).');
																								} else {
																									var totalExportedRef = firebase.database().ref('statistics/candidates/exported/total');
																									totalExportedRef.transaction(function (currentExported) {
																										return currentExported + 1;
																									}, function (error, committed, snapshot) {
																										if (error) {
																											console.log('Transaction failed abnormally!', error);
																										} else if (!committed) {
																											console.log('We aborted the transaction (because ada already exists).');
																										} else {
																											// setTimeout(function() {
																											swal({
																												type: 'success',
																												title: callback.dialog__text_plain__dialog_success_title_generic.message,
																												text: candidateFirstName + ' ' + candidateLastName + ' ' + callback.dialog__text_plain__request_success_message.message + ' ' + callback.didialog__text_service__service_name_recruitmentmanager.message,
																												timer: 3000
																											})
																											// }, 2000)
																											// console.log(candidateData);
																											console.log('Total number of candidates added: ', snapshot.val());
																										}
																									});
																									console.log('Total number of candidates added from LinkedIn: ', snapshot.val());
																								}
																							});
																							console.groupEnd();
																						} else if (response.success === false) {

																							console.log(response);

																							setTimeout(function () {
																								swal({
																									type: 'error',
																									title: callback.dialog__text_plain__dialog_error_title_generic.message,
																									text: callback.dialog__text_plain__request_error_message.message,
																									allowOutsideClick: false,
																									allowEscapeKey: false,
																									showCancelButton: true,
																									reverseButtons: true,
																									cancelButtonText: callback.dialog__button_cancel__dialog_button_cancel.message,
																									confirmButtonText: callback.dialog__button_confirm__dialog_button_try_again.message,
																								}).then(function () {
																									$('#send_to_rm').click();
																								})
																							}, 2000)

																						} else {

																							console.log(response);

																							setTimeout(function () {
																								swal({
																									type: 'error',
																									title: callback.dialog__text_plain__dialog_error_title_generic.message,
																									text: callback.dialog__text_plain__request_error_message.message,
																									allowOutsideClick: false,
																									allowEscapeKey: false,
																									showCancelButton: true,
																									reverseButtons: true,
																									cancelButtonText: callback.dialog__button_cancel__dialog_button_cancel.message,
																									confirmButtonText: callback.dialog__button_confirm__dialog_button_try_again.message,
																								}).then(function () {
																									$('#send_to_rm').click();
																								})
																							}, 2000)

																						}

																					}

																				});

																				xhr.open('POST', 'https://api.recman.no/post/');
																				// xhr.open('POST', 'https://api.recman.no/dgfhfgh/');
																				xhr.setRequestHeader('content-type', 'application/json');
																				xhr.setRequestHeader('cache-control', 'no-cache');

																				xhr.send(candidateData);
																			});
																		},
																		allowOutsideClick: false
																	});

																});

															});
														});

													});

												})
												.fail(function (jqxhr, textStatus, error) {
													console.error('ERROR: LinkedIn profile data could not be loaded: ' + error);

													swal({
														type: 'error',
														title: 'Oops!',
														text: 'RAMP could not fetch the candidates data from LinkedIn!',
														allowOutsideClick: false,
														allowEscapeKey: false,
														showCancelButton: true,
														reverseButtons: true,
														confirmButtonText: callback.dialog__button_confirm__dialog_button_try_again.message,
													}).then(function () {
														location.reload();
													})

												});

										})
										.fail(function (jqxhr, settings, exception) {
											console.log(jqxhr, settings, exception);

											swal({
												type: 'warning',
												title: 'Oops!',
												text: 'Failed to initialize the RAMP extension!',
												allowOutsideClick: false,
												allowEscapeKey: false,
												showCancelButton: true,
												reverseButtons: true,
												confirmButtonText: callback.dialog__button_confirm__dialog_button_try_again.message,
											}).then(function () {
												location.reload();
											})

										})

								}

							});


						} else {

							console.log('Loading RAMP for old LinkedIn...');

						}

					}

				}

			}



		});

	}

	// RAMP.inHotjar = function() {
	//   (function(h, o, t, j, a, r) {
	//     h.hj = h.hj || function() {
	//       (h.hj.q = h.hj.q || []).push(arguments)
	//     };
	//     h._hjSettings = {
	//       hjid: 396382,
	//       hjsv: 5
	//     };
	//     a = o.getElementsByTagName('head')[0];
	//     r = o.createElement('script');
	//     r.async = 1;
	//     r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
	//     a.appendChild(r);
	//   })(window, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');
	// }

	RAMP.genericCacheSelectors = function () {

		// cache our selectors here, can use them throughout the file
		RAMP.body = $('body');
		// RAMP.classes = 'class1 class2';

	}

	RAMP.inCacheSelectors = function () {

		RAMP.i18nLocale = $('head').find('meta[name="i18nLocale"]').attr('content').substr(0, 2);

	}

	RAMP.preBirth = function () {

		// toastr.info('Are you the 6 fingered man?');

	}

	RAMP.startOver = function () {
		chrome.runtime.onMessage.addListener(
			function (request, sender, sendResponse) {
				if (request.message === 'clicked_browser_action') {
					location.reload();
				}
			}
		);
	}

	RAMP.heyUserSomethingBroke = function () {
		swal({
			title: 'Oops...',
			text: 'Something went wrong!',
			type: 'error',
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonText: 'Click to reload page',
			timer: 5000
		}).then(
			function () {
				console.warn('Initializing page reloading...');
				location.reload();
			},
			function () {
				console.warn('Initializing page reloading...');
				location.reload();
			}
		)
	}

	RAMP.whoThatMember = function () {
		var publicIdentifierPath = window.location.pathname;
		publicIdentifierPath = publicIdentifierPath.split('/in/');
		publicIdentifierPath = publicIdentifierPath[1];
		publicIdentifierPath = publicIdentifierPath.split('/');
		var publicIdentifier = publicIdentifierPath[0];
		var publicIdentifier = decodeURI(publicIdentifier);
		console.log(publicIdentifier);
		var codeObject = [];

		function getObjects(obj, key, val) {
			var objects = [];
			for (var i in obj) {
				if (!obj.hasOwnProperty(i)) continue;
				if (typeof obj[i] == 'object') {
					objects = objects.concat(getObjects(obj[i], key, val));
				} else
					//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
					if (i == key && obj[i] == val || i == key && val == '') { //
						objects.push(obj);
					} else if (obj[i] == val && key == '') {
					//only add if the object is not already in the array
					if (objects.lastIndexOf(obj) == -1) {
						objects.push(obj);
					}
				}
			}
			return objects;
		}

		function getValues(obj, key) {
			var objects = [];
			for (var i in obj) {
				if (!obj.hasOwnProperty(i)) continue;
				if (typeof obj[i] == 'object') {
					objects = objects.concat(getValues(obj[i], key));
				} else if (i == key) {
					objects.push(obj[i]);
				}
			}
			return objects;
		}

		var letsFindThisThing = 'code:contains("firstName"):contains("lastName"):contains("occupation"):contains("objectUrn"):contains(' + publicIdentifier + ')';

		$(letsFindThisThing).each(function () {
			var inner = $(this).html();
			var code = $.parseJSON(inner);
			codeObject.push({
				code
			});
		})
	}

	RAMP.whatLinkedInIsThis = function () {
		if ($('body').hasClass('render-mode-BIGPIPE')) {

			RAMP.newLinkedIn();
			console.log('New LinkedIn');

		} else if ($('body').hasClass('member')) {

			RAMP.oldLinkedIn();
			console.log('Old LinkedIn');

		} else {
			// location.reload();
		}
	}

	RAMP.whereWeAt = function () {

		if (location.hostname.match('linkedin.com')) {

			chrome.extension.sendMessage('showPageActionIn');

			RAMP.whatLinkedInIsThis();

		} else if (location.hostname.match('nav.no')) {

			RAMP.preBirth();

			console.log('nav');

			chrome.extension.sendMessage('showPageActionNav');

		} else if (location.hostname.match('finn.no')) {

			RAMP.preBirth();
			console.log('Finn');

			chrome.extension.sendMessage('showPageActionFinn');

		} else {

			console.log('FUBAR!');

		}

	}

	RAMP.initFirebase = function () {

		// Set the configuration the Firebase app
		var config = {
			apiKey: 'firebase-ramphq',
			authDomain: ' firebase-ramphq.firebaseapp.com',
			databaseURL: 'https://ramphq.firebaseio.com',
		};

		// Initialize the Firebase app
		firebase.initializeApp(config);

		// Get a reference to the database service
		var database = firebase.database();

	}

	addEventListener('load', function (event) {
		RAMP.init();
	});

	RAMP.newLinkedIn = function () {
		RAMP.initIn();
	}

	RAMP.oldLinkedIn = function () {
		// $.getScript(chrome.extension.getURL('scripts/oldLinkedin.js'), function() {
		//   // script is now loaded and executed.
		//   // put your dependent JS here.
		// });

		var dt = new Date();
		var time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

		var extension_state;
		var corporation_id;
		var department_id;
		var intercom_employeee_id;
		var extensionId = chrome.i18n.getMessage('@@extension_id');

		chrome.storage.sync.get(null, function (items) {

			var allKeys = Object.keys(items);
			// console.log(allKeys);

			extension_state = items.extension_state;

			console.log('%cRAMP - LinkedIn to RM', 'color: #E74B3B; font-size: 48px');

			if (extensionId !== 'mjliibefpmafaihffaaokeaphalcjgcb') {
				console.log('%cRunning in local development mode', 'color: yellow; font-size: 36px');
			}

			if (extension_state === 'activated') {

				console.log('%cSkyrocket your Recruitment Manager workflow with RAMP! One click and you\'ll have all the relevant information about a candidate, including Skills, Education and Work experience.\n\nSee https://www.recmanplugins.no for more information.\n\n', 'color: #49A6D2; font-size: large');

			}
			if (extension_state !== 'activated') {

				console.log('%cSkyrocket your Recruitment Manager workflow with RAMP! One click and you\'ll have all the relevant information about a candidate, including Skills, Education and Work experience.\n\nVisit https://setup.recmanplugins.no to activate your extension.\n\n', 'color: #49A6D2; font-size: large');

			}

			// var intercomScriptPath = chrome.extension.getURL('scripts/intercom.js');
			// $('head').append($('<script>').attr('src', intercomScriptPath));

			// console.log(allKeys);
			console.groupCollapsed('INIT');
			console.log('Content script loaded at ' + time);
			if (extension_state === 'activated') {
				console.log('Extension is ' + items.extension_state);
			} else {
				console.warn('Extension is not activated');
			}

			corporation_id = items.corporation_id;
			department_id = items.department_id;
			intercom_employeee_id = items.intercom_employeee_id;

			console.log('connectCompany: ' + corporation_id);
			console.log('connectDepartment: ' + department_id);
			console.log('connectUser: ' + intercom_employeee_id);

			if (extension_state === 'activated') {

				console.info('User exists and extension is active.');

				// Initialize injection Script
				function linkedInContentScript() {

					chrome.extension.sendMessage('showPageAction');

					chrome.storage.sync.get(null, function (result) {

						var allKeys = Object.keys(result);
						console.log(allKeys);

						console.log('User ID: ' + result.intercom_employeee_id);
						console.log('Full name: ' + result.intercom_employeee_name);
						console.log('Email address: ' + result.intercom_employeee_email);
						console.log('Signup date' + result.intercom_employeee_created_at);

						// Save data to sessionStorage
						sessionStorage.setItem('sessionStorage_intercom_employeee_id', result.intercom_employeee_id);
						sessionStorage.setItem('sessionStorage_intercom_employeee_name', result.intercom_employeee_name);
						sessionStorage.setItem('sessionStorage_intercom_employeee_email', result.intercom_employeee_email);
						sessionStorage.setItem('sessionStorage_intercom_employeee_created_at', result.intercom_employeee_created_at);

						var userID = result.intercom_employeee_id;

						var apiKey = result.apiKey;
						console.log('Your API-ey is ' + apiKey);
						console.groupEnd();
						if (document.getElementById('pagekey-nprofile_my_profile')) {
							// no buttons injected
						} else {
							var path = chrome.extension.getURL('styles/in.css');
							$('head').append($('<link>')
								.attr('rel', 'stylesheet')
								.attr('type', 'text/css')
								.attr('href', path));


							console.groupCollapsed('BASIC CANDIDATE DETAILS');
							var candidateName = $('#name-container .full-name');
							if ($(candidateName).length) {
								candidateName = $(candidateName).text();
								if (!candidateName) {
									console.warn('No candidate name specified');
									return;
								} else {
									var candidateNameSplit = candidateName.split(' ');

									var candidateNameOne = candidateNameSplit[0];
									var candidateNameTwo = candidateNameSplit[1];
									var candidateNameThree = candidateNameSplit[2];
									var candidateNameFour = candidateNameSplit[3];


									if ($('.discovery-module').length) {

										var myStrCandidateFirstName = $('.discovery-module .header h3').text();
										console.log(myStrCandidateFirstName);

									} else if ($('#course-recommendations').length) {

										var myStrCandidateFirstName = $('#course-recommendations h3').text();
										console.log(myStrCandidateFirstName);

									} else if ($('.connections-map-more').length) {

										var myStrCandidateFirstName = $('.connections-map-more input[name="body"]').val();
										// console.log('Found first name in .connections-map-more');
										console.log(myStrCandidateFirstName);

									} else if ($('.follow-supplemental-action').length) {

										var myStrCandidateFirstName = $('.follow-supplemental-action .action-description').text();
										console.log('Found first name in .action-description');
										console.log(myStrCandidateFirstName);

									}

									var candidateFirstNameOne = myStrCandidateFirstName.match(candidateNameOne);
									var candidateFirstNameTwo = myStrCandidateFirstName.match(candidateNameTwo);

									if (!candidateFirstNameTwo) {
										// is emtpy

										var candidateFirstName = candidateFirstNameOne;
										candidateFirstName = candidateFirstName.toString();
										console.info('First Name: ' + candidateFirstName);

									} else {

										var candidateFirstName = candidateFirstNameOne + ' ' + candidateFirstNameTwo;
										candidateFirstName = candidateFirstName.toString();
										console.info('First Name: ' + candidateFirstName);

									}

									var candidateLastName = candidateName.split(candidateFirstName).join('');

									console.info('Last Name: ' + candidateLastName);

									console.info('Full Name: ' + candidateFirstName + candidateLastName);
								}
							}

							var candidateTitle = $('#headline .title');
							candidateTitle = $(candidateTitle).text();
							if (!candidateTitle) {
								console.warn('No candidate title specified');
							} else {
								console.info(candidateTitle);
							}

							var candidatePhone = $('#phone-view li:first-child');
							candidatePhone = $(candidatePhone).text();
							if (!candidatePhone) {
								console.warn('No candidate phone specified');
							} else {
								candidatePhone = candidatePhone.match(/\d+/);
								candidatePhone = '+' + candidatePhone;
								console.info(candidatePhone);
							}

							var candidateEmail = $('#email-view li:first-child a');
							candidateEmail = $(candidateEmail).text();
							if ($(candidateEmail.indexOf('@') === -1)) {
								console.info(candidateEmail);
							} else {
								if (!candidateEmail) {
									console.warn('No candidate email specified');
								}
							}

							var candidateLinkedInUrl = document.location.protocol + '//' + document.location.hostname + document.location.pathname;
							if (!candidateLinkedInUrl) {
								console.warn('No LinkedIn url specified');
							} else {
								console.info(candidateLinkedInUrl);
							}

							var candidateDescription = $('#summary-item-view .description');
							candidateDescription = $(candidateDescription).text();
							if (!candidateDescription) {
								console.warn('No candidate description specified');
							} else {
								console.info(candidateDescription);
							}
							console.groupEnd();

							// Define the string
							var candidateProfilePicture = $('.profile-picture img').attr('src');

							function toDataUrl(url, callback) {
								var xhr = new XMLHttpRequest();
								xhr.responseType = 'blob';
								xhr.onload = function () {
									var reader = new FileReader();
									reader.onloadend = function () {
										callback(reader.result);
									}
									reader.readAsDataURL(xhr.response);
								};
								xhr.open('GET', url);
								xhr.send();
							}

							var profilePicture;

							toDataUrl(candidateProfilePicture, function (base64Img) {
								// console.log(base64Img);
								var base64ImgSplit = base64Img.split(',');

								base64Img = base64ImgSplit[1];
								// console.log(base64Img);
								profilePicture = {
									'extension': 'jpg',
									'base64': base64Img
								};

								console.groupCollapsed('PROFILE PICTURE');
								console.log(candidateProfilePicture);
								console.log(profilePicture);
								console.groupEnd();
							});


							function hideCustomAlert() {
								$('#customAlert').fadeOut('slow').remove();
								console.log('Good bye!');
								console.groupEnd();
							}

							var certificationName;
							var certificationDescription;
							var certificationExpireDate;
							var certifications = [];

							console.groupCollapsed('CERTIFICATIONS');
							$('#background-certifications-container').find('#background-certifications').find('.section-item').each(function (index) {

								certificationName = $(this).find('h4').text();
								var certificationNameSplit = certificationName.split('(');
								certificationName = certificationNameSplit[0];
								certificationDescription = $(this).find('h5:not(.certification-logo)').text();
								console.log(certificationName);
								console.log(certificationDescription);

								if ($(this).find('.certification-date').find('time').length > 1) {

									certificationExpireDate = $(this).find('.certification-date').find('time').last().text();
									console.log('Certification expires in ' + certificationExpireDate);

									var certificationExpireDateSplit = certificationExpireDate.split(' ');
									var certificationExpireDateMonth = certificationExpireDateSplit[0];
									var certificationExpireDateYear = certificationExpireDateSplit[1];

									if (certificationExpireDateMonth === 'January') {

										certificationExpireDateMonth = '01';

									} else if (certificationExpireDateMonth === 'February') {

										certificationExpireDateMonth = '02';

									} else if (certificationExpireDateMonth === 'March') {

										certificationExpireDateMonth = '03';

									} else if (certificationExpireDateMonth === 'April') {

										certificationExpireDateMonth = '04';

									} else if (certificationExpireDateMonth === 'May') {

										certificationExpireDateMonth = '05';

									} else if (certificationExpireDateMonth === 'June') {

										certificationExpireDateMonth = '06';

									} else if (certificationExpireDateMonth === 'July') {

										certificationExpireDateMonth = '07';

									} else if (certificationExpireDateMonth === 'August') {

										certificationExpireDateMonth = '08';

									} else if (certificationExpireDateMonth === 'September') {

										certificationExpireDateMonth = '09';

									} else if (certificationExpireDateMonth === 'October') {

										certificationExpireDateMonth = '10';

									} else if (certificationExpireDateMonth === 'November') {

										certificationExpireDateMonth = '11';

									} else if (certificationExpireDateMonth === 'December') {

										certificationExpireDateMonth = '12';

									} else if (certificationExpireDateMonth === 'Januar') {

										certificationExpireDateMonth = '01';

									} else if (certificationExpireDateMonth === 'Februar') {

										certificationExpireDateMonth = '02';

									} else if (certificationExpireDateMonth === 'Mars') {

										certificationExpireDateMonth = '03';

									} else if (certificationExpireDateMonth === 'April') {

										certificationExpireDateMonth = '04';

									} else if (certificationExpireDateMonth === 'Mai') {

										certificationExpireDateMonth = '05';

									} else if (certificationExpireDateMonth === 'Juni') {

										certificationExpireDateMonth = '06';

									} else if (certificationExpireDateMonth === 'Juli') {

										certificationExpireDateMonth = '07';

									} else if (certificationExpireDateMonth === 'August') {

										certificationExpireDateMonth = '08';

									} else if (certificationExpireDateMonth === 'September') {

										certificationExpireDateMonth = '09';

									} else if (certificationExpireDateMonth === 'Oktober') {

										certificationExpireDateMonth = '10';

									} else if (certificationExpireDateMonth === 'November') {

										certificationExpireDateMonth = '11';

									} else if (certificationExpireDateMonth === 'Desember') {

										certificationExpireDateMonth = '12';

									}

									certificationExpireDate = '01.' + certificationExpireDateMonth + '.' + certificationExpireDateYear;

									console.log(certificationExpireDate);

								}

								certifications.push({
									'name': certificationName,
									'description': certificationDescription,
									'expireDate': certificationExpireDate
								});

							});

							console.log(certifications);
							console.groupEnd();

							var experienceTitle;
							var experienceCompanyName;
							var experienceLocation;
							var experienceStartDate;
							var experienceEndDate
							var experienceCurrent;
							var experienceDescription;
							var experience = [];

							console.groupCollapsed('EXPERIENCE');
							$('#background-experience-container').find('#background-experience').find('.section-item').each(function (index) {

								console.log(index + ': ' + $(this).text());

								experienceTitle = $(this).find('header').find('h4').text();
								experienceCompanyName = $(this).find('header').find('h5').text();
								experienceLocation = $(this).find('.experience-date-locale').find('.locality').text();
								experienceStartDate = $(this).find('.experience-date-locale').find('time').first().text();

								var experienceStartDateSplit = experienceStartDate.split(' ');
								var experienceStartDateMonth = experienceStartDateSplit[0];
								var experienceStartDateYear = experienceStartDateSplit[1];

								if (experienceStartDateMonth === 'January') {

									experienceStartDateMonth = '01';

								} else if (experienceStartDateMonth === 'February') {

									experienceStartDateMonth = '02';

								} else if (experienceStartDateMonth === 'March') {

									experienceStartDateMonth = '03';

								} else if (experienceStartDateMonth === 'April') {

									experienceStartDateMonth = '04';

								} else if (experienceStartDateMonth === 'May') {

									experienceStartDateMonth = '05';

								} else if (experienceStartDateMonth === 'June') {

									experienceStartDateMonth = '06';

								} else if (experienceStartDateMonth === 'July') {

									experienceStartDateMonth = '07';

								} else if (experienceStartDateMonth === 'August') {

									experienceStartDateMonth = '08';

								} else if (experienceStartDateMonth === 'September') {

									experienceStartDateMonth = '09';

								} else if (experienceStartDateMonth === 'October') {

									experienceStartDateMonth = '10';

								} else if (experienceStartDateMonth === 'November') {

									experienceStartDateMonth = '11';

								} else if (experienceStartDateMonth === 'December') {

									experienceStartDateMonth = '12';

								} else if (experienceStartDateMonth === 'Januar') {

									experienceStartDateMonth = '01';

								} else if (experienceStartDateMonth === 'Februar') {

									experienceStartDateMonth = '02';

								} else if (experienceStartDateMonth === 'Mars') {

									experienceStartDateMonth = '03';

								} else if (experienceStartDateMonth === 'April') {

									experienceStartDateMonth = '04';

								} else if (experienceStartDateMonth === 'Mai') {

									experienceStartDateMonth = '05';

								} else if (experienceStartDateMonth === 'Juni') {

									experienceStartDateMonth = '06';

								} else if (experienceStartDateMonth === 'Juli') {

									experienceStartDateMonth = '07';

								} else if (experienceStartDateMonth === 'August') {

									experienceStartDateMonth = '08';

								} else if (experienceStartDateMonth === 'September') {

									experienceStartDateMonth = '09';

								} else if (experienceStartDateMonth === 'Oktober') {

									experienceStartDateMonth = '10';

								} else if (experienceStartDateMonth === 'November') {

									experienceStartDateMonth = '11';

								} else if (experienceStartDateMonth === 'Desember') {

									experienceStartDateMonth = '12';

								}

								experienceStartDate = '01.' + experienceStartDateMonth + '.' + experienceStartDateYear;

								console.log(experienceStartDate);

								if ($(this).find('.experience-date-locale').find('time').length > 1) {

									experienceCurrent = 0;
									experienceEndDate = $(this).find('.experience-date-locale').find('time').last().text();

									var experienceEndDateSplit = experienceEndDate.split(' ');
									var experienceEndDateMonth = experienceEndDateSplit[0];
									var experienceEndDateYear = experienceEndDateSplit[1];

									if (experienceEndDateMonth === 'January') {

										experienceEndDateMonth = '01';

									} else if (experienceEndDateMonth === 'February') {

										experienceEndDateMonth = '02';

									} else if (experienceEndDateMonth === 'March') {

										experienceEndDateMonth = '03';

									} else if (experienceEndDateMonth === 'April') {

										experienceEndDateMonth = '04';

									} else if (experienceEndDateMonth === 'May') {

										experienceEndDateMonth = '05';

									} else if (experienceEndDateMonth === 'June') {

										experienceEndDateMonth = '06';

									} else if (experienceEndDateMonth === 'July') {

										experienceEndDateMonth = '07';

									} else if (experienceEndDateMonth === 'August') {

										experienceEndDateMonth = '08';

									} else if (experienceEndDateMonth === 'September') {

										experienceEndDateMonth = '09';

									} else if (experienceEndDateMonth === 'October') {

										experienceEndDateMonth = '10';

									} else if (experienceEndDateMonth === 'November') {

										experienceEndDateMonth = '11';

									} else if (experienceEndDateMonth === 'December') {

										experienceEndDateMonth = '12';

									} else if (experienceEndDateMonth === 'Januar') {

										experienceEndDateMonth = '01';

									} else if (experienceEndDateMonth === 'Februar') {

										experienceEndDateMonth = '02';

									} else if (experienceEndDateMonth === 'Mars') {

										experienceEndDateMonth = '03';

									} else if (experienceEndDateMonth === 'April') {

										experienceEndDateMonth = '04';

									} else if (experienceEndDateMonth === 'Mai') {

										experienceEndDateMonth = '05';

									} else if (experienceEndDateMonth === 'Juni') {

										experienceEndDateMonth = '06';

									} else if (experienceEndDateMonth === 'Juli') {

										experienceEndDateMonth = '07';

									} else if (experienceEndDateMonth === 'August') {

										experienceEndDateMonth = '08';

									} else if (experienceEndDateMonth === 'September') {

										experienceEndDateMonth = '09';

									} else if (experienceEndDateMonth === 'Oktober') {

										experienceEndDateMonth = '10';

									} else if (experienceEndDateMonth === 'November') {

										experienceEndDateMonth = '11';

									} else if (experienceEndDateMonth === 'Desember') {

										experienceEndDateMonth = '12';

									}

									experienceEndDate = '01.' + experienceEndDateMonth + '.' + experienceEndDateYear;

									console.log(experienceEndDate);

									console.log('Contains both startDate and endDate');

								} else {

									experienceCurrent = 1;

									console.log('Contains ONLY startDate');

								}

								experienceDescription = $(this).find('.description').text();

								experience.push({
									'title': experienceTitle,
									'companyName': experienceCompanyName,
									'location': experienceLocation,
									'startDate': experienceStartDate,
									'endDate': experienceEndDate,
									'current': experienceCurrent,
									'description': experienceDescription
								});

							});
							console.groupEnd();

							var educationSchoolName;
							var educationType;
							var educationDegree;
							var educationLocation;
							var educationStartDate
							var educationEndDate;
							var educationDescription;
							var education = [];

							console.groupCollapsed('EDUCATION');
							$('#background-education-container').find('#background-education').find('.section-item').each(function (index) {

								console.log(index + ': ' + $(this).text());

								educationSchoolName = $(this).find('header').find('h4').text();
								educationType = $(this).find('header').find('h5').text();
								educationDegree;
								educationLocation;
								educationStartDate = $(this).find('.education-date').find('time').first().text();

								educationStartDate = '15.08.' + educationStartDate;
								console.log(educationStartDate);

								if ($(this).find('.education-date').find('time').length > 1) {

									educationEndDate = $(this).find('.education-date').find('time').last().text();

									var educationEndDateSplit = educationEndDate.split(' – ');
									educationEndDate = educationEndDateSplit[1];

									educationEndDate = '15.06.' + educationEndDate;
									console.log(educationEndDate);
									console.log('Contains both startDate and endDate');

								}

								educationDescription = $(this).find('.notes').text();

								education.push({
									'schoolName': educationSchoolName,
									'educationType': educationType,
									'degree': educationDegree,
									'location': educationLocation,
									'startDate': educationStartDate,
									'endDate': educationEndDate,
									'description': educationDescription
								});

							});
							console.groupEnd();

							var skillsName;
							var skillsRating;
							var skills = [];

							console.groupCollapsed('SKILLS');
							$('#background-skills-container #background-skills #skills-item #skills-item-view #profile-skills .skills-section .endorse-item').each(function (index) {

								console.log(index + ': ' + $(this).text());

								skillsName = $(this).find('.skill-pill').find('.endorse-item-name').find('.endorse-item-name-text').text();

								skills.push({
									'name': skillsName,
									'rating': 0
								});

							});

							console.log(skills);
							console.groupEnd();

							var languageName;
							var languageProficiencyOption;
							var languageId;
							var languageProficiency;
							var languages = [];

							console.groupCollapsed('LANGUAGES');
							$('#background-languages-container').find('#languages-view').find('.section-item').each(function (index) {

								// console.log(index + ': ' + $(this).text());

								languageProficiencyOption = $(this).find('.languages-proficiency').text();

								if (languageProficiencyOption === 'Elementary proficiency') {

									languageProficiency = 'elementary';

								} else if (languageProficiencyOption === 'Limited working proficiency') {

									languageProficiency = 'limitedWorking';

								} else if (languageProficiencyOption === 'Professional working proficiency') {

									languageProficiency = 'professionalWorking';

								} else if (languageProficiencyOption === 'Full professional proficiency') {

									languageProficiency = 'fullProfessional';

								} else if (languageProficiencyOption === 'Native or bilingual proficiency') {

									languageProficiency = 'navtiveOrBilingual';

								} else if (languageProficiencyOption === 'Grunnleggende kunnskap') {

									languageProficiency = 'elementary';

								} else if (languageProficiencyOption === 'Begrenset yrkeskompetanse') {

									languageProficiency = 'limitedWorking';

								} else if (languageProficiencyOption === 'Faglig yrkeskompetanse') {

									languageProficiency = 'professionalWorking';

								} else if (languageProficiencyOption === 'Komplett profesjonell kompetanse') {

									languageProficiency = 'fullProfessional';

								} else if (languageProficiencyOption === 'Morsmål eller tospråklig kompetanse') {

									languageProficiency = 'navtiveOrBilingual';

								}

								languageName = $(this).find('h4').find('span').text();

								if (languageName === 'English') {

									languageId = 15;

								} else if (languageName === 'Swedish') {

									languageId = 65;

								} else if (languageName === 'Danish') {

									languageId = 11;

								} else if (languageName === 'Norwegian') {

									languageId = 49;

								} else if (languageName === 'Engelsk') {

									languageId = 15;

								} else if (languageName === 'Svensk') {

									languageId = 65;

								} else if (languageName === 'Dansk') {

									languageId = 11;

								} else if (languageName === 'Norsk') {

									languageId = 49;

								} else {

									languageId = null;

								}

								console.log(languageName + ' - ' + languageProficiency);

								if (languageId !== null) {

									languages.push({
										'languageId': languageId,
										'proficiency': languageProficiency
									});

								}

							});
							console.log(languages);
							console.groupEnd();

							var exportCandidate = function exportCandidate() {

								function exportCandidateSuccessFunction() {

									var exportCandidateSuccess = '<div id="customAlert" class="alert success" role="alert"><p><strong>' + candidateFirstName + ' ' + candidateLastName + ' was successfully added to Recruitment Manager.</strong></p></div>';
									$(exportCandidateSuccess).appendTo('#global-alert-queue');

									setTimeout(hideCustomAlert, 4000);
								}

								var data = JSON.stringify({
									'key': apiKey,
									'scope': 'candidate',
									'operation': 'insert',
									'data': {
										'corporationId': corporation_id,
										'firstName': candidateFirstName,
										'lastName': candidateLastName,
										'title': candidateTitle,
										'mobilePhone': candidatePhone,
										'email': candidateEmail,
										'description': candidateDescription,
										'linkedin': candidateLinkedInUrl,
										'experience': experience,
										'education': education,
										'skills': skills,
										'profilePicture': profilePicture,
										'certifications': certifications,
										'languages': languages,
										'notes': 'Imported from LinkedIn via RAMP',
										'connectDepartment': [department_id],
										'connectUser': [intercom_employeee_id]
									}
								});

								var xhr = new XMLHttpRequest();
								xhr.withCredentials = true;

								xhr.addEventListener('readystatechange', function () {
									if (this.readyState === 4) {
										console.group('CANDIDATE EXPORT INITIATED');
										console.log(this.responseText);
										exportCandidateSuccessFunction();
									}
								});

								xhr.open('POST', 'https://api.recman.no/post/');
								xhr.setRequestHeader('content-type', 'application/json');
								xhr.setRequestHeader('cache-control', 'no-cache');

								xhr.send(data);

							};

							var buttonContainer = $('.profile-card.vcard');
							var buttonWrapper = '<div id="buttonWrapper"></div>';
							var btnCopy = '<div class="profile-actions view-actions"><div class="katy-button-group"><a href="#" id="btnCopyCandidateDetails" class="button-primary">Copy candidate details</a></div></div>';
							var btnExport = '<div class="profile-actions view-actions"><div class="katy-button-group"><a href="#" id="btnExportCandidateDetails" class="button-primary">Add candidate to Recruitment Manager</a></div></div>';


							if ($(buttonContainer).length) {
								$(buttonWrapper).insertBefore(buttonContainer);

								//$(btnCopy).appendTo('#buttonWrapper');
								$(btnExport).appendTo('#buttonWrapper');

								var btnCopyCandidateDetails = $('#btnCopyCandidateDetails');
								var btnExportCandidateDetails = $('#btnExportCandidateDetails');


								$(btnCopyCandidateDetails).on('click', function (e) {
									e.preventDefault();
									copyCandidateDetails();
								});

								$(btnExportCandidateDetails).on('click', function (e) {
									e.preventDefault();
									exportCandidate();
								});
							}
						}
					});
				};

				if (window.location.href.indexOf('https://www.linkedin.com/in/') > -1) {

					linkedInContentScript();

				} else if (window.location.href.indexOf('https://www.linkedin.com/profile/preview') > -1) {

					linkedInContentScript();

				}

			} else {

				console.warn('Extension is not activated...');

				function linkedin_content_script_not_activated() {
					var buttonContainer = $('.profile-card.vcard');

					var buttonWrapper = '<div id="buttonWrapper"></div>';

					var btnSetup = '<div class="setup profile-actions view-actions"><div class="katy-button-group"><a href="https://setup.recmanplugins.no/" target="_blank" id="btnSetupExtension" class="button-primary">Click here to setup the LinkedIn to RM Extension</a></div></div>';

					if ($(buttonContainer).length) {

						$(buttonWrapper).insertBefore(buttonContainer);

						$(btnSetup).appendTo('#buttonWrapper');

						var btnSetupExtension = $('#btnSetupExtension');


						$(btnSetupExtension).on('click', function (e) {

							console.log('Start Extension Setup');

						});

					}
				}

				if (window.location.href.indexOf('https://www.linkedin.com/in/') > -1) {

					linkedin_content_script_not_activated();

				}

			}

		});

	}

})(window, document, $);
