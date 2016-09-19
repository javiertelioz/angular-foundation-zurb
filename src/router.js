myApp.config(function($breadcrumbProvider, $stateProvider, $urlRouterProvider) {
    $breadcrumbProvider.setOptions({
        templateUrl: './partials/widgets/breadcrumb.html'
    });

    $urlRouterProvider.otherwise("/dashboard");

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
        })
})