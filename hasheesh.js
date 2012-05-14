(function(doc, window, $, undefined){
  window.hasheesh = {
    
    // Namespace to look at
    namespace: null,

    // Load function
    // Gets called for every hash change
    load: function() {
      
      // Clear screen
      $( "#container" ).html( "" );

      var hashObj = location.hash.slice(1);

      if ( typeof hasheesh.namespace[hashObj] === "object" && typeof hasheesh.namespace[hashObj].init === "function" ) {
        hasheesh.namespace[hashObj].init();
      } else {
        var el = doc.createElement('script'),
          script = doc.getElementsByTagName('script')[0];

        el.src = "js/app/" + hashObj + "/init.js";
        script.parentNode.insertBefore(el, script);

        if ( !hasheesh.namespace[hashObj] ) {
          hasheesh.waitingFor = hashObj;
          hasheesh.timeout = setTimeout("hasheesh.loadModule()", 500);
        }
      }

    },

    loadModule: function() {

      if ( !hasheesh.waitingFor ) {
        if ( hasheesh.timeout ) {
          clearTimeout( hasheesh.timeout );
        }
        return;
      }

      if ( hasheesh.namespace[hasheesh.waitingFor] ) {

        var hash = hasheesh.waitingFor;
        
        // Object found, clear first
        hasheesh.waitingFor = null;
        clearTimeout( hasheesh.timeout );

        // Now call init()
        hasheesh.namespace[hash].init();
        return;
      }

      hasheesh.timeout = setTimeout("hasheesh.loadModule()", 500);
    },

    // Helper function to load templates
    loadTemplate: function(opts) {

      var defaults = {
            file: null,
            context: "#container",
            callback: null
          },
          options = $.extend(defaults, opts || {});

      $.ajax({
        url: "js/app/" + options.file + ".html",
        dataType: "html", 
        success: function(template) {
          $( options.context ).html( template );
          if ( $.isFunction( options.callback) ) {
            options.callback();
          }
        }
      });

    }
  }

  // Get the app hooked to hasheesh
  window.onhashchange = hasheesh.load;
})(document, window, jQuery);
