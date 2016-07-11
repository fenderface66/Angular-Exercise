;
(function() {

    angular
        .module('app-task')
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'FlickrData', '$scope', '$location', '$window'];


    function MainController(LocalStorage, FlickrData, $scope, $location, $window) {
        var self = this;
        //Create query params
        var request = {
            tags: "potato",
            tagmode: "all",
            format: "json",
            jsoncallback: "JSON_CALLBACK"
        }
        //Store scope variables
        $scope.disableFilter = '';
        $scope.items = [];
        $scope.loadingBay = [];
        $scope.tags = [];
        $scope.post = $location.hash();
        //Call query service with Flickr url
        FlickrData.query('JSONP', '/services/feeds/photos_public.gne', request, {})
            .then(function(obj) {
                $scope.obj = obj.data;
                console.log($scope.obj);
                angular.forEach($scope.obj.items, function(value, key) {

                    key < 5 && $scope.items.push(value);
                    value.tagString = value.tags;
                    $scope.tags.push(value.tags.split(" "));
                    value.tags = value.tags.split(" ");
                    value.author = value.author.split("(");
                    value.author[1] = value.author[1].split(")");
                    value.author[1] = value.author[1][0];
                    this.push(value);
                }, $scope.loadingBay);

            })
        $scope.filtered = false;
        //Adds more objects to $scope items once scroll directive is used or search filter
        $scope.loadMore = function loadMore(all) {
            var counter = 0;
            //If either search is being used for first time or scroll directive is being used
            if (all === true && $scope.filtered === false || all !== true) {
                angular.forEach($scope.loadingBay, function(value, key) {
                    counter++;
                    //Push 1 item into $scope.items for ng-repeat
                    if (all !== true && $scope.filtered === false) {
                        if (key === $scope.items.length && counter < 2) {
                            this.push(value);
                            $scope.$apply();
                        } else {
                            counter = 0;
                        }
                    //Push all items into $scope.items for tag search to run against  
                    } else if (all === true) {
                        console.log('hello');
                        if (key === $scope.items.length + 1) {
                            console.log('bye');
                            this.push(value);
                            $scope.filtered = true;
                        }
                    }


                }, $scope.items);
            }
        }







    }
})();
