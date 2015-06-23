Pebble.addEventListener('ready', function(e) {
  console.log('JavaScript app ready and running!');
});

Pebble.addEventListener('showConfiguration', function(e) {
  // Show config page
  Pebble.openURL('data:text/html;charset=utf-8;base64,PGh0bWw+CjxoZWFkPjwvaGVhZD4KPGJvZHk+CkknbSBhbiBvZmZsaW5lIFBlYmJsZSBjb25maWd1cmF0aW9uIHBhZ2UhCjwvYm9keT4KPC9odG1sPg==');
  console.log('Configuration window opened.');
});

Pebble.addEventListener("webviewclosed", function(e) {
  console.log('Configuration window closed.');
  //Get JSON dictionary
  /*var configuration = JSON.parse(decodeURIComponent(e.response));
  console.log("Configuration window returned: " + JSON.stringify(configuration));

  //Send to Pebble, persist there
  Pebble.sendAppMessage(
    {"KEY_INVERT": configuration.invert},
    function(e) {
      console.log("Sending settings data...");
    },
    function(e) {
      console.log("Settings feedback failed!");
    }
  );*/
});