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
.directive('ngPrint', function(){
  var printSection = document.getElementById('printSection');
  // if there is no printing section, create one
  if (!printSection) {
      printSection = document.createElement('div');
      printSection.id = 'printSection';
      document.body.appendChild(printSection);
  }
  function link(scope, element, attrs) {
    element.on('click', function () {
        var elemToPrint = document.getElementById(attrs.printElementId);
        if (elemToPrint) {
          printElement(elemToPrint);
        }
    });
    window.onafterprint = function () {
        // clean the print section before adding new content
      printSection.innerHTML = '';
    }
  }
  function printElement(elem) {
    // clones the element you want to print
    var domClone = elem.cloneNode(true);
    printSection.appendChild(domClone);
      window.print();
  }
  return {
      link: link,
      restrict: 'A'
  };
})
.filter('startFrom', function() {
  return function(input, start) {
      if(input.length){
       start = +start; //parse to int
       return input.slice(start);
      }   
  }
})
.controller('orderCtrl', function($scope, $http, $location, Auth, User, $filter){

  $scope.templateUrl = 'views/pages/dashboard/order/ordersGrid.html?v='+window.app_version

  $scope.showgrid = function(){
    $scope.templateUrl = 'views/pages/dashboard/order/ordersGrid.html?v='+window.app_version
  };

  $scope.showlist = function(){
    $scope.templateUrl = 'views/pages/dashboard/order/orderList.html?v='+window.app_version
  };

  $scope.editOrder = function(id){
    User.getPermission().then(function(response){
      console.log(response);
      var permission = response.data.data.permission;
      if(permission =="Admin" || permission == "Partner"){
        $location.path('/dashboard/partner/orders/info/' + id + '/edit');
      }else if(permission == 'Consumer'){
        $location.path('/dashboard/orders/info/' + id + '/edit');
      }
    })   
  };

  $scope.createPermission = false;
  $scope.deletePermission = false;
  
  $scope.currentPage = 0;
  $scope.pageSize = 9;
  $scope.orders ={}
  $scope.searchText = '';
  
  var ordersList = function(){
    User.getPermission().then(function(response){
      var permission = response.data.data.permission;
      var uid = response.data.data._id;
      console.log(permission)
      console.log(uid)
      if(permission == "Admin"){
        $http.get('/ordersList').success(function(response){
          $scope.orders = response;
          console.log($scope.orders);
        });
      }else if(permission == "Partner"){
        $http.get('/ordersList' + uid).success(function(response){
          $scope.orders = response;
          console.log($scope.orders);
        });
      }else if(permission == "Consumer"){
          $http.get('/ordersList' + uid).success(function(response){
            $scope.orders = response;
            console.log($scope.orders);
          });
      } 
    })
  };
  ordersList();

  // pagination
  $scope.getData = function () {
    // needed for the pagination calc
    // https://docs.angularjs.org/api/ng/filter/filter
    return $filter('filter')($scope.orders, $scope.searchText)
  }

  $scope.numberOfPages=function(){
    return Math.ceil($scope.getData().length/$scope.pageSize);                
  }


  $scope.infoOrder = function(id){
    User.getPermission().then(function(response){
      console.log(response);
      var permission = response.data.data.permission;
      if(permission =="Admin" || permission == "Partner"){
        $location.path('/dashboard/partner/orders/info/' + id);
      }else if(permission == 'Consumer'){
        $location.path('/dashboard/orders/info/' + id);
      }
    })   
  };   
})
.controller('orderCreateCtrl', function($scope, $modal, $log, $http, $stateParams, $location, $filter, User, $timeout, Upload){
  
  $scope.general = true;
  $scope.checklist = false;
  $scope.task = false;
  $scope.goToSecond= function () {
    $scope.general = false;
    $scope.checklist = true;
    $scope.task = false;
    };
  $scope.goToFirst= function () {
    $scope.general = true;
    $scope.checklist = false;
    $scope.task = false;
  };
  $scope.goToThird= function () {
    $scope.general = false;
    $scope.checklist = false;
    $scope.task = true;
  };
                
  $scope.checklists={}
  var checklistList = function(){
    $http.get('/checklistList').success(function(response){
      $scope.checklists = response.data;
      console.log($scope.checklists);
    });
  }
  checklistList();

  $scope.show = function(productID){
    $scope.orders.checklists = $scope.checklists; 
  };
  
  $scope.orders = {
    tasks: [{
      order_tasks_id: 1,
      start_date: new Date(),
      end_date: new Date()
    }]
  };

  $scope.$watch('files', function (){
    console.log($scope.files)
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
          var vid = $scope.orders.vehicle_img.length
            $scope.orders.vehicle_img.push({
              vehicle_img_id:vid,  
              image: $scope.vehicle_img
            });
        }).error(function(){});
      })
    }
  };

  /*$scope.uploadImage = function(){
    var file = $scope.orders.myFile;
    // console.log($scope.orders.myFile);
    var fd = new FormData();
    fd.append('file', file);
    $http.post('/uploadFile', fd, {
      transFormRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(response){
      $scope.orders.vehicle_img = response.filename;
      //console.log($scope.orders);
    })
    .error(function(){
    });
  };*/

  /*$scope.getVehicleDetail = function(id){
    console.log(id);
    $http.get('/vehicleNumberDetail/' + id).success(function(response){
      $scope.vehicleDetail = response.data;
      console.log($scope.vehicleDetail);
      if($scope.vehicleDetail){
       //$scope.orders.vehicle_num = $scope.vehicleDetail.vehicle_num;
      $scope.orders.vehicle_brand = $scope.vehicleDetail.manufacturer;
      $scope.orders.vehicle_model = $scope.vehicleDetail.model;
      $scope.orders.vehicle_img = $scope.vehicleDetail.vehicle_img;
      $scope.orders.vehicle_owner_full_name = $scope.vehicleDetail.last_owner;
      $scope.orders.vehicle_owner_phone_num = $scope.vehicleDetail.vehicle_owner_phone_num;
      $scope.orders.vehicle_owner_email = $scope.vehicleDetail.vehicle_owner_email; 
      }   
    })
  };*/

  var appointmentSingleView = function(){
    if($stateParams.id){
      $http.get('/appointmentView/' + $stateParams.id).success(function(response){
        $scope.appointments = response;
        console.log($scope.appointments);
        $scope.orders.vehicle_num = $scope.appointments.vehicle_num;
        $scope.orders.vehicle_brand = $scope.appointments.vehicle_brand;
        $scope.orders.vehicle_model = $scope.appointments.vehicle_model;
        $scope.orders.vehicle_img = $scope.appointments.vehicle_img;
        $scope.orders.consumer_id = $scope.appointments.consumer_id;
        var vid = $scope.appointments.vehicle_num;
        if(vid){
          $http.get('/vehicleNumberDetail/' + vid).success(function(response){
            $scope.vehicles = response.data;
            console.log($scope.vehicles._id)
            $scope.orders.vehicle_id = $scope.vehicles._id;  
          });
        } 
        var uid = $scope.appointments.consumer_id; 
        if(uid){
          $http.get('/viewUser/' + uid).success(function(response){
            $scope.users = response.data;
            $scope.orders.vehicle_owner_full_name = $scope.users.name;
            $scope.orders.vehicle_owner_phone_num = $scope.users.cell_phone_1;
            $scope.orders.vehicle_owner_email = $scope.users.email;  
          });
        }
      });
    }else{
    console.log("No Appointment create privously")
    }
  }
  appointmentSingleView();

  $scope.addOrder = function( valid, ordForm){
    if(valid){
      User.getPermission().then(function(response){
        $scope.orders.patner_id = response.data.data._id;
        $scope.orders.appointment_id = $stateParams.id;
        if($scope.orders.patner_id){
            console.log($scope.orders)
            $http.post('/newOrder', $scope.orders).success(function(response){
              $scope.successMsg =response.message;
              ordForm.$setPristine();
              var id = response.data._id
              $timeout(function(){
                $location.path('/dashboard/partner/orders/info/' + id + '/edit');
              },2000)  
            })
        }else{
          $scope.errorMsg = "User not found"; 
        }
      })
    }else{
      $scope.successMsg =false;
      $scope.errorMsg = "Please make sure all required fields are filled out correctly";
    }
  };

  $scope.showgrid = function(){
    $scope.templateUrl = 'views/pages/dashboard/order/ordersGrid.html?v='+window.app_version
  };

  $scope.showlist = function(){
    $scope.templateUrl = 'views/pages/dashboard/order/orderList.html?v='+window.app_version
  };
     
  $scope.add = function(){
   var id = $scope.orders.tasks.length + 1;
    $scope.orders.tasks.push({
    order_tasks_id : id,
    start_date: new Date(),
    end_date: new Date()
    }); 
  };

  $scope.remove = function(id){
    //console.log(id);
    var index = $scope.orders.tasks.indexOf(id)
    $scope.orders.tasks.splice(index, 1);
  }

  $scope.uploadTaskImage = function(){
    var file = $scope.orders.myFile;
    console.log($scope.orders.myFile);
    var fd = new FormData();
    fd.append('file', file);
      $http.post('/uploadFile', fd, {
        transFormRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(response){
        $scope.orders.tasks.task_img = response.filename;
        console.log($scope.orders.tasks.task_img)
      })
      .error(function(){
      });
  };
})
.controller('URDOrderPartnerCtrl', function ($scope, $http, $location, $state, $stateParams, User, Auth, $timeout){
  $scope.general = true;
  $scope.checklist = false;
  $scope.task = false;
  $scope.payment = false;
  $scope.delivery = false;
  $scope.successMsg = false;
  $scope.errorMsg = false;
  $scope.goToFirst= function () {
    $scope.general = true;
    $scope.checklist = false;
    $scope.task = false;
    $scope.payment = false;
    $scope.delivery = false;      
  };
  $scope.goToSecond= function() {
    $scope.general = false;
    $scope.checklist = true;
    $scope.task = false;
    $scope.payment = false;
    $scope.delivery = false;
  };
  $scope.goToThird= function () {
    $scope.task = true;
    $scope.general = false;
    $scope.checklist = false;
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

  $scope.infoOrder = function(){
    $location.path('/dashboard/partner/orders/info/' + $stateParams.id);
  };

  $scope.editOrder = function(){
    $location.path('/dashboard/partner/orders/info/' + $stateParams.id + '/edit');
  };

  $scope.add = function(){
    var id = $scope.orders.tasks.length + 1;
    $scope.orders.tasks.push({
      order_tasks_id : id,
      start_date: new Date(),
      end_date: new Date()
    });
  };

  $scope.remove = function(id){
    console.log(id);
    var index = $scope.orders.tasks.indexOf(id)
    $scope.orders.tasks.splice(index, 1);
    $scope.updateOrder();
  }

  var getOrderData = function(){
    $scope.orders = {};
    $scope.deliveryTab = false;
    $scope.paymentTab = false;
    $scope.nextTask = false;
    $scope.nextPayment = false;
    $scope.btnPrint = false;
    $scope.btnPayment = true;
    $scope.btnDelivered = true;
    $http.get('/orderDetail/' + $stateParams.id).success(function(response){
      $scope.orders = response;
      $scope.orders.tasks = response.tasks;
      console.log($scope.orders.tasks);
      $scope.orders.create_date = new Date($scope.orders.create_date);
      $scope.orders.delivery_date = new Date();
      $scope.orders.delivery_time = new Date(1999, 0, 1, 15, 30, 0);
      var taskLength = $scope.orders.tasks.length;
      var taskComplete = 0;
      $scope.orders.sub_Amount = 0;
      angular.forEach($scope.orders.tasks, function(value, key){
        $scope.orders.tasks[key].start_date =  new Date($scope.orders.tasks[key].start_date);
        $scope.orders.tasks[key].end_date = new Date($scope.orders.tasks[key].end_date);
        var tasks = $scope.orders.tasks[key].task_status;
        if(tasks === "Complete"){
          taskComplete = taskComplete + 1;
        }else{
          taskComplete = taskComplete + 0;
        }
        var sellPrice = $scope.orders.tasks[key].sell_price;
        $scope.orders.sub_Amount += sellPrice;
        var total_cost = $scope.orders.tasks[key].cost_price; 
        $scope.orders.total_cost_Amount += total_cost;
      });
      if(taskLength === taskComplete){
        $scope.paymentTab = true;
        $scope.nextTask = true;
        var total_tax =0
        $scope.tax_data = []
        $http.get('/taxList').success(function(response){
          $scope.taxData = response.data;
          angular.forEach($scope.taxData, function(value, key){
            $scope.taxName = $scope.taxData[key].tax_name
            console.log($scope.taxName); 
            var taxPercent = $scope.taxData[key].tax_percent
            var taxAmount = ($scope.orders.sub_Amount * taxPercent) / 100
            $scope.tax_data.push({
              tax_name: $scope.taxName,
              tax_percent: taxPercent,
              tax_amount : taxAmount 
            });
            console.log($scope.tax_data); 
            total_tax = total_tax + taxAmount;
            console.log(total_tax);  
            $scope.orders.total_Amount = $scope.orders.sub_Amount + total_tax;
            console.log($scope.orders.total_Amount);
          })
        });
      }else{
        $scope.paymentTab = false;
        $scope.deliveryTab = false;
        $scope.nextTask = false;
      }

      var paymentStatus = $scope.orders.payment_status;
      console.log(paymentStatus);
      if(paymentStatus =='Complete'){
        console.log("Payment Complete")
        $scope.btnPayment = false;
        $scope.btnPrint = true;
        $scope.nextPayment = true;
        $scope.deliveryTab = true;
        console.log($scope.deliveryTab)
      }else{
        console.log("Payment Incomplete")
        $scope.btnPayment = true;
        $scope.btnPrint = false;
        $scope.nextPayment = false;
        $scope.deliveryTab = false;   
      }

      var getAddress = $scope.orders.get_del_add;
      console.log(getAddress)
      if(getAddress){
        $scope.getDelAdd = true;
      }else{
        $scope.deliveryMsg = "delivery Detail not show this Time, try again after some time"
        $scope.getDelAdd = false;
      }

      var deliveryStatus = $scope.orders.delivery_status;
      if(deliveryStatus == 'Delivered'){
        $scope.btnDelivered = false;
        $scope.editOption = false;
      }else{
        $scope.btnDelivered = true;
        $scope.editOption = true;
      }
    })  
  };
  getOrderData();

  $scope.updateTask = function(){
    var taskLength = $scope.orders.tasks.length;
    var taskComplete = 0;
    angular.forEach($scope.orders.tasks, function(value, key){
      var taskStatus = $scope.orders.tasks[key].task_status;
      if(taskStatus === "Complete"){
        taskComplete = taskComplete + 1;
      }else{
        taskComplete = taskComplete + 0;
      }
      $scope.orders.task_complete = taskComplete;
    })
    $http.put('/editOrders/' + $scope.orders._id, $scope.orders).success(function(response){
      if(response.success){
        if(taskLength == taskComplete){
          $scope.successMsg = response.message;
          $timeout(function(){
            $scope.successMsg = false;
          },4000) 
          getOrderData();
          $scope.goToFourth();
        }else{
          $scope.successMsg = response.message;
          $timeout(function(){
            $scope.successMsg = false;
          },4000) 
          getOrderData();
        }
      }else{
        $scope.errorMsg = response.message;
        $timeout(function(){
          $scope.errorMsg = false;
        },4000)
      }
    });
  }

  $scope.updatePayment = function(){
    $scope.orders.payment_status = 'Complete';
    $http.put('/editOrders/' + $scope.orders._id, $scope.orders).success(function(response){
      if(response.success){
        $scope.successMsg = response.message;
        $timeout(function(){
          $scope.successMsg = false;
        },4000) 
        $scope.btnPrint = true;
        getOrderData();
      }else{
        $scope.errorMsg = response.message;
        $timeout(function(){
          $scope.errorMsg = false;
        },4000)
        $scope.btnPrint = false;
      }
      //$location.path('/dashboard/partner/info/' + $scope.orders._id);
    });
  };

  $scope.orderDelivered = function(){
    $scope.orders.delivery_status = 'Delivered';
    $scope.orders.order_status = 'Complete';
    $http.put('/editOrders/' + $scope.orders._id, $scope.orders).success(function(response){
      if(response.success){
        $scope.successMsg = response.message;
        $timeout(function(){
          $scope.successMsg = false;
        },4000) 
        $scope.btnDelivered = false;
        getOrderData();
      }else{
        $scope.errorMsg = response.message;
        $timeout(function(){
          $scope.errorMsg = false;
        },4000)
        $scope.btnDelivered = true;
      }  
    });
  };
})
.controller('URDOrderUserCtrl', function ($scope, $http, $location, $state, $stateParams, User, Auth, $timeout){
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

  $scope.goToSecond= function() {
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

  $scope.infoOrder = function(){
    $location.path('/dashboard/orders/info/' + $stateParams.id);
  };

  $scope.editOrder = function(){
    $location.path('/dashboard/orders/info/' + $stateParams.id + '/edit');   
  };
  
  var getOrderData = function(){
    $scope.orders = {};
    $scope.paymentTab = false;
    $scope.deliveryTab = false;
    
    $http.get('/orderDetail/' + $stateParams.id).success(function(response){
      $scope.orders = response;
      $scope.nextTask = false;
      $scope.nextPayment = false;
      console.log($scope.orders)
      $scope.orders.create_date = new Date($scope.orders.create_date);
      $scope.orders.delivery_date = new Date();
      $scope.orders.delivery_time = new Date(1999, 0, 1, 10, 0, 0);
      var taskLength = $scope.orders.tasks.length;
      var taskComplete = 0;
      $scope.orders.sub_Amount = 0;
      angular.forEach($scope.orders.tasks, function(value, key){
        var tasks = $scope.orders.tasks[key].task_status;
        if(tasks === "Complete"){
          taskComplete = taskComplete + 1;
        }else{
          taskComplete = taskComplete + 0;
        }
        var sellPrice = $scope.orders.tasks[key].sell_price;
        $scope.orders.sub_Amount += sellPrice;
        var total_cost = $scope.orders.tasks[key].cost_price; 
        $scope.orders.total_cost_Amount += total_cost;
      });
      if(taskLength === taskComplete){
        $scope.paymentTab = true;
        $scope.nextTask = true;
        var total_tax =0
        $scope.tax_data = []
        $http.get('/taxList').success(function(response){
          $scope.taxData = response.data;
          angular.forEach($scope.taxData, function(value, key){
            $scope.taxName = $scope.taxData[key].tax_name
            console.log($scope.taxName); 
            var taxPercent = $scope.taxData[key].tax_percent
            var taxAmount = ($scope.orders.sub_Amount * taxPercent) / 100
            $scope.tax_data.push({
              tax_name: $scope.taxName,
              tax_percent: taxPercent,
              tax_amount : taxAmount 
            });
            console.log($scope.tax_data); 
            total_tax = total_tax + taxAmount;
            console.log(total_tax);  
            $scope.orders.total_Amount = $scope.orders.sub_Amount + total_tax;
            console.log($scope.orders.total_Amount);
          })
        });
      }else{
        $scope.paymentTab = false;
        $scope.deliveryTab = false;
        $scope.nextTask = false;
      }

      var paymentStatus = $scope.orders.payment_status;
      console.log(paymentStatus);
      if(paymentStatus =='Complete'){
        console.log("Payment Complete")
        $scope.btnPayment = false;
        $scope.btnPrint = true;
        $scope.nextPayment = true;
        $scope.deliveryTab = true;
        console.log($scope.deliveryTab)
      }else{
        console.log("Payment Incomplete")
        $scope.btnPayment = true;
        $scope.btnPrint = false;
        $scope.nextPayment = false;
        $scope.deliveryTab = false;   
      } 

      var getAddress = $scope.orders.get_del_add;
      console.log(getAddress)
      if(getAddress){
        $scope.btnDelivery = false;
        $scope.editOption = false;
      }else{
        $scope.btnDelivery = true;
        $scope.editOption = true;
      }
    })
  };
  getOrderData();

  $scope.updatePayment = function(){
    $scope.orders.payment_status = 'Complete';
    $scope.orders.payment_type = 'online';
    $http.put('/editOrders/' + $scope.orders._id, $scope.orders).success(function(response){
      if(response.success){
        $scope.successMsg = response.message;
        $timeout(function(){
          $scope.successMsg = false;
        },4000) 
        $scope.btnPrint = true;
        getOrderData();
      }else{
        $scope.errorMsg = response.message;
        $timeout(function(){
          $scope.errorMsg = false;
        },4000)
        $scope.btnPrint = false;
      }
      //$location.path('/dashboard/partner/info/' + $scope.orders._id);
    });
  };

  $scope.updateDelivery = function(){
    $scope.orders.get_del_add = true;
    if($scope.orders.delivery_Address == null || $scope.orders.delivery_Address == "" ){
      alert("Please Enter delivery Address");
    }else{
      $http.put('/editOrders/' + $scope.orders._id, $scope.orders).success(function(response){
        if(response.success){
          $scope.successMsg = response.message;
          $timeout(function(){
            $scope.successMsg = false;
          },4000) 
          $scope.btnDelivery = false;
          getOrderData();
        }else{
          $scope.errorMsg = response.message;
          $timeout(function(){
            $scope.errorMsg = false;
          },4000)
          $scope.btnDelivery = true;
        }  
      });
    }
  };
})
.directive('ngConfirmClick', [ function(){
  return {
    link: function (scope, element, attr) {
      var msg = attr.ngConfirmClick || "Are you sure?";
      var clickAction = attr.confirmedClick;
      element.bind('click',function (event) {
        if ( window.confirm(msg) ) {
          scope.$eval(clickAction)
        }
      });
    }
  };
}])
  
