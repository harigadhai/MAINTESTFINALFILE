agGrid.initialiseAgGridWithAngular1(angular);  
var routerApp = angular.module('routerApp', ['ui.router','agGrid']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
         
        .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            }
        }) 
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        }) 
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }
            }
            
        });
        
});

routerApp.controller('scotchController', function($scope,dtfactory) {
     $scope.message = 'test';
     $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
    
     $scope.rowDatas = [];
        dtfactory.getdata().then(function(response){
         // $scope.rowDatas = response.data;
         $scope.rowDatas = [{ ID: "09-14-002880", PatientName: "PRAVEEN KUMAR", Gender: "Male", Age: "20", mobileNumber: 9879878971, patientId: "test" },{ ID: "09-13-000188", PatientName: "VAR", Gender: "Male", Age: "20", mobileNumber: '', patientId: "ZXC12" }];
         //$scope.callWithDelay();
        
        
        
        })
    
        $scope.gridheaders = [
                     { headerName: "ID", field: "ID", seqNo: 0 },
                     { headerName: "Patient Name", field: "PatientName", seqNo: 1 },
                     { headerName: "Gender", field: "Gender", seqNo: 3 },
                     { headerName: "Age", field: "Age", seqNo: 2 },
                     { headerName: "Phone Number", field: "mobileNumber", seqNo: 4 }
    ];


    $scope.rowDatas = [
                     { ID: "09-14-002880", PatientName: "PRAVEEN KUMAR", Gender: "Male", Age: "20", mobileNumber: 9879878971, patientId: "test" },
                     { ID: "09-13-000188", PatientName: "VAR", Gender: "Male", Age: "20", mobileNumber: '', patientId: "ZXC12" },
                     { ID: "09-05-019825", PatientName: "KARMA", Gender: "Male", Age: "29", mobileNumber: '', patientId: "ZA2545635" },
                     { ID: "09-04-010524", PatientName: "FRANKLIN ANTHONY", Gender: "Male", Age: "20", mobileNumber: '', patientId: "Z7552396" },
                     { ID: "09-08-009303", PatientName: "DARYOUSH", Gender: "Male", Age: "29", mobileNumber: '', patientId: "Z2548467" },
                     { ID: "09-12-031048", PatientName: "SMITA", Gender: "Female", Age: "20", mobileNumber: 9880222187, patientId: "Z2296538" },
                     { ID: "09-11-026001", PatientName: "ADITYA DILIP", Gender: "Male", Age: "29", mobileNumber: '', patientId: "Z2277913" }
    ];
    
  //  $scope.callWithDelay = function(){
       console.log($scope.rowDatas);
      $scope.gridOptions = {
                columnDefs: $scope.gridheaders,
                rowData: $scope.rowDatas,
                onSelectionChanged: onSelectionChanged,
                rowSelection: 'single',
                enableColResize: true,
                enableSorting: true,
                enableFilter: true,
                groupHeaders: true,
                rowHeight: 22,
                onModelUpdated: onModelUpdated,
                suppressRowClickSelection: false
            };
            
            
             document.addEventListener('DOMContentLoaded', function () {
                var gridDiv = document.querySelector('#myGrid_'+textBoxId);

            }); 
		
            
           // $scope.$apply()
   // }
      
    
    
  		  		  //$scope.gridOptions.api.refreshView();
 				 // $scope.gridOptions.api.setRowData() 
            
		 
    
             function onModelUpdated() {
                var model = $scope.gridOptions.api.getModel();
                var totalRows = $scope.gridOptions.rowData.length;
                var processedRows = model.getVirtualRowCount();
                $scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
            }
	   
			 
 
            function onSelectionChanged() {
                var selectedRows = $scope.gridOptions.api.getSelectedRows();
                var selectedRowsString = '';
                selectedRows.forEach(function (selectedRow, index) {
                    if (index != 0) {
                        selectedRowsString += ', ';
                    }
                    selectedRowsString += selectedRow.Description;
                });
				
                document.getElementById('myGrid_'+textBoxId).innerHTML = selectedRowsString;
               // $scope.registration.SearchPatient = selectedRowsString;
				 
                //   document.querySelector('#selectedRows').innerHTML = selectedRowsString;
                document.getElementById('myGrid_'+textBoxId).style.display = 'none'
            }
    
    
});
routerApp.factory('dtfactory', ['$http', function($http) {
    var dataFactory = {};
    dataFactory.getdata = function () {
  			  return $http.get('sample.json');
 		};
    return dataFactory;
}]);

routerApp.directive('telAutocompletedropdown', ['$http','dtfactory', function ($http,dtfactory) {
    /*<a href="#" data-toggle="control-sidebar"  ag-grid="gridOptions" ng-click=testing()><i class="fa fa-tasks"></i></a>*/
    return {
        restrict: 'EA',
        scope: {
         
		        checkId: '@',
            ngModel: '='
 
         },

        template: '<span class="form-group"><div class="col-sm-{{ labelSize }}"><label style="float:right;"> Select  </label></div>' +
                  '<div class="col-sm-{{ textfieldSize }}"  ><select  id="{{checkId}}"  tabIds="{{ tabId }}" class="{{className}}"  ng-click="showMyGrid()"><option   value="" style="display:none"> Select</option></select> </div>  <span ng-show="showmandatoryfield" class="mandatoryInput">*</span>  </span>'+
                    '<div class="myGrid" id="myGrid_{{checkId}}">'+
                        '<div><button type="button" ng-click="closeGrid()" id="btDestroyGrid">X</button></div>'+
                        '<div id="gridView" ag-grid="gridOptions" class="ag-fresh ag-basic"> </div>'+
                    '</div>',
        controller: function ($scope,$timeout) { 
		 var textBoxId=$scope.checkId 
					$scope.showMyGrid = function () {                
						document.getElementById('myGrid_'+textBoxId).style.display = 'block'
					}
					$scope.closeGrid = function (){
					 document.getElementById('myGrid_'+textBoxId).style.display = 'none';
					} 
 			 


           

         },
        link: function (scope, iElement, iAttrs) {
          
          
        }
    };

}])
