/* 
 * jQuery.socialPlugins v0.1
 * https://github.com/Thibaut/jquery-social-plugins
 *
 * Copyright 2012 Thibaut Courouble
 * http://thibaut.me
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function(document, $) {
  "use strict";
  
  var $s = $.socialPlugins = {};

  $s.load = function(plugins) {
    $.each(plugins || $s.supported, function() {
      var plugin = $s[this] || {};
      if (!plugin.loaded) {
        setDefaults(plugin.defaults);
        loadPlugin(this, plugin);
      }
    });
  };
  
  $s.parse = function(plugins) {
    $.each(plugins || $s.supported, function() {
      var plugin = $s[this] || {};
      if (plugin.loaded) {
        setDefaults(plugin.defaults);
        pluginParse(this, plugin);
      }
    });
  };
  
  function setDefaults(defaults) {
    for (var selector in defaults) {
      var attributes = defaults[selector],
          elements = $(selector);
      for (var attr in attributes)
        elements.not('[data-' + attr + ']').attr('data-' + attr, attributes[attr]);
    }
  }
  
  function loadPlugin(name, plugin) {
    plugin.loaded = true;
    
    $.ajax({
      url: plugin.url,
      dataType: 'script',
      cache: true,
      success: function() { $(document).trigger('load.' + name ); }
    });
  }
  
  function pluginParse(name, plugin) {
    try {
      plugin.parse();
      $(document).trigger('parse.' + name );
    } catch(e) {}
  }
  
  $.extend($s, {
    supported: [ 'facebook', 'twitter', 'google', 'linkedin' ],
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
  });
})(document, jQuery);