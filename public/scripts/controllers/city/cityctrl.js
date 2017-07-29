angular.module('dashyAngular').controller('cityCtrl', function ($scope, $modalInstance, items, $http) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  
  $scope.templateUrl = 'views/particles/city/city_view.html?v='+window.app_version  
         
  $scope.addCity = function(){
    $scope.templateUrl = 'views/particles/city/city_add.html?v='+window.app_version
  };

  $scope.showCity = function(){
    $scope.templateUrl = 'views/particles/city/city_view.html?v='+window.app_version
  };

 /**
  *  Save City
  */
  
  $scope.data = {};
  $scope.saveCity = function () {
   // console.log($scope.data);
    $http.post('/newCity', $scope.data).success(function(request, response){
     // console.log(response);
      alert("City save successfully");
      $scope.data = {};
      cityView();
    });
  };

/**
*  Delete City
*/
    
   $scope.removeCity = function(id){
      //console.log(id);
      if(id){
         $http.delete('/newCity/' + id).success(function(response){
          cityView();
          alert('City delete successfully.')
         });
      }
    };

  /**
  *  List of City
  */
     
     
     $scope.city = {}
     var cityView = function(){
      $http.get('/cityView').success(function(response){
       // console.log('City list request');
        $scope.city = response;
       // console.log($scope.city);
      });
     };
     cityView();
    

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

 /**
  *  List of Countries
  */

  $scope.countries = {};
 var countriesView = function(){
  $http.get('/countriesview').success(function(response){
   // console.log('Countries list request');
     $scope.countries = response;
   //  console.log($scope.countries);
  });
 };
 countriesView();

 /**
  *  List of State
  */
  $scope.state = {};
    var stateview = function(){
      $http.get('/statesview').success(function(response){
       // console.log('state list request');
        $scope.state = response;
       // console.log($scope.state);
      });
    };
    stateview();

  
});

    
