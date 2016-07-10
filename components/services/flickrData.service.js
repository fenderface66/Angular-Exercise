;
(function() {


    'use strict';

    angular
        .module('app-task')
        .factory('FlickrData', [
            '$http', '$q', 'CONSTANTS', FlickrData
        ]);
    // Query making service
    function FlickrData($http, $q, CONSTANTS, $scope, $filter) {

        //Add method to service
        var service = {
            query: query
        };

        return service;

        //////////////// definition

        //Query method
        function query(method, url, params, data) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: CONSTANTS.API_URL + url,
                params: params,
                data: data
            }).then(function(data) {
                console.log(data);

                if (!data.config) {
                    console.log('Server error occured.');
                }
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }


})();
