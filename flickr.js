//https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags

function JavaScriptFetch() {
  var search_val = document.getElementById("search").value;
  const loc = document.querySelector("#selectCountry").value;
  console.log(loc);
  let lat = "";
  let log = "";
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    console.log(element);
    if (element.Name.trim() === loc.trim()) {
      lat = element.lat;
      log = element.long;
      break;
    }
  }

  console.log(lat);
  console.log(log);
  newScript = document.createElement("script");
  request = "https://www.flickr.com/services/rest/?";
  request += "method=flickr.photos.search";
  request += "&lat=" + lat;
  request += "&lon=" + log;
  request += "&per_page=9";
  request += "&api_key=572341317429e1a19bd2a47659346a58";
  request += "&format=json";
  request += "&tags=";
  request += search_val;
  newScript.setAttribute("src", request + "&safe_search=3");
  document.getElementsByTagName("head")[0].appendChild(newScript);
  document.getElementById("outputDiv").innerHTML = "Loading ...";
  document.getElementById("submit").innerHTML = "Searching";
}

// function getLocation() {
//   newloc = document.createElement("loc");
//   request = "https://www.flickr.com/services/rest/?";
//   request += "method=flickr.photos.search";
//   request += "&api_key=572341317429e1a19bd2a47659346a58";
//   request +=
//     "&lat=" +
//     allData.map(function (row) {
//       return row.lat;
//     });
//   request +=
//     "&lon=" +
//     allData.map(function (row) {
//       return row.lat;
//     });
//   request += "&format=json";
//   request += "&per_page=9";
//   request += "&tags=";
//   newloc.setAttribute("src", request + "&safe_search=3");
//   document.getElementsByTagName("head")[0].appendChild(newloc);
//   document.getElementById("outputDiv").innerHTML = "Loading ...";
//   document.getElementById("submit").innerHTML = "Searching";
// }

function jsonFlickrApi(images) {
  newStr = "";
  const loc = document.querySelector("#selectCountry").value;
  if (images.photos.photo.length !== 0) {
    for (i = 0; i < images.photos.photo.length; i++) {
      url = "http://farm" + images.photos.photo[i].farm;

      url += ".static.flickr.com/";

      url += images.photos.photo[i].server + "/";

      url += images.photos.photo[i].id + "_";

      url += images.photos.photo[i].secret;
      url += "_s.jpg";

      newStr += " <img src = " + url + "> ";
      document.getElementById("submit").innerHTML = "Find Images";
    }
  } else {
    newStr = "No results found";
    document.getElementById("submit").innerHTML = "Find Images";
  }

  document.getElementById("outputDiv").innerHTML = newStr;
}
