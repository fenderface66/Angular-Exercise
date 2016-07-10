;
(function() {

    angular
        .module('app-task')
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'FlickrData', '$scope', '$location', '$window'];


    function MainController(LocalStorage, FlickrData, $scope, $location, $window) {
        var self = this;
        ////////////  function definitions
        var request = {
            tags: "potato",
            tagmode: "all",
            format: "json",
            jsoncallback: "JSON_CALLBACK"
        }
        $scope.disableFilter = '';
        $scope.items = [];
        $scope.loadingBay = [];
        $scope.tags = [];
        $scope.post = $location.hash();

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
        $scope.loadMore = function loadMore(all) {
            var counter = 0;
            if (all === true && $scope.filtered === false || all !== true) {
                angular.forEach($scope.loadingBay, function(value, key) {
                    counter++;
                    if (all !== true && $scope.filtered === false) {
                        if (key === $scope.items.length && counter < 2) {
                            this.push(value);
                            $scope.$apply();
                        } else {
                            counter = 0;
                        }
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
