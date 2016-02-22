/**
 * Created by Osei Fortune on 7/2/15.
 */
angular.module('reading-app.factories')
    .factory('CurrentUser', function (CurrentReading, $ionicPopup, $state, $ionicLoading) {
        var CurrentUser = {};

        CurrentUser.user = Parse.User.current();

        CurrentUser.readingSessionDefine = function(){
            CurrentUser.readingSession = {
            startTime            : CurrentReading.startTime,
            paragraphs           : CurrentReading.paragraphs,
            pages                : CurrentReading.pages,
            LostAttentionMovedOn : CurrentReading.LostAttentionMovedOn,
            LostAttentionWentBack: CurrentReading.LostAttentionWentBack
        }};

        CurrentUser.save = function (title) {
            CurrentUser.readingSessionDefine();
            var ReadingSessions = Parse.Object.extend("ReadingSessions");
            var session = new ReadingSessions();
            session.set("title", title);
            session.set("endState", CurrentReading.endState);
            session.set("body", this.readingSession);
            session.set("user", this.user);
            session.save(null, {
                success: function (session) {
                    CurrentReading.clear();
                }
            });
        };

        CurrentUser.update = function ($scope) {
            var ReadingSessions = Parse.Object.extend("ReadingSessions");
            var query = new Parse.Query(ReadingSessions);
            query.get(CurrentReading.id, {
                success: function (session) {
                    // The object was retrieved successfully.
                    session.set("endState", CurrentReading.endState);
                    var updateReadingSession = {
                        startTime            : CurrentReading.startTime,
                        paragraphs           : CurrentReading.paragraphs,
                        pages                : CurrentReading.pages,
                        LostAttentionMovedOn : CurrentReading.LostAttentionMovedOn,
                        LostAttentionWentBack: CurrentReading.LostAttentionWentBack
                    };
                    session.set("body", updateReadingSession);
                    session.save(null, {
                        success: function (savedSession) {
                           CurrentReading.clear();
                        }
                    });
                },
                error  : function (object, error) {
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and message.
                }
            });

        };





        CurrentUser.getUserSessions = function () {
            var ReadingSessions = Parse.Object.extend("ReadingSessions");
            var query = new Parse.Query(ReadingSessions);
            query.equalTo("user", this.user);
            debugger;
            query.find({
                success: function (usersSessions) {
                    return usersSessions;
                }
            });

        };

        CurrentUser.unfinishedSessions = [];

        CurrentUser.getUserUnfinishedSessions = function () {
            var ReadingSessions = Parse.Object.extend("ReadingSessions");
            var query = new Parse.Query(ReadingSessions);
            query.equalTo("user", this.user);
            query.find({
                success: function (usersSessions) {
                    var unfinishedSessions = [];
                    for (var i = 0; i < usersSessions.length; i++) {
                        var userSession = usersSessions[i];
                        var endState = userSession.attributes.endState;
                        if (endState == 3) {
                            unfinishedSessions.push(userSession);
                        }
                    }
                    CurrentUser.unfinishedSessions = unfinishedSessions;
                    return unfinishedSessions;
                }
            });

        };


        return CurrentUser;
    });