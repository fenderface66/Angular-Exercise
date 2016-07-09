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
				$scope.tags = [];
				$scope.post = $location.hash();
				console.log($scope.post);
				console.log($scope.tags);
        FlickrData.query('JSONP', '/services/feeds/photos_public.gne', request, {})
            .then(function(obj) {
                $scope.obj = obj.data;
                console.log($scope.obj);
                angular.forEach($scope.obj.items, function(value) {
										value.tagString = value.tags;
                    $scope.tags.push(value.tags.split(" "));
                    value.tags = value.tags.split(" ");

                    this.push(value);
                }, $scope.items);

            })


    }
})();
