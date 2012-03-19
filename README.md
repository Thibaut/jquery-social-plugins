# jQuery.socialPlugins

A jQuery plugin to lazy load social plugins such as Facebook Connect, Twitter Widgets, Google +1, and LinkedIn.

## $.socialPlugins.load( plugins )

Accepts an `Array` of plugin names (defaults to all supported plugins).

For each plugin that isn't already loaded:

* sets default data-attributes;
* asynchronously loads the JavaScript file.

Examples:

```javascript
$.socialPlugins.load(); // loads all supported plugins
$.socialPlugins.load(['facebook', 'twitter']); // only Facebook and Twitter
```

## $.socialPlugins.parse( plugins )

Accepts an `Array` of plugin names (defaults to all supported plugins).

For each loaded plugin:

* sets default data-attributes;
* calls the plugin's parse function, discarding errors.

This method is useful when you dynamically update your page (i.e. via ajax) and want to render new plugin tags.

Examples:

```javascript
$.socialPlugins.parse(); // calls the parse function of all loaded plugins
$.socialPlugins.parse(['facebook']); // only Facebook (renders new Like buttons, etc.)
```

## Setting defaults

Default data-attributes can be set to your plugin tags before load and parse:

```javascript
$.socialPlugins.plugin_name.defaults = {
  'selector': {
    attribute: 'value'
  }
}
```

Before `plugin_name` is loaded, or its parse function called, `data-attribute="value"` will be added to all elements matching `selector` which do not already have a `data-attribute` attribute.

Examples:

```javascript
// Default all Facebook Like and Subscribe buttons to the "button_count" layout
$.socialPlugins.facebook.defaults = {
  '.fb-like, .fb-subscribe': {
    layout: 'button_count'
  }
};

// Default all Tweet buttons to the French language and "large" size
$.socialPlugins.twitter.defaults = {
  '.twitter-share-button': {
    lang: 'fr',
    size: 'large'
  }
};
```

## Events

* `load.plugin_name` is fired when a plugin's JavaScript is successfully loaded.

* `parse.plugin_name` is fired when a plugin's parse function is successfully called.

## Supported Plugins

```javascript
facebook: {
  url: '//connect.facebook.net/en_US/all.js',
  parse: function() { FB.XFBML.parse(); }
},
twitter: {
  url: '//platform.twitter.com/widgets.js',
  parse: function() { twttr.widgets.load(); }
},
google: {
  url: '//apis.google.com/js/plusone.js',
  parse: function() { gapi.plusone.go(); }
},
linkedin: {
  url: '//platform.linkedin.com/in.js',
  parse: function() { IN.parse(); }
}
```

To add a new plugin:

```javascript
$.socialPlugins.plugin_name = {
  url: '...',
  parse: function() { plugin_global_var.parseFunction(); }
};
$.socialPlugins.supported.push('plugin_name');
```

## FB.init

Facebook Connect requires initialization with `FB.init`.

This can be done by attaching an event handler to `load.facebook`:

```javascript
$(document).on('load.facebook', function() {
  $('body').append('<div id="fb-root"></div>'); // Required by Facebook Connect
  FB.init({
    appId: $('meta[property="fb:app_id"]').attr('content'),
    status: true,
    cookie: true,
    xfbml: true
  });
});
```

## License

Copyright 2012 [Thibaut Courouble](http://thibaut.me)
Licensed under the MIT License.