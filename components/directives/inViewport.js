;
(function() {


    'use strict';
    angular.module('app-task')
        .directive('inView', inView);


    function inView($window) {
        // Definition of directive
        return {
            // scope: {
            //     scroll: '=scrollPosition'
            // },
            // link: function(scope, element, attrs) {
            //
            //     var de = document.documentElement;
            //     var box = element.getBoundingClientRect();
            //     var top = box.top + window.pageYOffset - de.clientTop;
            //     var left = box.left + window.pageXOffset - de.clientLeft;
            //     console.log(left);
            //     return {
            //         top: top,
            //         left: left
            //     };
            // }
        };
    }

})();
