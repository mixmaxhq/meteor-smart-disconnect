# Meteor Smart Disconnect

Meteor connections are [expensive](https://groups.google.com/forum/?hl=en&fromgroups#!searchin/meteor-core/meteor.disconnect/meteor-core/tHc9kC4mjcI/0ktN9qead8EJ). That's why Meteor [introduced](https://github.com/meteor/meteor/pull/1151) `Meteor.disconnect()`. It allows you to disconnect the entire Meteor client from the server. Reconnecting is as easy as calling `Meteor.reconnect()`.

So why keep the app connected if your user isn't interacting with your app? This simple package will disconnect your app when the user switches to another tab and leaves your app in the background. It will also debounce for 60 seconds so it doesn't disconnect and reconnect if the user is switching through tabs quickly.

## Adding

Add this to your app with:

```
meteor add mixmax:smart-disconnect
```

## Meteor Settings
You can change the time for which the user is away for before you disconnect. By default this value is 60 seconds, but you can set `disconnectTimeSec` in your Meteor settings file to a different value to change this. This value is in seconds and `disconnectTimeSec` should be a public value in your settings file.

If you are using the Iron Router package, you can stop the smart-disconnect from working on some of your routes by adding a `disconnectVoids` key into the public section of your settings file. It must be an array of route names such as:

    "disconnectVoids" : ["Dashboard","Account","Profile"]

If you are not using the Iron Router package, you can stop the smart-disconnect from working on some of your routes by passing their pathname:

    "disconnectVoids": ["/dashboard/account", "/dashboard/settings"]

## Check Disconnect & Reconnect

You can test whether you are connected or disconnected by using Meteor's Tracker package:

```
import { Tracker } from 'meteor/tracker';

export const MyComponent = () => {
    Tracker.autorun(() => {
        console.log(Meteor.status().status);
    });
}
```

This will console log your connection status as it changes.

It can be helpful to include timestamps as well:

```
Tracker.autorun(() => {
    console.log(`${new Date().toLocaleTimeString('en-GB')} : ${Meteor.status().status}`);
});
```

## Contributing

We welcome all contributions! Please enhance this with more logic to disconnect in a smart way. Some ideas:

* Conditionally turn it on for some routes
* Turn it off when the user stops interacting with your app (but might have it in the foreground)
