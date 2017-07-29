angular.module('dashyAngular').controller('countryCtrl', function ($scope, $modalInstance, items, $http) {

  $scope.items = items;
  $scope.selected = { item: $scope.items[0]};
  
  $scope.templateUrl = 'views/particles/country/country_view.html?v='+window.app_version  
         
  $scope.addCountry = function(){
    $scope.templateUrl = 'views/particles/country/country_add.html?v='+window.app_version
  };

  $scope.showCountry = function(){
    $scope.templateUrl = 'views/particles/country/country_view.html?v='+window.app_version
  };

  /**
  *  Save Country
  */

  $scope.data = {}
  $scope.saveCountry = function (){
   // console.log($scope.data);
    $http.post('/newCountry', $scope.data).success(function(response){
     //  console.log(response);
       alert("Country add successfully");
       $scope.showCountry();
       countriesView();

      //Clean the form to allow the user to create new superheroes
       $scope.data = {}
    });
   /*$modalInstance.close($scope.data);*/
  };

  /**
  *  Delete of Country
  */

  $scope.removeCountry = function(id){
  // console.log(id);
   if(id){
    $http.delete('/newCountry/' + id).success(function(response){
      countriesView();
      alert("Country remove success ");
    });
   };
  };

  /**
  *  Update of Country
  */

  $scope.updateCountry = function()
  {

  };
  
  /**
  *  List of Countries
  */

  $scope.countries = {}
  var countriesView = function(){
    $http.get('/countriesview').success(function(response){
     // console.log('i got the data requested of countries.')
      $scope.countries = response
     //   console.log($scope.countries);
      });
    }; 
    countriesView();

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});
