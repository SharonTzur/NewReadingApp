/**
 * Created by Osei Fortune on 7/2/15.
 */
angular.module('reading-app.controllers')
    .controller('PromptCtrl', function ($scope, $ionicPopup, $timeout) {
        $scope.choice = {
            name: ''
        };
        $scope.assignChoice = function ($event) {
            if ($event.currentTarget.name) {
            }

        }
    });