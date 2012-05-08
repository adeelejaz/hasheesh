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

      if ( typeof namespace[hashObj] === "object" && typeof namespace[hashObj].init === "function" ) {
        namespace[hashObj].init();
      } else {
        yepnope( "js/app/" + hashObj + "/init.js" );
      }

    },

    // Helper function to load templates
    loadTemplate: function(file, context, callback) {

      if ( !context ) {
        context = "#container";
      }

      $.get( "js/app/" + file + ".html", function(template) {
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
