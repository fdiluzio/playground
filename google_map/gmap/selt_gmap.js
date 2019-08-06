// #########################################################################
//  CREATE MAP INSTANCE AND ADD MAP READY LISTENER


// selt.gmap = new selt.createGoogleMap('map', {zoom:9}, <?= json_encode( $poi_array ) ?>);
//
// google.maps.event.addDomListener(window, 'load', function() {
// 	selt.gmap.initialize(function(){
// 			// do something special when the map is done
//
// 	});
// });

// DIRECTIONS

// selt.gmap.enableGoogleDirections()
// startAddress = "Hochkönigstraße 5761 Maria Alm Österreich"
// endAddress = "Dachau"
// selt.gmap.showRoute(startAddress, endAddress);
// #########################################################################
// #########################################################################

if (typeof selt === 'undefined') {
    selt = {};
}

selt.createGoogleMap = function (messenger) {

    'use strict';


    this.mapInstance = null;
    this.isReady     = false;
    this.messenger = messenger;

    // private variables

    var mapCanvas,
        mapOptions,
        clusterOptions,
        googleMarkerList,
        markerGroups = {};


    var contentWindowTemplate = '' +
        '<div>\n' +
        '<h2 class="theme-color font-bold">{name}</h2>' +
        '<p>{street}, {city}<br/>\n' +
        '{hours}<br/>{phone}<br/>\n' +
        '{email}<br/>' +
        '<a href="{pageurl}" target="_top">{name}</a></p>' +
        '</div>';

    var placeHolders;


    // #########################################################################
    // Google Map Ready Event
    // #########################################################################


    this.initialize = function (mapElement, options, callback) {

        if (!this.isReady) {

            mapCanvas = mapElement[0];

            googleMarkerList = [];

            mapOptions = {
                zoom: null,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: mapStyle,
                scrollwheel: false,
                center: {
                    lat: 47.2855501,
                    lng: 11.3087507
                }
            };

            clusterOptions = {
                imagePath: 'markerclusterer/m',
                minimumClusterSize: 4,
                zoomOnClick: false,
                averageCenter: true,
                gridSize: 50
            };


            $.extend(mapOptions, options);

            this.mapInstance = new google.maps.Map(mapCanvas, mapOptions);

            this.bounds = {all: new google.maps.LatLngBounds()};

            // this.markerCluster = new MarkerClusterer(this.mapInstance, [], clusterOptions);

            this.infowindow = new google.maps.InfoWindow();

            //this.addKML();

            var mapInstance = this.mapInstance;
            if (typeof callback === 'function') {
                callback(mapInstance);
            }


            this.isReady = true;

        }
    };


    // #########################################################################
    //  MARKERS
    // #########################################################################

    // --------------------------------------------------
    // get marker and properties
    // --------------------------------------------------

    this.getMarker = function getMarker(index) {
        if (index < googleMarkerList.length) {
            return googleMarkerList[index];
        } else {
            return null;
        }
    };

    this.getMarkerCood = function getMarkerCood(index) {

        if (typeof index === 'undefined') {
            index = 0;
        }

        var marker = this.getMarker(index),
            lat, lng;

        if (marker) {

            lat = parseFloat(marker.lat);
            lng = parseFloat(marker.lng);

            // check value
            if (isNaN(lat) || isNaN(lng)) {
                return null;
            } else {
                return {
                    lat: lat,
                    lng: lng
                };
            }
        }
    };

    this.getMarkerProperty = function getMarkerProperty(index, prop) {
        var marker = this.getMarker(index);
        if (marker && marker[prop] && marker.hasOwnProperty(prop)) {
            return marker[prop];
        }

        return null;

    };

    // --------------------------------------------------
    // show hide marker group
    // --------------------------------------------------

    this.toggleGroup = function toggleGroup(params) {


        if (markerGroups[params.type]) {

            markerGroups[params.type].forEach(function (marker) {
                if (!marker.getVisible()) {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            });

            // if (params.checked) {
            //     this.cropToBounds('all');
            // }
        }
    };

    // --------------------------------------------------
    // custom marker icn
    // --------------------------------------------------

    function getDefaultMarkerIcon(options) {

        var mapIcon = {
            path: 'M18,7c0,3.8-7,15-7,15S4,10.8,4,7s3.1-7,7-7S18,3.1,18,7z',
            fillColor: '#CD1316',
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: '#000',
            strokeOpacity: 0.1,
            scale: 1,
            anchor: new google.maps.Point(20, 33)
        };

        $.extend(mapIcon, options);

        return mapIcon;

    }

    // create custom icon

    function getMarkerIcon(type) {
        var options    = {};
        options.path   = 'M20.9,14.9c0-5.8-4.7-10.5-10.5-10.5C4.7,4.5,0,9.1,0,14.9c0,8.3,10.5,20.6,10.5,20.6S20.9,23.2,20.9,14.9zM5.2,14.3c0-2.8,2.3-5.1,5.1-5.1s5.1,2.3,5.1,5.1s-2.3,5.1-5.1,5.1c-2.8,0.1-5.1-2.1-5.1-4.9C5.2,14.5,5.2,14.4,5.2,14.3z';
        options.anchor = new google.maps.Point(10.2, 35.2);
        switch (type) {
            case 'shops':
                options.fillColor   = '#C8D400';
                options.strokeColor = '#484d00';
                break;
            case 'rent':
                options.fillColor   = '#0084BE';
                options.strokeColor = '#003d5e';
                break;
            case 'homes':
                options.fillColor   = '#CC065E';
                options.strokeColor = '#500628';
                break;
        }
        return getDefaultMarkerIcon(options);
    }

    // create highlight icon

    function getSelectedMarkerIcon(type) {
        var options    = {};
        options.path   = 'M26,27.4c-0.8,1.3-1.7,2.3-2.3,3.1c6.6,0.4,11,1.8,12.6,2.9c-1.9,1.3-7.5,3-16.2,3s-14.3-1.8-16.2-3c1.6-1,6-2.5,12.6-2.9c-0.6-0.8-1.5-2-2.3-3.1C6,28.3,0,30.7,0,33.5c0,3.6,9,6.4,20,6.4c11.1,0,20-2.8,20-6.4C40.1,30.7,34.1,28.3,26,27.4z M20,7.9C20,7.9,20,7.9,20,7.9c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5h0C22.5,9,21.4,7.9,20,7.9z M20.1,0C14.3,0,9.6,4.7,9.6,10.5c0,8.3,10.5,20.6,10.5,20.6s10.5-12.4,10.5-20.6C30.6,4.7,25.9,0,20.1,0zM20,15.6c-2.8,0-5.1-2.3-5.1-5.1c0-2.8,2.3-5.1,5.1-5.1c2.8,0,5.1,2.3,5.1,5.1C25.1,13.3,22.8,15.6,20,15.6z';
        options.anchor = new google.maps.Point(20, 33);
        switch (type) {
            case 'shops':
                options.fillColor   = '#C8D400';
                options.strokeColor = '#484d00';
                break;
            case 'rent':
                options.fillColor   = '#0084BE';
                options.strokeColor = '#003d5e';
                break;
            case 'homes':
                options.fillColor   = '#CC065E';
                options.strokeColor = '#500628';
                break;
        }
        return getDefaultMarkerIcon(options);
    }

    // highlight a particular icon

    this.highlightMarker = function (matchProp, value) {
        var i;

        if (!this.isReady || googleMarkerList.length === 0) {
            return;
        }

        for (i = 0; i < googleMarkerList.length; i++) {
            // googleMarkerList[i].setIcon(getDefaultMarkerIcon());
            googleMarkerList[i].setAnimation(null);
            googleMarkerList[i].setIcon(getDefaultMarkerIcon());
        }

        for (i = 0; i < googleMarkerList.length; i++) {
            if (googleMarkerList[i] && this.getMarkerProperty(i, matchProp) && String(this.getMarkerProperty(i, matchProp)) === value) {
                googleMarkerList[i].setIcon(getZoomMarkerIcon());
                googleMarkerList[i].setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    };

    // --------------------------------------------------
    // process marker list sent from module
    // --------------------------------------------------

    this.coordsToMarker = function (coordinatesObj, callback) {

        var coordinatesArray = Object.values(coordinatesObj),
            lastIndex        = coordinatesArray.length - 1,
            me               = this,
            iwContent,
            position;

        console.log(coordinatesArray);

        coordinatesArray.forEach(function (item, index) {


            if (item.location.latitude && item.location.longitude) {

                position = new google.maps.LatLng(item.location.latitude, item.location.longitude);

                placeHolders = {
                    '{name}': item.name,
                    '{hours}': item.openinghours,
                    '{phone}': item.address.phone,
                    '{street}': item.address.street,
                    '{city}': item.address.city,
                    '{email}': item.address.mail,
                    '{pageurl}': item.landingpage
                };

                placeHolders = Object.entries(placeHolders);
                iwContent    = contentWindowTemplate;

                placeHolders.forEach(function (item) {
                    var regex = new RegExp(item[0], 'g');
                    iwContent = iwContent.replace(regex, item[1]);
                });

                if (index === lastIndex) {
                    me.placeMarker(me.mapInstance, position, iwContent, item, callback);
                } else {
                    me.placeMarker(me.mapInstance, position, iwContent, item);
                }
            }

        });

    };

    // --------------------------------------------------
    // place a marker on the map
    // --------------------------------------------------

    this.placeMarker = function (map, position, iwContent, item, callback) {

        if (!map) map = this.mapInstance;

        var me = this;

        var icon;

        if (item.highlight_location === 1){
            icon = getSelectedMarkerIcon(item.theme);
        } else {
            icon = getMarkerIcon(item.theme);
        }

        var marker = new google.maps.Marker({
            map: map,
            position: position,
            icon: icon,
            iwContent: iwContent
        });

        var infowindow = this.infowindow;

        google.maps.event.addListener(map, 'click', function (e) {
            infowindow.close();
        });

        function showIwContent() {
            var iwContent;
            iwContent = '<section class="iw-container">';
            iwContent += marker.iwContent;
            iwContent += '</section>';
            infowindow.setContent(iwContent);
            infowindow.open(map, marker);
        }

        google.maps.event.addListener(marker, 'mouseover', function () {

            showIwContent();

            var message = {
                name: "gmap.update_logobar",
                params: {id:item.brandlogogroup_objid}
            };

            me.messenger.sendMessage(message);

        });

        google.maps.event.addListener(marker, 'click', function () {

            showIwContent();

            var message = {
                name: "gmap.update_logobar",
                params: {id:item.brandlogogroup_objid}
            };

            me.messenger.sendMessage(message);

        });


        // put markers into bounds object
        var mPos;
        try {
            mPos = marker.getPosition();

            // create marker group bounds
            this.bounds.all.extend(mPos);

            if (!this.bounds[item.theme]) {
                this.bounds[item.theme] = new google.maps.LatLngBounds();
            }
            this.bounds[item.theme].extend(mPos);


        } catch (e) {
            console.log('no marker position: ', item);
            console.log('##############################################');
        }


        // save references to markers
        if (!markerGroups[item.theme]) {
            markerGroups[item.theme] = [];
        }
        markerGroups[item.theme].push(marker);
        googleMarkerList.push(marker);

        if (this.markerCluster) {
            this.markerCluster.addMarker(marker);
        }

        //map.setCenter(position);

        if (typeof callback === 'function') {
            callback();
        }

    };

    // --------------------------------------------------
    // center map and zoom to show all markers
    // --------------------------------------------------

    this.cropToBounds = function (type, zoom_override) {

        //center the map to the geometric center of all markers
        if (this.bounds[type]) {

            var boundsObj = this.bounds[type];


            this.mapInstance.setCenter(boundsObj.getCenter());
            this.mapInstance.fitBounds(boundsObj);
            var mymap = this.mapInstance;

            var listener = this.mapInstance.addListener("bounds_changed", function () {

                var currentZoom = mymap.getZoom();

                if (zoom_override) {
                    mymap.setZoom(currentZoom + zoom_override);
                }
                google.maps.event.removeListener(listener);
            });
        }
    };


    // #########################################################################
    //  STYLE
    // #########################################################################

    var mapStyle = [{
        stylers: [{
            hue: "#f5f5f4"
        }, {
            saturation: -80
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            lightness: 100
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }];
};
