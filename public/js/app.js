var myApp = angular.module('myApp', [
	'ngSanitize',
	'ui.router',
	'ncy-angular-breadcrumb',
	'LocalStorageModule',
	'datatables',
	'ngCsv',
	'angularLazyImg',
	'angular.morris',
	'uiGmapgoogle-maps',
	'angularFileUpload'
	]);

myApp.factory('myService', function($http) {
	var myService = {
		async: function() {
			var promise = $http.get('test.json').then(function (response) {
				console.log(response);
				return response.data;
			});
			return promise;
		}
	};
	return myService;
})
.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
	GoogleMapApiProviders.configure({
		v: '3.20', //defaults to latest 3.X anyhow
		libraries: 'weather,geometry,visualization'
	});
}])
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('myApp')
    .setNotify(true, true);
})
.controller('MapCtrl', function($scope) {
	$scope.map = {
		center: {
			latitude: 45,
			longitude: -73 },
			zoom: 8
	};
})
.controller('ButtonsCtrl', function(myService, $scope) {
	myService.async().then(function(d) {
		$scope.data = d.scripts;
	});
})
.controller('DashboardCtrl', function($scope, localStorageService) {
	$scope.data = [
    { y: "2006", a: 100 },
    { y: "2007", a: 75 },
    { y: "2008", a: 50 },
    { y: "2009", a: 75 },
    { y: "2010", a: 50 },
    { y: "2011", a: 75 },
    { y: "2012", a: 100 }
	];

	$scope.getArray = [{a: 1, b:2}, {a:3, b:4}];
	$scope.getHeader = function () {return ["Year", "Total"]};

  $scope.xaxis = 'y';
  $scope.yaxis = '["a"]';

  if(localStorageService.isSupported) {
  	var storageType = localStorageService.getStorageType();

  	localStorageService.set('name', 'Telio');

  	$scope.getName = function () {
      alert('Hola ' + JSON.stringify(localStorageService.get('name')));
    };  	
  	console.log(storageType);
  }
})
.controller('WithAjaxCtrl', function(DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('data.json')
        .withOption('scrollY', 200)
        .withPaginationType('full_numbers');
    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name').notVisible()
    ];
})
.controller('UserCtrl', function($scope, FileUploader) {

	$scope.uploader = new FileUploader({
		url: 'upload.php'
	});
    $scope.tabs = [
    {
      title: "Account Data",
      content: "Dynamic content 1",
      code: "account"
    },
    {
      title: "Personal Information",
      content: "Dynamic content 2",
      code: "personal"
    },
    {
      title: "Address",
      content: "Dynamic content 2",
      code: "address"
    },
    {
      title: "Reviews",
      content: "Dynamic content 2",
      code: "reviews"
    },
    {
      title: "History",
      content: "Dynamic content 2",
      code: "history"
    },
    {
      title: "Invoice",
      content: "Dynamic content 2",
      code: "invoice"
    }
    ];

    $scope.userFormData = {};

    $scope.submitUserForm = function (userFormData) {
      alert('Form submitted with' + JSON.stringify(userFormData));
    };

    $scope.alertMe = function() {
      setTimeout(function() {
        alert("You've selected the alert tab!");
      });
    };
})
.config(function($stateProvider, $urlRouterProvider, $breadcrumbProvider) {

	// Set Breadcrumb
	$breadcrumbProvider.setOptions({
		templateUrl: './partials/widgets/breadcrumb.html'
	});

	$stateProvider
		.state('user', {
			url: "/user",
			templateUrl: "partials/user/index.html",
			ncyBreadcrumb: {
				label: 'User',
				parent: 'dashboard'
			}
		})
		.state('dashboard', {
			url: "/dashboard",
			templateUrl: "partials/dashboard/index.html",
			ncyBreadcrumb: {
				label: 'Dashboard'
			}
		})
		.state('orders', {
			url: "/orders",
			templateUrl: "partials/orders/index.html",
			ncyBreadcrumb: {
				label: 'Orders',
				parent: 'dashboard'
			}
		})
		.state('items', {
			url: "/items",
			templateUrl: "partials/items/index.html",
			ncyBreadcrumb: {
				label: 'Items',
				parent: 'dashboard'
			}
		})
		.state('questions', {
			url: "/questions",
			templateUrl: "partials/questions/index.html",
			ncyBreadcrumb: {
				label: 'Questions',
				parent: 'dashboard'
			}
		})
		.state('stores', {
			url: "/stores",
			templateUrl: "partials/stores/index.html",
			ncyBreadcrumb: {
				label: 'Stores',
				parent: 'dashboard'
			}
		});

		// Set Default Route
		$urlRouterProvider.otherwise("/dashboard");
});