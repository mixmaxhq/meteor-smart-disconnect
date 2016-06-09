var disconnectTimer = null;

// 10 seconds by default
var disconnectTime = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectTime || 10) * 1000;

Meteor.startup(function () {
  disconnectIfHidden();  
});

document.addEventListener('visibilitychange', function() {
  if (disconnectTimer) {
    clearTimeout(disconnectTimer);
  }

  disconnectIfHidden();
});

function disconnectIfHidden() {
  if (document.hidden) {
    // Disconnect the app if the tab is in the background for 10 seconds.
    disconnectTimer = setTimeout(function() {
      console.log('disconnect');
      Meteor.disconnect();
    }, disconnectTime);
  } else {
    // Reconnect immediately when it is brough to the foreground.
    console.log('reconnect');
    Meteor.reconnect();
  }
}
