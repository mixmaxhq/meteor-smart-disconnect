var disconnectTimer = null;

// 60 seconds by default
var disconnectTime = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectTimeSec || 60) * 1000;
var disconnectVoids = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectVoids || []);

Meteor.startup(disconnectIfHidden);

document.addEventListener('visibilitychange', disconnectIfHidden);

if (Meteor.isCordova) {
    document.addEventListener('resume', function () { Meteor.reconnect(); });
    document.addEventListener('pause', function () { createDisconnectTimeout(); });
}

function currentPageIsNotExempt() {
    const pathName = Package["iron:router"] ? Router.current().route.getName() : window.location.pathname;
    return !disconnectVoids.includes(pathName);
};

function disconnectIfHidden() {
    removeDisconnectTimeout();

    if (document.hidden && currentPageIsNotExempt()) {
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
