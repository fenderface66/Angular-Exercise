;
(function() {

    angular
        .module('app-task')
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'FlickrData', '$scope', '$location', '$rootScope'];


    function MainController(LocalStorage, FlickrData, $scope, $location, $rootScope) {
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

                    this.push(value);
                }, $scope.loadingBay);

            })

        $scope.loadMore = function loadMore() {
            var counter = 0;
            angular.forEach($scope.loadingBay, function(value, key) {
                counter++;
                if (key === $scope.items.length && counter < 2) {
                    this.push(value);
                    $scope.$apply();
                } else {
                    counter = 0;
                }
            }, $scope.items);
        }






    }
})();
