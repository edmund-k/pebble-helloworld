/* Create Base64 Object, 
 * Code courtesy of Nicholas Cerminara, Twitter: @nickforthough, 
 * Source: https://gist.github.com/ncerminara/11257943
 * Code below with some slight corrections to get it working. 
 */
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64;}else if(isNaN(i)){a=64;}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a);}return t;},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r);}if(a!=64){t=t+String.fromCharCode(i);}}t=Base64._utf8_decode(t);return t;},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128);}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128);}}return t;},_utf8_decode:function(e){var t="";var n,r,c1,c2;n=r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++;}else if(r>191&&r<224){c1=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c1&63);n+=2;}else{c1=e.charCodeAt(n+1);c2=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c1&63)<<6|c2&63);n+=3;}}return t;}};

/* Next: Build a simple configuration page with one text input field and a cancel / submit option.
 * Display that text in the watch app on the Pebble. 
 */
var configHtml;
configHtml  = "<html><head></head><body>";
configHtml += "<p>Hi, I'm an offline Pebble configuration page!</p>";
configHtml += "<p><textarea cols='40' rows='1' id='input'></textarea></p>";
configHtml += "<p><button id='save_button'>Set as new location</button></p>";
configHtml += "<script>";
configHtml += "function saveOptions() {";
  configHtml += "return {";
  configHtml += "input : document.getElementById(\"input\").value";
  configHtml += "};";
configHtml += "};";
configHtml += "document.getElementById(\"save_button\").addEventListener(\"click\", function() {";
  configHtml += "document.location = \"pebblejs://close#\" + encodeURIComponent(JSON.stringify(saveOptions()));";
configHtml += "}, false);";
configHtml += "</script>";
//configHtml += "<p><a href='javascript:document.location=\"pebblejs://close#\" + encodeURIComponent(JSON.stringify(saveOptions()))'>Working save options</a></p>";
//configHtml += "<p><a href='javascript:document.location=\"pebblejs://close#\" + encodeURIComponent(JSON.stringify({input:document.getElementById(\"input\").value}))'>Working a href</a></p>";
configHtml += "</body></html>";

Pebble.addEventListener('ready', function(e) {
  console.log('JavaScript app ready and running!');
});

Pebble.addEventListener('showConfiguration', function(e) {
  // Define the string
  //var string = 'Hello World!';
  
  // Encode the String
  //var encodedString = "PGh0bWw+CjxoZWFkPjwvaGVhZD4KPGJvZHk+CkknbSBhbiBvZmZsaW5lIFBlYmJsZSBjb25maWd1cmF0aW9uIHBhZ2UhCjwvYm9keT4KPC9odG1sPg=="; 
  var encodedString = Base64.encode(configHtml); 
  //console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
  
  // Decode the String
  //var decodedString = Base64.decode(encodedString);
  //console.log(decodedString); // Outputs: "Hello World!"

  // Show config page
  Pebble.openURL('data:text/html;charset=utf-8;base64,' + encodedString);
  //  Pebble.openURL('https://rawgit.com/edmund-k/pebble-helloworld/master/hello_world_config.html');
  console.log('Configuration window opened.');
});

Pebble.addEventListener("webviewclosed", function(e) {
  console.log('Configuration window closed.');
  
  //Get JSON dictionary
  var configuration = JSON.parse(decodeURIComponent(e.response));
  console.log("Configuration window returned: " + JSON.stringify(configuration));
  console.log("Configuration window returned: " + configuration.input);

  //Send to Pebble, persist there
  /*Pebble.sendAppMessage(
    {"KEY_INPUT": configuration.input},
    function(e) {
      console.log("Sending settings data...");
    },
    function(e) {
      console.log("Settings feedback failed!");
    }
  );*/
});
