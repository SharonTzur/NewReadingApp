angular.module('reading-app.controllers')
    .controller('AccountCtrl', function ($scope, CurrentUser, CurrentReading, $interval, $ionicPopup, $timeout) {
        $scope.user = CurrentUser.user;


        $scope.showUnfinished = false;

        $scope.refreshUnfinished = function () {
            $scope.unfinishedSessions = CurrentUser.unfinishedSessions;

            if($scope.showUnfinished == false){
                $scope.showUnfinished = true;
            }
            else {
                $scope.showUnfinished = false;
            }
        };

        $scope.startNew = function(){
            CurrentReading.clear();
            CurrentReading.start();

        };
        $scope.loadSession = function ($event) {
            var sessionTitle = $event.currentTarget.innerText;

            for (var i = 0; i < $scope.unfinishedSessions.length; i++) {
                var session = $scope.unfinishedSessions[i];
                if (session.attributes.title == sessionTitle) {
                    CurrentReading.title = session.attributes.title;
                    CurrentReading.id = session.id;
                    CurrentReading.pages = session.attributes.body.pages;
                    CurrentReading.paragraphs = session.attributes.body.paragraphs;
                    CurrentReading.LostAttentionMovedOn = session.attributes.body.LostAttentionMovedOn;
                    CurrentReading.LostAttentionWentBack = session.attributes.body.LostAttentionWentBack;
                    CurrentReading.start();
                }
            }
        };

        $interval(function(){
            CurrentUser.getUserUnfinishedSessions();
            $scope.unfinishedSessions=CurrentUser.unfinishedSessions;

        },1000);
    });