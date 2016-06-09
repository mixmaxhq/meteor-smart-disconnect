var disconnectTimer = null;

// 10 seconds by default
var disconnectTime = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectTime || 10) * 1000;

document.addEventListener('visibilitychange', function() {
  if (disconnectTimer) {
    clearTimeout(disconnectTimer);
  }

  if (document.hidden) {
    // Disconnect the app if the tab is in the background for 10 seconds.
    disconnectTimer = setTimeout(function() {
      Meteor.disconnect();
    }, disconnectTime);

  } else {
    // Reconnect immediately when it is brough to the foreground.
    Meteor.reconnect();
  }
});
