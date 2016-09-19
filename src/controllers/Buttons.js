myApp.controller('ButtonsCtrl', function(myService, order, $scope) {
    myService.async().then(function(d) {
        $scope.data = d.scripts;
    });

    $scope.singleModel = 1;
    $scope.radioModel = 'Middle';
    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
})