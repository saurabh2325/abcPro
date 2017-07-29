'use strict';

angular.module('dashyAngular').controller('comapanyCtrl', function($scope){
    $scope.templateUrl = 'views/pages/dashboard/company/company_view.html?v='+window.app_version,	
         
    $scope.showgrid = function(){
        $scope.templateUrl = 'views/pages/dashboard/enquiries/enquiries_grid.html?v='+window.app_version
    };

    $scope.showlist = function(){
        $scope.templateUrl = 'views/pages/dashboard/enquiries/enquiries_list.html?v='+window.app_version
    };
 	$scope.Data= [
 	              { Id:'1', Date:'11/24/2016', Name:'Saurabh Tiwari', Category:'A', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Active' },
 	              { Id:'2', Date:'11/24/2016', Name:'Nitin Maskare', Category:'B', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Dead'},
 	              { Id:'3', Date:'11/24/2016', Name:'Amit maskare', Category:'C', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Purchase', Date:'', Time:'' , Status:'Active'},
 	              { Id:'4', Date:'11/24/2016', Name:'Arpit Tiwari', Category:'G', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Dead'},
 	              { Id:'5', Date:'11/24/2016', Name:'Saurabh Tiwari', Category:'f', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Purchase', Date:'', Time:'' , Status:'Won'},
 	              { Id:'6', Date:'11/24/2016', Name:'Nitin Maskare', Category:'g', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Active'},
 	              { Id:'7', Date:'11/24/2016', Name:'Amit maskare',Category:'G', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Won'},
 	              { Id:'8', Date:'11/25/2016', Name:'Arpit Tiwari', Category:'V', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Active'},
 	              { Id:'9', Date:'11/25/2016', Name:'Saurabh Tiwari', Category:'V', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Purchase', Date:'', Time:'' , Status:'Dead'},
 	              { Id:'10', Date:'11/25/2016', Name:'Nitin Maskare', Category:'X', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Purchase', Date:'', Time:'' , Status:'Won'},
 	              { Id:'11', Date:'11/25/2016', Name:'Amit maskare', Category:'X', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Active'},
 	              { Id:'12', Date:'11/25/2016', Name:'Arpit Tiwari', Category:'N', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Purchase', Date:'', Time:'' , Status:'Won'},
 	              { Id:'13', Date:'11/25/2016', Name:'Saurabh Tiwari', Category:'N', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Won'},
 	              { Id:'14', Date:'11/25/2016', Name:'Nitin Maskare', Category:'N', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Active'},
 	              { Id:'15', Date:'11/26/2016', Name:'Amit maskare', Category:'N', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Purchase', Date:'', Time:'' , Status:'Won'},
 	              { Id:'16', Date:'11/26/2016', Name:'Arpit Tiwari', Category:'N', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'Sales', Date:'', Time:'' , Status:'Won'},
 	              { Id:'17', Date:'11/26/2016', Name:'Ronit', Category:'', Product:'' , Contact: '' ,Email: '' ,Address:'', Department:'', Date:'Sales', Time:'' , Status:'Dead'}
 	              ];
 	              /*console.log($scope.Data);*/
});