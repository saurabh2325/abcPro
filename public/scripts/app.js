'use strict';

/**
* @ngdoc home
* @name dashyAngular
* @description
* # dashyAngular
*
* Main module of the application.
*/
window.app_version = 6;

angular
.module('dashyAngular', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'textAngular',
    'ui.calendar',
    'perfect_scrollbar',
    'angular-loading-bar',
    'chart.js',
    'angular-growl',
    'angulartics',
    'angulartics.google.analytics',
    'gridshore.c3js.chart',
    'growlNotifications',
    'ngFileUpload',
    'authServices',
    'userServices'
    ])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 5;
      cfpLoadingBarProvider.includeSpinner = false;
  }])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
    $httpProvider.interceptors.push('AuthInterceptors');

    $urlRouterProvider
        .when('/login', '/boxed/login')
        .when('/dashboard', '/dashboard/home')
        .otherwise('/login');

    $stateProvider
    .state('plain', {
        abstract: true,
        url: '',
        templateUrl: 'views/layouts/plain.html?v='+window.app_version,
        authenticated: false
    })
    .state('boxed', {
        abstract: true,
        url: '/boxed',
        parent: 'plain',
        templateUrl: 'views/layouts/boxed.html?v='+window.app_version,
        authenticated: false
    })
    .state('login', {
        url: '/login',
        parent: 'boxed',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'mainCtrl',
        authenticated: false
    })
    .state('/admin/login', {
        url: '/admin/login',
        parent: 'boxed',
        templateUrl: 'views/pages/adminLogin.html?v='+window.app_version,
        controller: 'mainCtrl',
        authenticated: false
    })
    .state('/partner/login', {
        url: '/partner/login',
        parent: 'boxed',
        templateUrl: 'views/pages/adminLogin.html?v='+window.app_version,
        controller: 'mainCtrl',
        authenticated: false
    })
    .state('/facebook/:tokan',{
        url: '/facebook/:tokan',
        templateUrl:'views/pages/dashboard/social/social.html?v='+window.app_version,
        controller:'facebookCtrl',
        controllerAs: 'facebook',
        authenticated: false  
    })
    .state('/facebookError', {
        url: '/facebookError',
        parent: 'boxed',
        templateUrl:'views/pages/login.html?v='+window.app_version,
        controller:'facebookCtrl',
        controllerAs:'facebook',
        authenticated: false     
    })
    .state('/twitter/:tokan',{
        url: '/twitter/:tokan',
        templateUrl:'views/pages/dashboard/social/social.html?v='+window.app_version,
        controller:'twitterCtrl',
        controllerAs: 'twitter',
        authenticated: false  
    })
    .state('/twitterError', {
        url: '/twitterError',
        parent: 'boxed',
        templateUrl:'views/pages/login.html?v='+window.app_version,
        controller:'twitterCtrl',
        controllerAs:'twitter',
        authenticated: false     
    })
    .state('/google/:tokan',{
        url: '/google/:tokan',
        templateUrl:'views/pages/dashboard/social/social.html?v='+window.app_version,
        controller:'googleCtrl',
        controllerAs: 'google',
        authenticated: false  
    })
    .state('/googleError', {
        url: '/googleError',
        parent: 'boxed',
        templateUrl:'views/pages/login.html?v='+window.app_version,
        controller:'googleCtrl',
        controllerAs:'google',
        authenticated: false     
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'views/pages/signup.html?v='+window.app_version,
        parent: 'boxed',
        controller: 'signupCtrl',
        authenticated: false
    })
    .state('/signup/:newuser', {
        url: '/signup/:newuser',
        templateUrl: 'views/pages/signup.html?v='+window.app_version,
        parent: 'boxed',
        controller: 'newsignupCtrl',
        authenticated: false
    })
    .state('/activate/:token', {
        url: '/activate/:token',
        templateUrl: 'views/pages/dashboard/activation/activate.html?v='+window.app_version,
        parent: 'boxed',
        controller: 'emailCtrl'
    })
    .state('resend', {
        url: '/resend',
        parent: 'boxed',
        templateUrl: 'views/pages/dashboard/activation/resendLink.html?v='+window.app_version,
        controller: 'resendCtrl'
    })
    .state('forgot-password', {
        url: '/forgot-password',
        parent: 'boxed',
        templateUrl: 'views/pages/forgot-password.html?v='+window.app,
        controller: 'forgateCtrl',
        authenticated: false
    })
    .state('/reset/:resettoken', {
        url: '/reset/:resettoken',
        templateUrl: 'views/pages/resetPassword.html?v='+window.app_version,
        parent: 'boxed',
        controller: 'signupCtrl',
        authenticated: false
    })
    .state('dashboard', {
        url: '/dashboard',
        parent: 'plain',
        templateUrl: 'views/layouts/dashboard.html?v='+window.app_version,
        controller: 'DashboardCtrl',
        authenticated: true
    })
    .state('home', {
        url: '/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        authenticated: true
    })
    .state('profile', {
        url: '/profile',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/profile/profile.html?v='+window.app_version,
        controller: 'ProfileCtrl',
        authenticated: true
    })
    .state('/profile/:id/edit', {
        url: '/profile/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/profile/profile_edit.html?v='+window.app_version,
        controller: 'profileEditCtrl',
        authenticated: true
    })
    .state('patner', {
        url: '/partner/info',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/user/users.html?v='+window.app_version,
        controller: 'viewPatnerCtrl',
        authenticated: true,
        permission:['Admin']
    })
    .state('createPatner', {
        url: '/partner/register',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/user/user_add.html?v='+window.app_version,
        controller: 'createPatnerCtrl',
        authenticated: true,
        permission:['Admin']
    })
    .state('/partner/info/:id', {
        url: '/partner/info/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/user/user_view.html?v='+window.app_version,
        controller: 'PURDPatnerCtrl',
        authenticated: true,
        permission:['Admin']
    })
    .state('/partner/info/:id/edit', {
        url: '/partner/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/user/user_edit.html?v='+window.app_version,
        controller: 'PURDPatnerCtrl',
        authenticated: true,
        permission:['Admin']
    })
    .state('/partner/info/:id/performance', {
        url: '/partner/info/:id/performance',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/user/user_performanceinfo.html?v='+window.app_version,
        controller: 'PURDPatnerCtrl',
        authenticated: true,
        permission:['Admin']
    })
    .state('orders', {
        url: '/orders',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/orders.html?v='+window.app_version,
        controller: 'orderCtrl',
        authenticated: true,
        permission:['Admin', 'Partner', 'Consumer']
    })
    .state('createOrders', {
        url: '/orders/create',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/orderCreate.html?v='+window.app_version,
        controller: 'orderCreateCtrl',
        authenticated: true,
        permission:['Admin', 'Partner']
    })
    .state('/orders/create/:id', {
        url: '/orders/create/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/orderCreate.html?v='+window.app_version,
        controller: 'orderCreateCtrl',
        authenticated: true,
        permission:['Admin', 'Partner']
    })
    .state('/partner/orders/info/:id', {
        url: '/partner/orders/info/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/adminOrderView.html?v='+window.app_version,
        controller: 'URDOrderPartnerCtrl',
        authenticated: true,
        permission:['Admin', 'Partner', 'Consumer']
    })
    .state('/partner/orders/info/:id/edit', {
        url: '/partner/orders/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/adminOrderEdit.html?v='+window.app_version,
        controller: 'URDOrderPartnerCtrl',
        authenticated: true,
        permission:['Admin', 'Partner', 'Consumer']
    })
    .state('/orders/info/:id', {
        url: '/orders/info/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/orderView.html?v='+window.app_version,
        controller: 'URDOrderUserCtrl',
        authenticated: true,
        permission:['Admin', 'Partner', 'Consumer']
    })
    .state('/orders/info/:id/edit', {
        url: '/orders/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/order/orderEdit.html?v='+window.app_version,
        controller: 'URDOrderUserCtrl',
        authenticated: true,
        permission:['Admin', 'Partner', 'Consumer']
    })
    .state('vehicles', {
        url: '/vehicles',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicles/vehicles.html?v='+window.app_version,
        controller:'vehicleCtrl',
        authenticated: true
    })
    .state('createVehicles', {
        url: '/vehicles/create',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicles/vehicleCreate.html?v='+window.app_version,
        controller:'vehicleCreateCtrl',
        authenticated: true
    })
    .state('/vehicles/info/:id', {
        url: '/vehicles/info/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicles/vehicleView.html?v='+window.app_version,
        controller: 'URDVehicleCtrl',
        authenticated: true
    })
    .state('/vehicles/info/:id/edit', {
        url: '/vehicles/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicles/vehicleEdit.html?v='+window.app_version,
        controller: 'URDVehicleCtrl',
        authenticated: true
    })
    .state('/vehicles/info/:id/history', {
        url: '/vehicles/info/:id/history',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/vehicles/vehicleHistory.html?v='+window.app_version,
        controller: 'vehicleHistoryCtrl',
        authenticated: true
    })
    .state('appointments', {
        url: '/appointments',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/appointment/appointment.html?v='+window.app_version,
        controller:'appointmentCtrl',
        authenticated: true
    })
    .state('createAppointments', {
        url: '/appointments/create',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/appointment/appointmentCreate.html?v='+window.app_version,
        controller:'createAppointmentCtrl',
        authenticated: true
    })
    .state('/appointment/info/:id', {
        url: '/appointment/info/:id',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/appointment/appointmentView.html?v='+window.app_version,
        controller: 'URDAppointmentCtrl',
        authenticated: true
    })
    .state('/appointment/info/:id/edit', {
        url: '/appointment/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/appointment/appointmentEdit.html?v='+window.app_version,
        controller: 'URDAppointmentCtrl',
        authenticated: true
    })
    .state('/appointment/info/:id/history', {
        url: '/appointment/info/:id/history',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/appointment/appointmentHistory.html?v='+window.app_version,
        controller: 'URDAppointmentCtrl',
        authenticated: true
    })
    .state('checklist', {
        url: '/checklist',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/checklist/checklist.html?v='+window.app_version,
        controller: 'checklistCtrl',
        authenticated: true
    })
    .state('createChecklist', {
        url: '/createChecklist',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/checklist/checklistCreate.html?v='+window.app_version,
        controller: 'checklistCreateCtrl',
        authenticated: true
    })
    .state('/checklist/info/:id/edit', {
        url: '/checklist/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/checklist/checklistEdit.html?v='+window.app_version,
        controller: 'URDChecklistCtrl',
        authenticated: true
    })
    .state('tax', {
        url: '/tax',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/taxes/taxes.html?v='+window.app_version,
        controller: 'taxCtrl',
        authenticated: true
    })
    .state('createTax', {
        url: '/createTax',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/taxes/taxesCreate.html?v='+window.app_version,
        controller: 'taxCreateCtrl',
        authenticated: true
    })
    .state('/tax/info/:id/edit', {
        url: '/tax/info/:id/edit',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/taxes/taxesEdit.html?v='+window.app_version,
        controller: 'URDTaxCtrl',
        authenticated: true
    })
    .state('company', {
        url: '/company',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/company/company.html?v='+window.app_version,
        controller:'comapanyCtrl',
        authenticated: true
    })
    .state('createcompany', {
        url: '/createcompany',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/company/company_add.html?v='+window.app_version,
        controller:'newCompanyCtrl',
        authenticated: true
    }) 
    .state('404-page', {
        url: '/404-page',
        parent: 'boxed',
        templateUrl: 'views/pages/404-page.html?v='+window.app_version,
        authenticated: true
        
    })
    .state('blank', {
        url: '/blank',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/blank.html?v='+window.app_version,
        controller: 'URDOrderCtrl',
        authenticated: true
    });
    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
    }); 
})
.run(['$rootScope', 'Auth', '$state', 'User',  function($rootScope, Auth, $state, User) {
    $rootScope.$on('$stateChangeStart', function(event, next, current) {
        //console.log(next.authenticated);
        if(next.authenticated == true){
            //console.log('needs to be authenticated');
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $state.go('login');    
            }else if(next.permission){
                User.getPermission().then(function(response){
                   console.log(response);
                    if(next.permission[0] !== response.data.data.permission){
                        if(next.permission[1] !== response.data.data.permission){
                            if(next.permission[2] !== response.data.data.permission){
                                event.preventDefault();
                                $state.go('home'); 
                            }
                        }
                    } 
                });

            }
        }else if (next.authenticated == false){
            console.log(' should not needs to be authenticated');
            if(Auth.isLoggedIn()){
                event.preventDefault();
                $state.go('home');
            }
        }
    });
}])
.run(function(){

    var switchValue = JSON.parse(localStorage.getItem("switched"));

    if(switchValue)
        $('body').addClass('box-section');  

});
