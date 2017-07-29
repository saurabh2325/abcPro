angular.module('dashyAngular')
.controller('newCompanyCtrl', function($scope, $modal, $log, $http, $window){
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.data={};

    /**
    * Country
    */

    $scope.countries = {}
        var countriesView = function(){
        $http.get('/countriesview').success(function(response){
            //console.log('i got the data requested of countries.')
            $scope.countries = response;
            //console.log($scope.countries);
        });
    };
    countriesView();
    $scope.openCountry = function (size) {
        var CountKey = $scope.data.country;
        if(CountKey === 'cok'){ 
            $modal.open({
                templateUrl: 'views/particles/country/country_master.html',
                controller: 'countryCtrl',
                size: size,
                resolve:{
                    items: function () {
                    return $scope.items;
                    }
                }
           });
        }
    };

    /***End***/

    /**
    * State
    */

    $scope.state = {};
    var stateview = function(){
      $http.get('/statesview').success(function(response){
        //console.log('state list request');
        $scope.state = response;
        //console.log($scope.state);
      });
    };
    stateview();
    $scope.openState = function (size) {
        var StateKey = $scope.data.state;
        if(StateKey === 'sk'){ 
            $modal.open({
                templateUrl: 'views/particles/state/state_master.html',
                controller: 'stateCtrl',
                size: size,
                resolve:{
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
    };

    /***End***/

    /**
    * City
    */
    $scope.city = {}
    var cityView = function(){
        $http.get('/cityView').success(function(response){
            //console.log('City list request');
            $scope.city = response;
            //console.log($scope.city);
         });
    };
    cityView();
    $scope.openCity = function (size) {
      var CityKey = $scope.data.city;
      if(CityKey === 'ck'){
        $modal.open({
            templateUrl: 'views/particles/city/city_master.html',
            controller: 'cityCtrl',
            size: size,
            resolve:{
                items: function () {
                    return $scope.items;
                }
            }
        });
      }
    };

    /***End***/

    /**
    * Create New Company
    */

     $scope.companySave= function(){
        console.log($scope.data);
        if($scope.data.companyName === undefined || $scope.data.companyName === null){
            alert("Invalid entry")
            return;
        }else{
         $http.post('/newCompany', $scope.data ).success(function(response){
            $window.alert("New Company successfully saved.")
                //console.log(response);
            $scope.data = {};
        })
        .error(function(err){
            console.log(err);
        })

        }
        

     };

    /***End***/  

    /**
    * GET Companies List
    */
     $scope.Companies = [];
     var companyView = function(){
        
        $http.get('/companyView').success(function(response){
           // console.log("i requested for company List");
            $scope.Companies = response;
            //console.log($scope.Companies);  
        });
        
     };
    companyView();

    /***End***/ 
    /**
    * GET Companies List
    */ 

    $scope.removecompany = function(id){
        //console.log(id);
        if(id)
        {
            $http.delete('/companyView/' + id).success(function(response){
                companyView();
                alert('company delete successfully.')
            });
        }
    };

    /***End***/ 

})   /*validation for prevent duplicate company Name*/
.directive('companyname', function($q, $timeout, $http) {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var CompanyName = [];
            $http.get('/companyView').success(function(response){
            scope.Companies = response;
            for(var i = 0; i < scope.Companies.length; i++)
                {
                    var data = scope.Companies[i];
                    //console.log(data.companyName);
                    CompanyName.push(data.companyName);
                }       
            });
            //console.log(CompanyName);

            ctrl.$asyncValidators.companyname = function(modelValue, viewValue) {  

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.when();
                }
                var def = $q.defer();
                $timeout(function() {
                    // Mock a delayed response
                    if (CompanyName.indexOf(modelValue) === -1) {
                        // The username is available
                        def.resolve();
                    }else {
                        def.reject();
                    }
                }, 1000);
                return def.promise;
            };
        }
    };
});     

