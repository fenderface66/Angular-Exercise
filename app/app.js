
;(function() {


	/**
   * Definition of the main app module and its dependencies
   */
	angular
		.module('app-task', [
		'ngRoute'
	])
		.config(config);

	// safe dependency injection
	// this prevents minification issues
	config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

	/**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
	function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

		$locationProvider.html5Mode(false);

		// routes
		$routeProvider
			.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
			.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
			.otherwise({
			redirectTo: '/'
		});

		$httpProvider.interceptors.push('authInterceptor');
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

	}


	/**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
	angular
		.module('app-task')
		.factory('authInterceptor', authInterceptor);

	authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

	function authInterceptor($rootScope, $q, LocalStorage, $location) {

		return {

			// intercept every request
			request: function(config) {
				config.headers = config.headers || {};
				return config;
			},

			// Catch 404 errors
			responseError: function(response) {
				if (response.status === 404) {
					$location.path('/');
					return $q.reject(response);
				} else {
					return $q.reject(response);
				}
			}
		};
	}


	/**
   * Run block
   */
	angular
		.module('app-task')
		.run(run);

	run.$inject = ['$rootScope', '$location'];

	function run($rootScope, $location) {

		// put here everything that you need to run on page load

	}


})();