angular.module('reading-app', ['ionic', 'reading-app.controllers', 'reading-app.factories',])
    .config(function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('signup');
        $stateProvider

            .state('tab', {
                url        : '/tab',
                templateUrl: 'templates/tabs.html',
                controller: 'HomeCtrl'
            })

            .state('tab.read', {
                url  : '/read',
                views: {
                    'tab-read': {
                        templateUrl: 'templates/tab-read.html',
                        controller : 'ReadCtrl'
                    }
                }
            })
            .state('tab.read-statistics', {
                url  : '/read-statistics',
                views: {
                    'tab-read': {
                        templateUrl: 'templates/current-statistics.html',
                        controller : 'ReadCtrl'
                    }
                }
            })
            .state('tab.prompt', {
                url  : '/prompt',
                views: {
                    'tab-prompt': {
                        templateUrl: 'templates/tab-prompt.html',
                        controller : 'PromptCtrl'
                    }
                }
            })

            .state('tab.account', {
                url  : '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller : 'AccountCtrl'
                    }
                }
            })
            .state('signup', {
                url        : '/signup',
                templateUrl: 'templates/signup.html',
                controller : 'SignupCtrl'
            })
            .state('login', {
                url        : '/login',
                templateUrl: 'templates/login.html',
                controller : 'LoginCtrl'
            })
            .state('reset', {
                url        : '/reset',
                templateUrl: 'templates/reset.html',
                controller : 'ResetCtrl'
            });



    })
    .run(function ($ionicPlatform, $state, $timeout) {

        Parse.initialize("fO2HffRXwaCVfmIMlDHhJSxDQIKmZwlcSronVrBG", "u7Sb1rAMjAqg9E7OpGomMoxYhwy7VqjYWUoI7Ols");

        //Todo
        //window.fbAsyncInit = function () {
        //  Parse.FacebookUtils.init({ // this line replaces FB.init({
        //    appId: 'FB_APP_ID', // Facebook App ID
        //    //   status: true,  // check Facebook Login status
        //    cookie: true,  // enable cookies to allow Parse to access the session
        //    xfbml: true,  // initialize Facebook social plugins on the page
        //    version: 'v2.2' // point to the latest Facebook Graph API version
        //  });
        //
        //};
        //
        //(function (d, s, id) {
        //  var js, fjs = d.getElementsByTagName(s)[0];
        //  if (d.getElementById(id)) {
        //    return;
        //  }
        //  js = d.createElement(s);
        //  js.id = id;
        //  js.src = "https://connect.facebook.net/en_US/sdk.js";
        //  fjs.parentNode.insertBefore(js, fjs);
        //}(document, 'script', 'facebook-jssdk'));

   /*     $timeout(function() {
            $state.go('tab.account');
        }, 5000);
*/
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if (Parse.User.current()) {
                $state.go('tab.account')

            }
        })
    });
