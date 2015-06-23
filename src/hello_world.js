Pebble.addEventListener('ready', function(e) {
  console.log('JavaScript app ready and running!');
});

Pebble.addEventListener('showConfiguration', function(e) {
  // Show config page
  Pebble.openURL('https://rawgit.com/edmund-k/pebble-helloworld/master/hello_world_config.html');
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