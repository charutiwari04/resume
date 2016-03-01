


## Neighborhood Map

This is a single page project featuring a map of museums in San Francisco, CA.  There are additional functionalities which are searching museums, based on search locations map will be filtered and at the same time list of locations will also be filtered. Locations when selected, will be highlighted. Third party data about the locations will also be displayed inside info windows of the map markers.


###How to run

1. To get started, check out the repository.
1. Open index.html file on your browser and start browsing.
1. By default all nine museum locations will be displayed on the list and also on the map.
1. On the left hand side is list of locations and search input area.
1. On the right hand side of the window displays google map.

### Various features

####Search Feature

*  Search can be performed for any museums in the list, As of now only listed nine museums can be searched.
*  Upon entering data the list and map will be updated as per the locations filtered. Only filtered data will be shown in list and map. 

####List highlight feature

*  When user clicks on any of the locations listed on left hand side list. this will be highlighted and also corresponding marker on map will start bouncing, at the same time the info window for that location will be opened automatically. This will show additional information and links about the location.
*  If user clicks again on same list location, marker animation/bouncing stops, info window gets closed and highlighting of list is also disappeared.

####Google map marker click feature

* If user clicks on any of the markers displayed on the map, the corresponding list value will be highlighted and the marker starts bouncing, info window also gets opened displaying additional information received through third party API.
*  The marker animation, list highlighting and info window stops/closes if user clicks again on the marker.

####Open site on your phone

*  To open site on your phone, user can run local server 

 ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```
*  Open browser and visit localhost:8080

###Possible errors
Following errors can be expected in case something goes wrong:-

*  Internet Connection error
*  Google Map not reachable
*  Error modal window will be displayed for any error related to third party API Wikipedia. It could be timeout, abort, network connection, page not found etc.


##Known restrictions
*  This app is limited to only five locations search. In future, more locations may be added.
