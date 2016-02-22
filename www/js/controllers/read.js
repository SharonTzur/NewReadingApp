angular.module('reading-app.controllers')
    .controller('ReadCtrl', function ($scope, CurrentUser, CurrentReading, $ionicPopup, $location, $timeout, $state) {


        $scope.backRead = function () {
            $state.go('tab.read');
        };

        function clickedFunc(propName) {
            CurrentReading[propName].count++;
            var now = new Date();
            if (CurrentReading[propName].lastTimeClicked == 0 || (now - CurrentReading[propName].lastTimeClicked) / 1000 > 1000) {
                var timePassed = (now - CurrentReading.startTime) / 1000;
                CurrentReading[propName].lastTimeClicked = now;
                CurrentReading.TimeAvgFunc(timePassed, propName);
            }
            else {
                var timePassed = (now - CurrentReading[propName].lastTimeClicked) / 1000;
                CurrentReading.TimeAvgFunc(timePassed, propName);
                CurrentReading[propName].lastTimeClicked = now;

            }
        }

        $scope.movedPage = function () {
            clickedFunc('pages');
        };

        $scope.movedParagraph = function () {
            clickedFunc('paragraphs');

        };

        $scope.showPopupAttention = function () {
            $scope.data = {};
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                title   : 'איבדת ריכוז :(',
                subTitle: 'אבל מה עכשיו?',
                scope   : $scope,
                buttons : [
                    {
                        text : 'ממשיך הלאה לקרוא במודעות',
                        type : 'button-calm',
                        onTap: function () {
                            clickedFunc('LostAttentionMovedOn');
                        }
                    },
                    {
                        text : 'חוזר אחורה לקרוא שוב',
                        type : 'button-positive',
                        onTap: function () {
                            clickedFunc('LostAttentionWentBack');
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });
            $timeout(function () {

            }, 3000);
        };

        $scope.showPopupFinished = function (CurrentUser) {
            $scope.data = {};
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                title   : 'סיימת לקרוא?',
                subTitle: '',
                scope   : $scope,
                buttons : [
                    {
                        text : 'סיימתי לקרוא בהצלחה',
                        type : 'button-balanced',
                        onTap: function () {
                            CurrentReading.endState = 2;
                            $state.go('tab.read-statistics');


                        }

                    },
                    {
                        text : 'אמשיך מאוחר יותר',
                        type : 'button-positive',
                        onTap: function () {
                            CurrentReading.endState = 3;
                            $state.go('tab.read-statistics');
                        }
                    },
                    {
                        text : 'התייאשתי',
                        type : 'button-assertive',
                        onTap: function () {
                            CurrentReading.endState = 1;
                            $state.go('tab.read-statistics');

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
            });
            $timeout(function () {

            }, 3000);
        };

        $scope.userSave = function () {
            $scope.data = {};
            if (CurrentReading.id) {
                CurrentUser.update();
            }
            else {
                $scope.myPopup = $ionicPopup.show({
                    template: '<input type="text" ng-model="data.title">',
                    title   : 'בחר שם לקריאה הנוכחית',
                    subTitle: 'על מנת שתוכל להמשיך אותה בעתיד',
                    scope   : $scope,
                    buttons : [
                        {text: 'ביטול'},
                        {
                            text : '<b>שמור</b>',
                            type : 'button-positive',
                            onTap: function () {
                                var title = $scope.data.title;
                                CurrentUser.save(title);
                            }
                        }
                    ]
                });
            }


        };
        $scope.loadData = function () {
            $scope.readingData = CurrentReading;
        }
    });