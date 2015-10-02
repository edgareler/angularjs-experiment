(function(){
    'use strict';
    
    angular
        .module('app.grid')
        .controller('Grid', ['$scope', '$sce', Grid]);
    
    function Grid($scope, $sce){
        $scope.gridData = jsonData;
        
        $scope.getTypeImagePrefix = function(type){
            if(type === "firewall"){
                return "wall";
            }
            
            return "pc";
        };
        
        $scope.getStateColor = function(state){
            if(state === "Running"){
                return "blue";
            }
            
            if(state === "Rejected"){
                return "red";
            }
            
            if(state === "Complete" || state === "Accepted"){
                return "green";
            }
            
            return "gray";
        };
        
        $scope.getMetricsTendency = function(tendency){
            if(tendency === "idle"){
                return "circle-idle";
            }
            
            return "arrow-" + tendency;
        };
        
        $scope.getBuildDoneColor = function(done){
            if(done === "true"){
                return "blue";
            }
            
            return "gray";
        };
        
        $scope.getFullPercentage = function(number){
            return parseInt(number * 100);
        };
        
        $scope.getResultAction = function(action){
            var resultAction = "";
            
            if(action === "merge"){
                resultAction = createResultButton("Merged Build", true, false);
            } else if(action === "find_issues") {
                resultAction = createResultButton("Find Issues", false, false);
            } else if(action === "deploy") {
                resultAction = createResultButton("Deploy", false, true);
            }
            
            return $sce.trustAsHtml(resultAction);
        };
    }
})();