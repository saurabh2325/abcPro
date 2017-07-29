'use strct';

angular.module('dashyAngular').controller('stateCtrl', function ($scope, $modalInstance, items, $http) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  
  $scope.templateUrl = 'views/particles/state/state_view.html?v='+window.app_version  
         
  $scope.addState = function(){
    $scope.templateUrl = 'views/particles/state/state_add.html?v='+window.app_version
  };

  $scope.showState = function(){
    $scope.templateUrl = 'views/particles/state/state_view.html?v='+window.app_version
  };
/*--------------------  For save state-----------------------------*/
   $scope.data = {} ;
  $scope.saveState = function() {
    //console.log($scope.data);
    $http.post('/newState', $scope.data).success(function(request, response){
     // console.log(response);
      alert("State save successfully");
      $scope.data = {}
      stateview();
    });
    /*$modalInstance.close($scope.selected.item);*/
  };

  /*--------------------  For Delete state -----------------------------*/
    
   $scope.removeState = function(id){
     // console.log(id);
      if(id){
         $http.delete('/newState/' + id).success(function(response){
          stateview();
          alert('State delete successfully.');
         });
      };
    };
  /*--------------------  For view state -----------------------------*/
    $scope.state = {};
    var stateview = function(){
      $http.get('/statesview').success(function(response){
       // console.log('state list request');
        $scope.state = response;
       // console.log($scope.state);
      });
    };
    stateview();
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  


 /*-------------------- Countries-----------------------------*/
 
 $scope.countries = {};
 var countriesView = function(){
  $http.get('/countriesview').success(function(response){
    //console.log('Countries list request');
     $scope.countries = response;
    // console.log($scope.countries);
  });
 };

 countriesView();
});
