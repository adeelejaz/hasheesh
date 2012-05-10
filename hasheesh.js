(function(window, undefined){
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
        $.ajax({
          url: "js/app/" + hashObj + "/init.js",
          dataType: "script",
          success: function() {
            hasheesh.namespace[hashObj].init();
          }
        });
      }

    },

    // Helper function to load templates
    loadTemplate: function(file, context, callback) {

      if ( !context ) {
        context = "#container";
      }

      $.ajax({
        url: "js/app/" + file + ".html",
        dataType: "html", 
        success: function(template) {
          $( context ).html( template );
          if ( $.isFunction(callback) ) {
            callback();
          }
      });

    }
  }

  // Get the app hooked to hasheesh
  window.onhashchange = hasheesh.load;
})(window);
