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


function onDeviceReady() 
{
	StatusBar.hide();
	StatusBar.styleDefault();
	StatusBar.overlaysWebView(false);
	StatusBar.styleBlackOpaque();
	StatusBar.show();
	StatusBar.backgroundColorByHexString("#c32026");
	screen.orientation.lock('portrait');
	
	checkConnection();
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

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
