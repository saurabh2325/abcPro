'use strict';
angular.module('dashyAngular')
.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  }
}])
.controller('vehicleCtrl', function($scope, $location,  $http, $stateParams, User, $filter){

  // TAMPLATE NAVIGATION 

  $scope.templateUrl = 'views/pages/dashboard/vehicles/vehicleGrid.html?v='+window.app_version
    
  $scope.showgrid = function(){
    $scope.templateUrl = 'views/pages/dashboard/vehicles/vehicleGrid.html?v='+window.app_version
  };
  $scope.showlist = function(){
    $scope.templateUrl = 'views/pages/dashboard/vehicles/vehicleList.html?v='+window.app_version
  };
  $scope.editVehicle = function(id){
        $location.path('/dashboard/vehicles/info/' + id + '/edit');
  };
  $scope.historyVehicle = function(id){
        $location.path('/dashboard/vehicles/info/' + id + '/history');
  };

  //GET VEHICLE LIST
  $scope.currentPage = 0;
  $scope.pageSize = 9;
  $scope.vehicles=[]
  $scope.searchText = '';
  
  var vehiclesList = function(){
    User.getPermission().then(function(response){
      var permission = response.data.data.permission;
      console.log(permission);
      var uid = response.data.data._id;
      if(permission == "Admin"){
        $http.get('/vehiclesList').success(function(response){
          $scope.vehicles = response.data;
        });
      }else if(permission == "Partner"){
        $http.get('/getOrderData/' + uid).success(function(response){
          $scope.orders = response;
          angular.forEach($scope.orders, function(value, key){
            var vid = $scope.orders[key].vehicle_id
            if(vid){
              $http.get('/vehicleDetail/' + vid).success(function(response){
              $scope.vehicledata = response;
              $scope.vehicles.push({
                _id : $scope.vehicledata._id,
                vehicle_num: $scope.vehicledata.vehicle_num,
                manufacturer: $scope.vehicledata.manufacturer,
                model: $scope.vehicledata.model,
                last_owner: $scope.vehicledata.last_owner,
                vehicle_img: $scope.vehicledata.vehicle_img
              }); 
              console.log(response);
              });
            }
          })
          console.log($scope.orders);
        });
      }else if(permission == "Consumer"){
        $http.get('/consumervehiclesList/' + uid).success(function(response){
          $scope.vehicles = response.data;
          console.log($scope.vehicles[0].vehicle_img[0].image);
        });
      } 
    })
  }
  vehiclesList();

  // pagination
  $scope.getData = function () {
    // needed for the pagination calc
    // https://docs.angularjs.org/api/ng/filter/filter
    return $filter('filter')($scope.vehicles, $scope.searchText)
  }

  $scope.numberOfPages=function(){
    return Math.ceil($scope.getData().length/$scope.pageSize);                
  }

  /*$scope.filter('groupBy',
            function () {
                return function (collection, key) {
                    if (collection === null) return;
                    return vehiclesList(collection, key);
        };
    });*/

  //NAVIGATION TO VIEHICLE VIEW

  $scope.viewVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id);
  };

  // PAGE NAVIGATION  

  $scope.infoVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id);
  };
  $scope.editVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id + '/edit');
  };
  $scope.historyVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id + '/history');
  };
  
})
.controller('vehicleCreateCtrl', function($scope, $location, $http, $stateParams, User, Upload){
 //$scope.vehicles = {}
  
  $scope.vehicles = {
      vehicle_img: []
    };

  $scope.$watch('files', function () {
    if($scope.files != null){
      console.log($scope.files)
      $scope.upload_vehicles_image($scope.files);
    }
  });

  //Upload Vehicle Image 
  $scope.upload_vehicles_image = function(files){
    console.log(files)
    if(files && files.length){
      angular.forEach(files, function(value, key){
        console.log(files[key])
        var file = files[key];
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/uploadFile', fd, { transFormRequest: angular.identity, headers: {'Content-Type': undefined} }).success(function(response){
          $scope.vehicle_img = response.filename;
          var vid = $scope.vehicles.vehicle_img.length
            $scope.vehicles.vehicle_img.push({
              vehicle_img_id:vid,  
              image: $scope.vehicle_img
            });
        }).error(function(){});
      })
    }else{

    }
  };
  
  //Create Vehicle
  //$scope.vehicles.vehicle_img = "bike.png";
  $scope.addVehicle = function(valid, vehiForm){
    $scope.errorMsg = false;
    if(valid){
      User.getPermission().then(function(response){
        $scope.vehicles.consumer_id = response.data.data._id;
        if($scope.vehicles.consumer_id){
          $http.post('/newVehicle', $scope.vehicles).success(function(response){
            if(response.success){
              $scope.successMsg = response.message
              $scope.vehicles = {
                vehicle_img: []
              };
              vehiForm.$setPristine();
            }else{
              $scope.errorMsg = response.message
            } 
          })
        }
      })
    }else{
      $scope.errorMsg = "Please make sure all required fields are filled out correctly";  
    }
  };     
    //console.log($scope.vehicles);
    /*if($scope.vehicles.vehicle_num == null || $scope.vehicles.vehicle_num == " " || $scope.vehicles.last_owner == null || $scope.vehicles.last_owner == " " ){
      alert("Ensure Vehicle Number, Owner Name");
    }else{
      User.getPermission().then(function(response){
        $scope.vehicles.consumer_id = response.data.data._id;
        if($scope.vehicles.consumer_id){
          $http.post('/newVehicle', $scope.vehicles).success(function(response){
            console.log(response);
            alert("Vehicle successfully Added");
            
           // $scope.vehicles.vehicle_img = "bike.png";
          });
        }
      });
    }*/
  
})
.controller('URDVehicleCtrl', function($scope, $location,  $http, $stateParams, Upload){
  // Page Navigation
  $scope.viewVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id);
  };
  $scope.infoVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id);
  };
  $scope.editVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id + '/edit');
  };
  $scope.historyVehicle = function(id){
    $location.path('/dashboard/vehicles/info/' + id + '/history');
  };

  //GET VEHICLE
  $scope.vehicles = [];
  var getVehiclesData = function(){
    $http.get('/vehicleDetail/' + $stateParams.id).success(function(response){
      $scope.vehicles = response;
      console.log($scope.vehicles); 
    });
  };
  getVehiclesData();

  $scope.$watch('files', function () {
    if($scope.files != null){
      console.log($scope.files)
      $scope.upload_vehicles_image($scope.files);
    }
  });

  //Upload Vehicle Image 
  $scope.upload_vehicles_image = function(files){
    console.log(files)
    if(files && files.length){
      angular.forEach(files, function(value, key){
        console.log(files[key])
        var file = files[key];
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/uploadFile', fd, { transFormRequest: angular.identity, headers: {'Content-Type': undefined} }).success(function(response){
          $scope.vehicle_img = response.filename;
          var vid = $scope.vehicles.vehicle_img.length
            $scope.vehicles.vehicle_img.push({
              vehicle_img_id:vid,  
              image: $scope.vehicle_img
            });
        }).error(function(){});
      })
    }else{

    }
  };


  /*//Upload Vehicle Image  
  $scope.upload_vehicles_image = function(){
    var file = $scope.myFile;
    var fd = new FormData();
    fd.append('file', file);
    $http.post('/uploadFile', fd, {
      transFormRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(response){
      $scope.vehicle_img = response.filename;
      var vid = $scope.vehicles.vehicle_img.length
      $scope.vehicles.vehicle_img.push({
          vehicle_img_id:vid,  
          image: $scope.vehicle_img
        });
      })
    .error(function(){
    });
  };*/
  
  //UPDATE VEHICLE IMAGE

  $scope.updateVehicle = function(valid, vehiForm){
    if(valid){
      $http.put('/editVehicle/' + $scope.vehicles._id, $scope.vehicles).success(function(response){
        if(response.success){
          $scope.successMsg = response.message;
          $location.path('/dashboard/vehicles/info/' + $scope.vehicles._id);
        }else{
          $scope.errorMsg = response.message;
        }
      })
    }else{
      $scope.errorMsg = "Please make sure all required fields are filled out correctly";
    }
  };
})
.controller('vehicleHistoryCtrl', function($scope, $location,  $http, $stateParams){

  $scope.viewVehicle = function(){
    $location.path('/dashboard/vehicles/info/' + $stateParams.id);
  };
  $scope.infoVehicle = function(){
    $location.path('/dashboard/vehicles/info/' + $stateParams.id);
  };
  $scope.editVehicle = function(){
    $location.path('/dashboard/vehicles/info/' + $stateParams.id + '/edit');
  };
  $scope.historyVehicle = function(){
    $location.path('/dashboard/vehicles/info/' + $stateParams.id + '/history');
  };

  $scope.general = true;
  $scope.checklist = false;
  $scope.task = false;
  $scope.payment = false;
  $scope.delivery = false;
  $scope.goToFirst= function () {
    $scope.general = true;
    $scope.checklist = false;
    $scope.task = false;
    $scope.payment = false;
    $scope.delivery = false;       
  };
  $scope.goToSecond= function () {
    $scope.general = false;
    $scope.checklist = true;
    $scope.task = false;
    $scope.payment = false;
    $scope.delivery = false;
  };
  $scope.goToThird= function () {
    $scope.general = false;
    $scope.checklist = false;
    $scope.task = true;
    $scope.payment = false;
    $scope.delivery = false;       
  };
  $scope.goToFourth= function () {
    $scope.general = false;
    $scope.checklist = false;
    $scope.task = false;
    $scope.payment = true;
    $scope.delivery = false;       
  };
  $scope.goToFifth= function () {
    $scope.general = false;
    $scope.checklist = false;
    $scope.task = false;
    $scope.payment = false;
    $scope.delivery = true;       
  };

  var vehOrdhHtryData = function(){
    $scope.message = false;
    $http.get('/vehicleOrderhistory/' + $stateParams.id).success(function(response){
      console.log(response)
      if(response.success && response.data.length){
        $scope.vehicles = response.data;
      }else{
        $scope.message = "Sorry!, No serivce history available at this time."
        console.log($scope.message);
      }  
    });
  }
  vehOrdhHtryData();

  // SHOW AND HIDE FUNCTION 

  $scope.showMe1 = false;
  $scope.showFun = function(){
    $scope.showMe1 = !$scope.showMe1;
  };

  // ng-show in ng-repter
  $scope.expand = function (vehicle) {
    angular.forEach($scope.vehicles, function (currentVehicle) {
        currentVehicle.showfull = currentVehicle === vehicle && !currentVehicle.showfull;
    });
  };

  /*$scope.showingSubNav = 0;
  $scope.showSubNav = function(x){
    if(x==$scope.showingSubNav)
      $scope.showingSubNav = 0;
    else
      $scope.showingSubNav = x;
  };*/

})
.filter('startFrom', function() {
    return function(input, start) {
        if(input.length){
         start = +start; //parse to int
         return input.slice(start);
        }   
    }
})

