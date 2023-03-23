// Creating map object
var map = L.map("map", {
  center: [51.8985, -8.294286],
  zoom: 30,
});

// Adding tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var allData = [
  {
    lat: 51.8985,
    long: 8.4756,
    Name: "Cork, Ireland",
  },
  {
    lat: 53.3498,
    long: 6.2603,
    Name: "Dublin,Ireland",
  },
  {
    lat: 53.2707,
    long: 9.0568,
    Name: "Galway,Ireland",
  },
  {
    lat: 51.5072,
    long: 0.1276,
    Name: "London,UK",
  },
  {
    lat: 43.0,
    long: -75.0,
    Name: "NewYork,USA",
  },
  {
    lat: -22.908333,
    long: -43.196388,
    Name: "Rio de Janeiro,Brazil",
  },
  {
    lat: 43.2965,
    long: 5.3698,
    Name: "Marseille,France",
  },
  {
    lat: 48.8566,
    long: 2.3522,
    Name: "Paris,France",
  },
  {
    lat: 35.6762,
    long: 139.6503,
    Name: "Tokya,Japan",
  },
  {
    lat: 33.8688,
    long: 151.2093,
    Name: "Sydney",
  },
  {
    lat: -26.195246,
    long: 28.034088,
    Name: "Johannesburg,South Africa",
  },
];

// Create a new marker cluster group
var markers = L.layerGroup();
// Add our marker cluster layer to the map
map.addLayer(markers);

function draw(data) {
  // Start fresh
  markers.clearLayers();

  // Loop through data
  for (var i = 0; i < data.length; i++) {
    // Set the latitude, longitude property to a variable
    var latitude = data[i].lat;
    var longitude = data[i].long;
    var popText = "<h3>" + data[i].Name + "</h3>";

    // Check for location property

    if (latitude) {
      // Add a new marker to the cluster group and bind a pop-up
      map.flyTo([latitude, longitude]);
      markers.addLayer(L.marker([latitude, longitude]).bindPopup(popText));
    }
  }
}

var countries = allData
  .map(function (row) {
    return row.Name;
  })
  .sort()
  .filter(function (v, i, arr) {
    // This selects only unique countries:
    // Only return a value if it's the first occurrence or if
    // it's different from the previous entry in the sorted(!) array
    return i === 0 || arr[i - 1] != v;
  });

draw(allData);

d3.select("#selectCountry")
  // Select all non-disabled options
  // to avoid touching the placeholder one
  .selectAll("option")
  .data(countries)
  .enter()
  .append("option")
  .attr("value", function (d) {
    return d;
  })
  .text(function (d) {
    return d;
  });

d3.select("#selectCountry").on("change", function () {
  var selection = this.value;
  var filteredData = allData.filter(function (d) {
    return d.Name == selection;
  });
  draw(filteredData);
});
// tileTemplateURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
// attrHTML = '&copy; <a href="https://www.openstreetmap.org/
// copyright">OpenStreetMap</a> contributors';
// L.tileLayer(tileTemplateURL, {attribution: attrHTML}).addTo(map);
