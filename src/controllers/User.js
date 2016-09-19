myApp.controller('UserCtrl', function($scope) {
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