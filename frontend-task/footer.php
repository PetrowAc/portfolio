    <script src="js/plugins.js?v=<?php echo $js_version;?>"></script>
    <script src="js/main.js?v=<?php echo $js_version;?>"></script>
    
    <?php if (isset($map)) { ?>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGSkC6V65M5Z7dezBDaCKrufT8txpjGpE&callback=initMap&libraries=geometry" async></script>
        <script type="text/javascript">
            var searchArea,
                searchAreaRadius = 700000
                sliderMin = 0,
                sliderMax = 5000000,
                startLat = 47.4977975,
                startLng = 19.0403225,
                kmValue = (searchAreaRadius/1000).toFixed(0)+' km';

            $(".slider").slider({
                min: sliderMin,
                max: sliderMax,
                value: searchAreaRadius,
                change: function( event, ui ) {
                    kmValue = (ui.value/1000).toFixed(0)+' km';
                    $('.slider-label').html(kmValue);
                    searchAreaRadius = ui.value;
                    initMap();
                }
            });

            $('.slider').find('.ui-slider-handle').append('<label class="slider-label">'+kmValue+'</label>');
            
            function initMap() {
                var startLatLng = new google.maps.LatLng(startLat, startLng);
                
                const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: startLatLng,
                });
                
                searchArea = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.2,
                    map: map,
                    center: startLatLng,
                    radius: searchAreaRadius
                });

                var randomMarkers = [];
                var bounds = new google.maps.LatLngBounds();

                $.ajax({
                    url:'files/hotels.json',
                    dataType: "json", 
                    success: function(data){
                        $.each(data, function(key, data) {
                            var latLng = new google.maps.LatLng(data.lat, data.lng);
                            randomMarkers.push({latLng: latLng})
                        });

                        for (var i = 0; i < randomMarkers.length; i++) {
                            randomMarkers[i].marker = new google.maps.Marker({
                                position: randomMarkers[i].latLng,
                                map: map,
                            });
                            
                        }

                        for (var i = 0; i < randomMarkers.length; i++) {
                            if (google.maps.geometry.spherical.computeDistanceBetween(randomMarkers[i].marker.getPosition(), searchArea.getCenter()) <= searchArea.getRadius()) {
                                bounds.extend(randomMarkers[i].latLng);
                            } else {
                                var delMarkerId = randomMarkers[i].marker;
                                delMarkerId.setMap(null);
                            }
                        }
                        map.fitBounds(bounds);
                    }
                });

                google.maps.event.addListener(searchArea, 'mouseover', function () {
                    searchArea.set('editable',true);
                });
                google.maps.event.addListener(searchArea, 'mouseout', function () {
                    searchArea.set('editable',false);
                }); 
                google.maps.event.addListener(searchArea, 'radius_changed', function () {
                    searchAreaRadius = searchArea.getRadius();
                    $(".slider").slider('value',searchAreaRadius);
                    initMap();
                });
            }
        </script>
    <?php } ?>
</body>
</html>