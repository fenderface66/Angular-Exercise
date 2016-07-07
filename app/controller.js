/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

	angular
		.module('app-task')
		.controller('MainController', MainController);

	MainController.$inject = ['LocalStorage', 'FlickrData', '$scope'];


	function MainController(LocalStorage, FlickrData, $scope) {
		var self = this; 
		////////////  function definitions
		var request = {
			tags: "potato",
			tagmode: "all",
			format: "json",
			jsoncallback: "JSON_CALLBACK"
		}
		$scope.items = [];
		FlickrData.query('JSONP', '/services/feeds/photos_public.gne', request, {})
			.then(function(obj) {
			$scope.obj = obj.data;
			angular.forEach($scope.obj.items, function(value) {
				this.push(value);
			}, $scope.items);



			console.log($scope.items);
		})
	}
})();