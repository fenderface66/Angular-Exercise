;(function() {

  angular
    .module('app-task')
    .factory('getDataFromAPI', getDataFromAPI);

  getDataFromAPI.$inject = ['$http', 'LocalStorage'];


  ////////////


  function getDataFromAPI($http, LocalStorage) {

    return {
      loadData: loadData
    };

  }


})();
