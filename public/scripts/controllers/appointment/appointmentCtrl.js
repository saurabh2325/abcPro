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
.controller('appointmentCtrl', function ($scope, $location, $http, $stateParams, User, Auth, $filter, $timeout){

  $scope.templateUrl = 'views/pages/dashboard/appointment/appointmentsGrid.html?v='+window.app_version
    
  $scope.showgrid = function(){
       $scope.templateUrl = 'views/pages/dashboard/appointment/appointmentsGrid.html?v='+window.app_version
  };
   
  $scope.showlist = function(){
      $scope.templateUrl = 'views/pages/dashboard/appointment/appointmentsList.html?v='+window.app_version
  };

  $scope.infoAppointment = function(id){
    $location.path('/dashboard/appointment/info/' + id);
  };
  $scope.editAppointment = function(id){
    $location.path('/dashboard/appointment/info/' + id + '/edit');
  };
  $scope.CreateOrder = function(id){
    if(id){
      $http.get('/appointmentView/' + id).success(function(response){
        var oid = response.order_id
        console.log(response.status);
        if(!response.status){
          $location.path('/dashboard/orders/create/' + id);
        }else{
          $scope.errorMessage = "Order already created with order id " + oid ;
          $timeout(function(){
            $scope.errorMessage = false;
          }, 4000);
        }
      })
    }else{

    }
    //
  };
    $scope.createPermission = false;
    $scope.editPermission = false;
    $scope.deletePermission = false;
    $scope.orderPermission = false;   

  if(Auth.isLoggedIn()){
    console.log('success: User is logged in.');
    User.getPermission().then(function(response){
      console.log(response);
      var permission = response.data.data.permission;
      if(permission == 'Admin'){
        console.log('Admin');
        $scope.createPermission = false;
        $scope.editPermission = true;
        $scope.deletePermission = true;
        $scope.orderPermission = true;
        $scope.createOrder = true;
      }else if(permission == 'Partner'){
        console.log('Patner');
        $scope.createPermission = false;
        $scope.editPermission = true;
        $scope.deletePermission = true;
        $scope.orderPermission = true;
        $scope.createOrder = true;   
      }else if(permission == 'Consumer'){
        console.log('Consumer');
        $scope.createPermission = true;
        $scope.editPermission = true;
        $scope.deletePermission = false;
        $scope.orderPermission = false;
        $scope.createOrder = false;      
      }
    }) 
    }else{
      console.log('Failure: User is NOT logged in.');
    }

  // GET APPOINTMENT LIST 
  $scope.currentPage = 0;
  $scope.pageSize = 9;
  $scope.appointments = {}
  $scope.searchText = '';
    
  var appointmentList = function(){
    User.getPermission().then(function(response){
      var permission = response.data.data.permission;
      var uid = response.data.data._id;
      console.log(permission)
      console.log(uid)
      if(permission == "Admin"){
        $http.get('/appointmentList').success(function(response){
          $scope.appointments = response;
          if(response.length){
            $scope.appointments = response;
          }else{
            $scope.message = "Sorry!, No Appointment available at this time."
          }
        });
      }else if(permission == "Partner"){
        $http.get('/partnerAppointmentList/' + uid).success(function(response){
          $scope.appointments = response;
          if(response.length){
            $scope.appointments = response;
          }else{
            $scope.message = "Sorry!, No Appointment available at this time."
          }
        });
      }else if(permission == "Consumer"){
        $http.get('/consumerAppointmentList/' + uid).success(function(response){
          if(response.length){
            $scope.appointments = response;
          }else{
            $scope.message = "Sorry!, No Appointment available at this time."
          }
        });
      } 
    })
  };
  appointmentList();
    
  // pagination
  $scope.getData = function () {
    // needed for the pagination calc
    // https://docs.angularjs.org/api/ng/filter/filter
    return $filter('filter')($scope.appointments, $scope.searchText)
  }

  $scope.numberOfPages=function(){
    return Math.ceil($scope.getData().length/$scope.pageSize);                
  } 

  $scope.deleteAppointment = function(id){
    console.log($scope.appointments);
    $http.delete('/deleteAppointment/' + id).success(function(response){
      alert("Appointment delete successfully.");
      appointmentList();
     // $location.path('/dashboard/appointments');
    });
  };

  $scope.infoAppointment = function(id){
    $location.path('/dashboard/appointment/info/' + id);
  };

    //---------------------- End----------------//
})
.controller('createAppointmentCtrl', function ($scope, $location, $http, $stateParams, User, Auth, Upload){
    
  $scope.worNam = false; 
  if(Auth.isLoggedIn()){
    User.getPermission().then(function(response){
      var permission = response.data.data.permission;
      if(permission == 'Admin'){
        $scope.worNam = true;  
      }else if(permission == 'Partner'){
        $scope.worNam = false;  
      }else if(permission == 'Consumer'){
        console.log('Consumer')
        $scope.worNam = true;      
      }
    })
  } 

  $scope.appointments = {
    vehicle_img: []
  };

  // List of City
  $scope.city = {}
  var cityList = function(){
    $http.get('/cityView').success(function(response){
      $scope.city = response.data;
    });
  };
  cityList();


  // View or List of Patner 
  $scope.Workshop= {};
  $scope.getWorkshop = function(id , aptForm) {
    if(id){
      console.log(id);
      $http.get('/workshopList/'+ id).success(function(response){
        if(response.data.length){
          $scope.Workshop = response.data;
        }else{
          $scope.Workshop = {};
          $scope.appointments.partner_id = "";
          aptForm.$setPristine();
        }
      });
    }else{
      $scope.errorMsg = "Please select city before selecting workshop";
    }
  };
    //getWorkshop();
    
  // Get Vehicle Ditail
  $scope.getVehicleData = function() {
    var vnid = $scope.appointments.vehicle_num
    console.log(vnid);
    if(vnid){
      $http.get('/vehicleNumberDetail/' +  vnid).success(function(response){
        console.log(response.data)
        $scope.vehicleData = response.data;
        if($scope.vehicleData){
          $scope.appointments.vehicle_brand = $scope.vehicleData.manufacturer;
          $scope.appointments.vehicle_model = $scope.vehicleData.model;
          $scope.appointments.vehicle_img = $scope.vehicleData.vehicle_img; 
        }else{
          $scope.appointments.vehicle_brand= "";
          $scope.appointments.vehicle_model= "";
          $scope.appointments.vehicle_img = [];
        }
      });
    }
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
          var vid = $scope.appointments.vehicle_img.length
            $scope.appointments.vehicle_img.push({
              vehicle_img_id:vid,  
              image: $scope.vehicle_img
            });
        }).error(function(){});
      })
    }
  };
   
  
    //Add Vehicle to Data Base
  $scope.appointments.appointment_date = new Date(); 
  $scope.BookAppointment = function( valid, aptForm){
    if(valid){
      User.getPermission().then(function(response){
        $scope.appointments.consumer_id = response.data.data._id;
        if($scope.appointments.consumer_id){
          $http.post('/newAppointment', $scope.appointments).success(function(response){
            if(response.success){
              $scope.successMsg = response.message;
              $scope.appointments = {};
              aptForm.$setPristine();
            }else{
              $scope.errorMsg = response.message;
            }
          })
        }else{
          $scope.errorMsg = response.message;
        }
      })    
    }else{
      $scope.errorMsg = "Please make sure all required fields are filled out correctly";
    }
  };
}) 
.controller('URDAppointmentCtrl', function ($scope, $location, $http, $stateParams, Upload){
     
  $scope.appointments = {}
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
          var vid = $scope.appointments.vehicle_img.length
            $scope.appointments.vehicle_img.push({
              vehicle_img_id:vid,  
              image: $scope.vehicle_img
            });
        }).error(function(){});
      })
    }  
  };

  $scope.Workshop= {};
  var refresh = function() {
     $http.get('/users').success(function(response){
      console.log('I got the data i requested');
      $scope.Workshop = response;
    });
  };
  refresh();

    //---------------------- Add Vehicle to data base----------------//
  var appointmentSingleView = function(){
    $http.get('/appointmentView/' + $stateParams.id).success(function(response){
      $scope.appointments = response;
      var date =  new Date(response.appointment_date);
      $scope.appointments.appointment_date = date;
      var time =  new Date(response.appointment_time);
      $scope.appointments.appointment_time = time;
      console.log($scope.appointments.consumer_id);
      var cid = $scope.appointments.consumer_id;
      $http.get('/viewUser/'+cid).success(function(response){
        $scope.user = response.data.name;
        console.log($scope.user);
      })
      var uid = $scope.appointments.partner_id;
      $http.get('/viewUser/' + uid).success(function(response){
        $scope.Partner = response.data.name;
      });
    });
  };
  appointmentSingleView();
  //---------------------- End----------------//

  //---------------------- update Vehicle in data base----------------//
  $scope.updateAppointment = function(valid, aptForm){
    if(valid){
      $http.put('/editAppointment/' + $scope.appointments._id, $scope.appointments).success(function(response){
        if(response.success){
          $scope.successMsg = response.message;
          $location.path('/dashboard/appointment/info/' + $scope.appointments._id);
        }else{
          $scope.errorMsg = response.message;
        }
      })
    }else{
      $scope.errorMsg = "Please make sure all required fields are filled out correctly";
    }
  };
  //---------------------- End----------------//

  $scope.infoAppointment = function(id){
      $location.path('/dashboard/appointment/info/' + id);
  };

  $scope.editAppointment = function(id){
      $location.path('/dashboard/appointment/info/' + id + '/edit');
  };

  $scope.historyAppointment = function(id){
      $location.path('/dashboard/appointment/info/' + id + '/history');
  };
  $scope.CreateOrder = function(id){
    console.log("order page");
      $location.path('/dashboard/orders/create/' + id);
  };  
})
.controller('DatepickerCtrl', function ($scope) {
  $scope.today = function(){
    var date = new Date();
    $scope.dt = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
  };

  $scope.today();
  
  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
    //console.log($scope.dt);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
})

.filter('startFrom', function() {
    return function(input, start) {
        if(input.length){
         start = +start; //parse to int
         return input.slice(start);
        }   
    }
})