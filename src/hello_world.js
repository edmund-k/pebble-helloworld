// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64;}else if(isNaN(i)){a=64;}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a);}return t;},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r);}if(a!=64){t=t+String.fromCharCode(i);}}t=Base64._utf8_decode(t);return t;},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128);}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128);}}return t;},_utf8_decode:function(e){var t="";var n,r,c1,c2;n=r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++;}else if(r>191&&r<224){c1=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c1&63);n+=2;}else{c1=e.charCodeAt(n+1);c2=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c1&63)<<6|c2&63);n+=3;}}return t;}};

Pebble.addEventListener('ready', function(e) {
  console.log('JavaScript app ready and running!');
  // Define the string
  var string = 'Hello World!';
  
  // Encode the String
  var encodedString = Base64.encode(string);
  console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
  
  // Decode the String
  var decodedString = Base64.decode(encodedString);
  console.log(decodedString); // Outputs: "Hello World!"
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
