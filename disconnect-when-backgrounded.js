var disconnectTimer = null;

// 10 seconds by default
var disconnectTime = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectTimeSec || 60) * 1000;

Meteor.startup(disconnectIfHidden);

document.addEventListener('visibilitychange', disconnectIfHidden);

if (Meteor.isCordova) {
    document.addEventListener('resume', function () { Meteor.reconnect(); });
    document.addEventListener('pause', function () { createDisconnectTimeout(); });
}

function disconnectIfHidden() {
    removeDisconnectTimeout();

    if (document.hidden) {
        createDisconnectTimeout();
    } else {
        Meteor.reconnect();
    }
}

function createDisconnectTimeout() {
    removeDisconnectTimeout();

    disconnectTimer = setTimeout(function () {
        Meteor.disconnect();
    }, disconnectTime);
}

function removeDisconnectTimeout() {
    if (disconnectTimer) {
        clearTimeout(disconnectTimer);
    }
}
