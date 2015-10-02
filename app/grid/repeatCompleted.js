(function(){
    'use strict';
    
    angular
        .module('app.grid')
        .directive('repeatCompleted', ['$timeout', repeatCompleted]);

    function repeatCompleted($timeout){
        return function(scope, element, attrs) {
            if (scope.$last){
                $timeout(bootstraping, 0);
            }
        };
    };
})();