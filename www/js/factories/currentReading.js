/**
 * Created by Osei Fortune on 7/2/15.
 */
angular.module('reading-app.factories')
    .factory('CurrentReading', function ($ionicPopup, $state, $ionicLoading) {
        var currentReading = {};
        currentReading.startTime = 0;
        currentReading.paragraphs = {
            count          : 0,
            timeAvg        : 0,
            lastTimeClicked: 0
        };
        currentReading.pages = {
            count          : 0,
            timeAvg        : 0,
            lastTimeClicked: 0

        };
        currentReading.LostAttentionMovedOn = {
            count          : 0,
            timeAvg        : 0,
            lastTimeClicked: 0
        };
        currentReading.LostAttentionWentBack = {
            count          : 0,
            timeAvg        : 0,
            lastTimeClicked: 0
        };
        //endState : 0 - regular, 1 - given up, 2 - finished successfully, 3 - save session, continue another time
        currentReading.endState = 0;


        ////statistics functions
        currentReading.TimeAvgFunc = function (time, propName) {
            var newAvg = ((this[propName].count - 1) * this[propName].timeAvg + time) / this[propName].count;
            this[propName].timeAvg = newAvg;
        };


        currentReading.start = function () {

            $ionicPopup.confirm({
                title   : 'התחלת קריאה',
                template: 'האם אתה מוכן?',
                okType  : 'button-balanced'
            }).then(function (res) {
                if (res) {
                    currentReading.startTime = new Date();
                    $state.go('tab.read');
                } else {
                }
            });
        };

        currentReading.clear = function () {
            currentReading.title = undefined;
            currentReading.id = undefined;
            currentReading.startTime = 0;
            currentReading.paragraphs = {
                count          : 0,
                timeAvg        : 0,
                lastTimeClicked: 0
            };
            currentReading.pages = {
                count          : 0,
                timeAvg        : 0,
                lastTimeClicked: 0

            };
            currentReading.LostAttentionMovedOn = {
                count          : 0,
                timeAvg        : 0,
                lastTimeClicked: 0
            };
            currentReading.LostAttentionWentBack = {
                count          : 0,
                timeAvg        : 0,
                lastTimeClicked: 0
            };
        };




        return currentReading;
    });