/* 
 * Neighborhood Map project is about displaying museum locations on google map. 
 * Initially I have kept five locations in the list. It is be increased to any
 * number. "model" containes listValues array having name of museums in San 
 * Francisco CA.
 */
"use strict";
var model = {
    listValues: ["Alcatraz Island",
        "San Francisco Museum of Modern Art",
        "California Academy of Sciences",
        "Asian Art Museum",
        "Legion of Honor"
    ]
};
/**
 * AppViewModel is knockout object which contains observable elements and also
 * contains methods to manipulate data.
 * @constructor
 */
var AppViewModel = {
    mapObj: {},
    marker: {},
    infoWindow: {},
    currentSelected: ko.observable(),
    markerData: ko.observableArray([]),
    Values: ko.observableArray(model.listValues),
    searchValue: ko.observable(''),
    /*
     * Initialize the google map after window load is done.
     */
    initializeMap: function() {
        var insideDiv = document.createElement('div');
        insideDiv.id = 'mapA';
        /* 
         * For the map to be displayed, the div with id map must be
         * appended to googleMap id in index.html.
         */
        document.getElementById('googleMap').appendChild(insideDiv);
        var locations = [];
        var mapOptions = {
            center: {
                lat: 37.7833,
                lng: 122.4167
            },
            zoom: 15
        };
        AppViewModel.mapObj = new google.maps.Map(document.getElementById('mapA'), mapOptions);
        /* 
         * createMapMarker(placeData) reads Google Places search results to create map pins.
         * placeData is the object returned from search results containing information
         * about a single location.
         */
        function createMapMarker(placeData) {
            /*
             * The next lines save location data from the search result object to local variables.
             */
            var lat = placeData.geometry.location.lat(); // latitude from the place service
            var lon = placeData.geometry.location.lng(); // longitude from the place service
            var bounds = window.mapBounds; // current boundaries of the map window
            AppViewModel.getData(placeData);
            /*
             * this is where the pin actually gets added to the map.
             */
            bounds.extend(new google.maps.LatLng(lat, lon)); // bounds.extend() takes in a map location object
            AppViewModel.mapObj.fitBounds(bounds); // fit the map to the new marker
            AppViewModel.mapObj.setCenter(bounds.getCenter()); // center the map
        }
        /* 
         * @callback makes sure the search returned results for a location.
         * If so, it creates a new map marker for that location.
         */
        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
                alert("OVER_QUERY_LIMIT reached. Please try again tomorrow.");
            }
        }
        /*
         * pinPoster(locations) takes in the array of locations
         * and fires off Google place searches for each location.
         */
        function pinPoster(loc) {
            /*
             * creates a Google place search service object. PlacesService does the work of
             * actually searching for location data.
             */
            var service = new google.maps.places.PlacesService(AppViewModel.mapObj);
            /*
             * Iterates through the array of locations, creates a search object for each location.
             */
            var len = loc.length;
            for (var i = 0; i < len; i++) {
                /* 
                 * the search request object.
                 */
                var request = {
                    location: new google.maps.LatLng(37.7833, 122.4167),
                    radius: '500',
                    query: loc[i]
                };
                /*
                 * Actually searches the Google Maps API for location data and runs the callback
                 * function with the search results after each search.
                 */
                service.textSearch(request, callback);
            }
        }
        window.mapBounds = new google.maps.LatLngBounds(); // Sets the boundaries of the map based on pin locations
        //locations = AppViewModel.Values();// locations is an array of location strings returned from locationFinder()
        locations = model.listValues;
        pinPoster(locations); // pinPoster(locations) creates pins on the map for each location in the locations array
    },
    /* 
     * search function is filter function which filters the values from the serach 
     * input element on HTML, when user enters something for search.
     */
    search: function(value) {
        var tempArray = [];
        for (var i = 0; i < model.listValues.length; i++) {
            if (model.listValues[i].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                tempArray.push(model.listValues[i]);
            }
        }
        AppViewModel.Values(tempArray);
        var markerItems = AppViewModel.markerData();
        for (var i = 0; i < markerItems.length; i++) {
            if (markerItems[i].title.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                markerItems[i].setVisible(false);
            } else {
                markerItems[i].setVisible(true);
            }
        }
    },
    /*
     * toggleMarker method toggles animation for marker.
     */
    toggleMarker: function() {
        AppViewModel.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            AppViewModel.marker.setAnimation(null);
        }, 1400);
    },
    /*
     * for google map api async call if any error occurs, this method googleError is called.
     */
    googleError: function() {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            alert("Google Map can not be loaded...Please Check your internet" + " Connection or check if site is blocked or please try later.");
        }
    },
    /* 
     * This function is trigerred when any list item on left menu is clicked.
     */
    listenListClickEvent: function(item, event) {
        var markerItems = AppViewModel.markerData();
        AppViewModel.infoWindow.close();
        AppViewModel.currentSelected(item);
        for (var i = 0; i < markerItems.length; i++) {
            if (item === markerItems[i].title) {
                google.maps.event.trigger(markerItems[i], 'click');
            }
        }
    },
    /* 
     * This function is trigerred when marker on the right hand side map is clicked.
     */
    listenMarkerClickEvent: function(clickedLoc) {
        var markerItems = AppViewModel.markerData();
        AppViewModel.infoWindow.close();
        for (var i = 0; i < markerItems.length; i++) {
            if (clickedLoc === markerItems[i].title) {
                AppViewModel.currentSelected(clickedLoc);
                AppViewModel.marker = AppViewModel.markerData()[i];
            }
        }
        AppViewModel.marker.setPosition(AppViewModel.marker.position);
        AppViewModel.toggleMarker();
        AppViewModel.infoWindow.setContent(AppViewModel.marker.content);
        AppViewModel.infoWindow.open(AppViewModel.mapObj, AppViewModel.marker);
    },
    /* 
     * getData function access additional information about each location by using 
     * third party wikipedia API. This is done thorugh jQuery ajax call. 
     * Error handling is done using .fail method.
     */
    getData: function(placeData) {
        var message = '';
        var remoteUrlWithOrigin = encodeURI("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + placeData.name + "&format=json&callback=?");
        //AppViewModel.markerData([]);
        $.ajax({
            url: remoteUrlWithOrigin,
            dataType: 'json',
            async: true,
            type: 'GET',
            headers: {
                'Api-User-Agent': 'Example/1.0'
            },
            timeout: 3000,
            success: function(data) {
                var contentString = '<div id="marker-data"><h6>' + data[0] + '</h6><p>' + data[2][0] + '</p><ul>';
                var halfString = '</ul></div>';
                var html = '';
                for (var i = 0; i < data[1].length; i++) {
                    html = html + '<li><a href="' + data[3][i] + '">' + data[1][i] + '</a></li>';
                }
                contentString = contentString + html + halfString;
                /* 
                 * marker is an object with additional data about the pin for a single location
                 */
                AppViewModel.marker = new google.maps.Marker({
                    map: AppViewModel.mapObj,
                    position: placeData.geometry.location,
                    title: data[0],
                    content: contentString,
                    icon: 'img/museum.png'
                });
                AppViewModel.markerData.push(AppViewModel.marker);
                /* infoWindows are the little helper windows that open when you click
                 * or hover over a pin on a map. They usually contain more information
                 * about a location.
                 */
                AppViewModel.infoWindow = new google.maps.InfoWindow({
                    maxWidth: 200
                });
                google.maps.event.addListener(AppViewModel.infoWindow, 'closeclick', function(event) {
                    AppViewModel.currentSelected('');
                });
                AppViewModel.currentSelected('');
                google.maps.event.addListener(AppViewModel.marker, 'click', function() {
                    AppViewModel.listenMarkerClickEvent(data[0]);
                });
            },
            error: (function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 404) {
                    message = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    message = 'Internal Server Error [500].';
                } else if (textStatus === 'parsererror') {
                    message = 'Requested JSON parse failed.';
                } else if (textStatus === 'timeout') {
                    message = 'Time out error.';
                } else if (textStatus === 'abort') {
                    message = 'Ajax request aborted.';
                } else {
                    message = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert("Additional information about " + placeData.name + " location can not be found because of the following error " + message + "... Please try again later.");
            })
        });
    }
};
ko.applyBindings(AppViewModel);
AppViewModel.searchValue.subscribe(AppViewModel.search);
/* 
 * view.
 */
var view = {
    init: function() {
        window.addEventListener('resize', function(e) { // Listen for resizing of the window and adjust map bounds
            AppViewModel.mapObj.fitBounds(mapBounds); // Make sure the map bounds get updated on page resize
        });
    }
};
view.init();