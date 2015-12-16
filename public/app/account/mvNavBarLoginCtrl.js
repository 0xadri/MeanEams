angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvAuth, mvNotifier){
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password){
        mvAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mvNotifier.notify('Successfully logged in');
            } else {
                mvNotifier.notify('failed to log in');
            }
        });
    }
});