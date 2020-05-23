function checkConnection()
{
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.CELL]     = 'Cell generic connection';
	states[Connection.NONE]     = 'No network connection';
	
	if (networkState == Connection.NONE || networkState == Connection.UNKNOWN)
	{
		console.log("lost connection");
		navigator.app.exitApp();
		navigator.notification.alert(
           "התחבר לאינטרנט על-מנת להשתמש באפליקציה!",  // message
            goSettings,              // callback to invoke with index of button pressed
            'שגיאת מערכת',            // title
            'OK'          // buttonLabels
        );
	}
	return states[networkState];
} 

function loadTable()
{
	$.ajax({
		async: false,
		type: "POST",
		url: "https://order.yummyyummy.co.il/ajax/load-shippings",
		data: "device=" + 1,
		success: function(data) {
			$("#table_data").html(data);
		}
	});
}

function changeStatus(orderid, status)
{
	$.ajax({
		aync: false,
		type: "POST", 
		url: "https://order.yummyyummy.co.il/ajax/change-order-status",
		data: "orderid=" + orderid + "&status=" + status,
		success: function() {
			loadTable();
		}
	});
}

function onDeviceReady() 
{
	StatusBar.hide();
	StatusBar.styleDefault();
	StatusBar.overlaysWebView(false);
	StatusBar.styleBlackOpaque();
	StatusBar.show();
	StatusBar.backgroundColorByHexString("#e22753");
	screen.orientation.lock('portrait');
	
	checkConnection();
	
	setTimeout(function() {
		$("#lottie").fadeOut("fast");
	}, 1500);
	
	/*window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
	
	var notificationOpenedCallback = function(jsonData) {
		alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	};

	window.plugins.OneSignal.startInit("ca3d04d1-39c5-4a30-b82d-24ff00c8668e").handleNotificationOpened(notificationOpenedCallback).endInit();
	*/
	
	loadTable();
	var ajax = setInterval(function() { loadTable(); }, 30000);
}

function onPause() {
    // Handle the pause event
	checkConnection();
}

function onResume() {
    // Handle the resume event
	checkConnection();
}

function onMenuKeyPressed() {
    // Handle the menubutton event
	checkConnection();
	return false;
}

function goSettings()
{
	cordova.plugins.settings.openSetting("wifi");
}