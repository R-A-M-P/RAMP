// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
// if (ENV === 'development') {
// 	console.log('We are in development mode!');
// }
// chrome.runtime.onInstalled.addListener(function(details) {
//   console.log('previousVersion', details.previousVersion);
//
// });
// request permission on page load
document.addEventListener( 'DOMContentLoaded', function () {
	if ( Notification.permission !== 'granted' ) Notification.requestPermission();
} );

function notifyMe( version ) {
	if ( !Notification ) {
		alert( 'Desktop notifications not available in your browser. Try Chromium.' );
		return;
	}
	if ( Notification.permission !== 'granted' ) Notification.requestPermission();
	else {
		var notification = new Notification( 'RAMP was updated!', {
			icon: 'images/icon-in-128.png',
			body: 'You are now running RAMP v' + version + '. Read more about the releas and see what\'s added, improved and fixed at https://help.recmanplugins.no/changelog/.',
		} );
		notification.onclick = function () {
			window.open( 'https://help.recmanplugins.no/changelog/' );
		};
	}
}
// Check whether new version is installed
chrome.runtime.onInstalled.addListener( function ( details ) {
	if ( details.reason === 'install' ) {
		console.log( 'This is the first install of RAMP!' );
	} else if ( details.reason === 'update' ) {
		var thisVersion = chrome.runtime.getManifest().version;
		if ( details.previousVersion !== thisVersion ) {
			console.log( 'Updated from v' + details.previousVersion + ' to v' + thisVersion + '!' );
			notifyMe( thisVersion );
		} else {
			console.log( 'Running RAMP v' + thisVersion + '!' );
		}
	}
} );
var alreadyLoaded = 0;
chrome.tabs.onUpdated.addListener( function ( tabId, changeInfo, tab ) {
	// chrome.pageAction.show(tabId);
	// if (active_and_ready_to_reload === true) {
	//   function sendMessageToTabs(tabs) {
	// chrome.tabs.sendMessage(
	//   tab.id, {
	//     action: 'active_and_ready_to_reload'
	//   }
	// );
	//     active_and_ready_to_reload = false;
	//   }
	//
	//   sendMessageToTabs();
	// }
	if ( changeInfo.status === 'complete' ) {
		alreadyLoaded++
		if ( alreadyLoaded === 1 ) {
			chrome.management.getSelf( function ( details ) {
				// var installType = details.installType;
				if ( details.installType === 'development' ) {
					// console.log( 'details', details );
					// chrome.tabs.query({
					// 	active: true
					// }, function (tabs) {
					// 	chrome.tabs.sendMessage(tab.id, {
					// 		installType: 'development'
					// 	}, function (response) {});
					// });
					chrome.tabs.sendMessage( tab.id, {
						installType: 'development'
					} );
					console.info( 'Running in Local Dev mode.' );
				}
			} );
		}
		// chrome.tabs.executeScript(tab.ib, {
		//   file: 'scripts/hotjar.js'
		// });
		// console.clear();
		console.log( 'start changeInfo' );
		console.log( changeInfo );
		chrome.tabs.query( {
			active: true
		}, function ( tabs ) {
			chrome.tabs.sendMessage( tab.id, {
				action: 'init'
			}, function ( response ) {} );
			chrome.pageAction.setTitle( {
				tabId: tab.id,
				title: 'Click to refresh candidate page'
			} );
		} );
	}
} );
chrome.extension.onMessage.addListener( function ( message, sender ) {
	if ( message === 'showPageActionIn' ) {
		console.log( message );
		var tab = sender.tab;
		chrome.pageAction.show( tab.id );
		chrome.pageAction.setIcon( {
			tabId: tab.id,
			path: 'images/icon-in-32.png'
		} );
		chrome.pageAction.show( sender.tab.id );
		chrome.contextMenus.removeAll();
		chrome.contextMenus.create( {
			id: 'change-language',
			title: 'Change Language',
			contexts: [ 'page_action' ]
		} );
		chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
			console.log( "Item " + info.menuItemId + " clicked " + "in tab " + tab.id );
			chrome.tabs.sendMessage( tab.id, {
				action: 'change_language'
			} );
		} );
	} else if ( message === 'showPageActionNav' ) {
		console.log( message );
		var tab = sender.tab;
		chrome.pageAction.show( tab.id );
		chrome.pageAction.setIcon( {
			tabId: tab.id,
			path: 'images/icon-nav-32.png'
		} );
		chrome.pageAction.show( sender.tab.id );
	} else if ( message === 'showPageActionFinn' ) {
		console.log( message );
		var tab = sender.tab;
		chrome.pageAction.show( tab.id );
		chrome.pageAction.setIcon( {
			tabId: tab.id,
			path: 'images/icon-finn-32.png'
		} );
		chrome.pageAction.show( sender.tab.id );
	}
} );
// Called when the user clicks on the browser action.
chrome.pageAction.onClicked.addListener( function ( tab ) {
	// Send a message to the active tab
	chrome.tabs.query( {
		active: true,
		currentWindow: true
	}, function ( tabs ) {
		var activeTab = tabs[ 0 ];
		chrome.tabs.sendMessage( activeTab.id, {
			'message': 'clicked_browser_action'
		} );
	} );
} );
chrome.runtime.onMessageExternal.addListener( function ( request, sender, sendResponse ) {
	if ( request ) {
		if ( request.message ) {
			console.info( 'Message received...' );
			console.log( request );
			if ( request.message == 'is_extension_installed' ) {
				sendResponse( {
					is_extension_installed: 'yes'
				} );
				var extension_id = request.extension_id;
				console.info( 'Extension with ID ' + extension_id + ' is installed. Move along... Move along!' );
			}
		}
	}
	return true;
} );
chrome.runtime.onMessageExternal.addListener( function ( request, sender, sendResponse ) {
	if ( request.message === 'activate' ) {
		console.log( request.message );
		console.log( 'Extension activation initialized' );
		chrome.storage.sync.clear( function () {
			var error = chrome.runtime.lastError;
			if ( error ) {
				console.error( 'Chrome Storrage Sync data cleared because : ' + error );
			} else {
				console.info( 'Chrome Storrage Sync data cleared...' );
				chrome.storage.sync.set( {
					extension_state: 'activated',
					apiKey: request.apiKey,
					plan: request.plan,
					trial_started_at: request.trial_started_at,
					corporation_id: request.corporation_id,
					department_id: request.department_id,
					department_name: request.department_name,
					intercom_company_account_manager_id: request.intercom_company_account_manager_id,
					intercom_company_account_manager_name: request.intercom_company_account_manager_name,
					intercom_company_account_manager_email: request.intercom_company_account_manager_email,
					intercom_company_account_manager_phone: request.intercom_company_account_manager_phone,
					intercom_employeee_id: request.intercom_employeee_id,
					intercom_employeee_name: request.intercom_employeee_name,
					intercom_employeee_email: request.intercom_employeee_email,
					intercom_employeee_created_at: request.intercom_employeee_created_at
				}, function () {
					sendResponse( {
						message: 'extension_activated'
					} );
					console.info( 'Extension is now activated' );
					active_and_ready_to_reload = true;
				} );
			}
		} );
	} else if ( request.message === 'deactivated' ) {
		console.log( 'Extension deactivation initialized' );
		chrome.storage.sync.set( {
			extension_state: 'deactivated'
		}, function () {
			sendResponse( {
				message: 'deactivated'
			} );
			console.warn( 'Extension is now deactivated' );
		} );
	}
} );
