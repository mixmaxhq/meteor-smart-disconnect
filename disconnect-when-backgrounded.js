var disconnectTimer = null;

document.addEventListener('visibilitychange', function() {
  if (disconnectTimer) {
    clearTimeout(disconnectTimer);
  }

  if (document.hidden) {
    // Disconnect the app if the tab is in the background for 10 seconds.
    disconnectTimer = setTimeout(function() {
      Meteor.disconnect();
    }, 10 * 1000);

  } else {
    // Reconnect immediately when it is brough to the foreground.
    Meteor.reconnect();
  }
});
