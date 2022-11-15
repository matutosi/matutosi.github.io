// HTML5 and JavaScript Developper Guide
//    ISBN: 978-4-798102968-6
//    http://www.shoeisha.co.jp/book/download/
//    Chap04 Sec03 c4_3002.html

// settings for GPS
var watchId = 0;
var positionOptions = {
  enableHighAccuracy: true,
  timeout: 60000,
  maximumAge: 0
};
var locations = {
  lat: [],
  lon: [],
  acc: []
};

function getLat() { return String(locations.lat[locations.lat.length - 1]); }
function getLon() { return String(locations.lon[locations.lon.length - 1]); }
function getAcc() { return String(locations.acc[locations.acc.length - 1]); }


// GPS success
//   Use with tags below in html
//   <input type="button" value="start" onclick="startGPS()" />
//   <input type="button" value="stop" onclick="stopGPS()" />
//   <div id="poslog" ></div>
function successCallback(position){
  locations.lat.push(position.coords.latitude);
  locations.lon.push(position.coords.longitude);
  locations.acc.push(position.coords.accuracy);
}

// GPS error
function errorCallback(positionError) {
  document.getElementById('poslog').innerHTML += positionError.code + ', ' + positionError.message+ '<br>';
}

// stop GPS
function stopGPS(obj) {
  navigator.geolocation.clearWatch(watchId);
  obj.replaceWith( createStartGPSButton() );
}

// start GPS
function startGPS(obj) {
  watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, positionOptions);
  obj.replaceWith( createStopGPSButton() );
}
