# Meteor Smart Disconnect

Meteor connections are [expensive](https://groups.google.com/forum/?hl=en&fromgroups#!searchin/meteor-core/meteor.disconnect/meteor-core/tHc9kC4mjcI/0ktN9qead8EJ). That's why Meteor [introduced](https://github.com/meteor/meteor/pull/1151) `Meteor.disconnect()`. It allows you to disconnect the entire Meteor client from the server. Reconnecting is as easy as calling `Meteor.reconnect()`.

So why keep the app connected if your user isn't interacting with your app? This simple package will disconnect your app when the user switches to another tab and leaves your app in the background. It will also debounce for 10 seconds so it doesn't disconnect and reconnect if the user is switching through tabs quickly.

## Adding

Add this to your app with:

```
meteor add mixmax:smart-disconnect
```

## Contributing

We welcome all contributions! Please enhance this with more logic to disconnect in a smart way. Some ideas:

* Conditionally turn it on for some routes
* Turn it off when the user stops interacting with your app (but might have it in the foreground)
