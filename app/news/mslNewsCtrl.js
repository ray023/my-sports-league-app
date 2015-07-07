/* ===========================================================================
 * FindAFit
 * ===========================================================================
 * Copyright 2015 Ray Nowell
 * =========================================================================== */
'use strict';

mslApp

    .controller('NewsCtrl', function($scope, $ionicPopup, News, Subscribe) {

        var success_callback = function(schedule){
            console.log('success');
            $scope.data = {
                schedule: schedule
            };
        };
        var error_callback = function(statusCode){
            console.log('error');
            var statusMessage = 'Server Error:  ' + statusCode;
            if (statusCode == '404')
                statusMessage = 'Could not connect to server.  Please make sure you have network connectivity.';

            $ionicPopup.alert({
                title: 'Server Error: ' + statusCode,
                okType: 'button-assertive',
                template: statusMessage
            });
        };

        if (Subscribe.activeTeams.length > 0)
        {
            News.getNews().then(
                success_callback,
                error_callback
            );
        }
        else
        {
            $ionicPopup.alert({
                title: 'Subscribe!',
                template: 'You are not subscribed to any teams.  Click the Subscribe icon to get started.'
            });
        }


        $scope.refresh = function() {
            if (Subscribe.activeTeams.length > 0)
            {
                News.getNews().then(
                    success_callback,
                    error_callback
                );
            }
            else
            {
                $ionicPopup.alert({
                    title: 'Subscribe!',
                    template: 'You are not subscribed to any teams.  Click the Subscribe icon to get started.'
                });
            }

            $scope.$broadcast('scroll.refreshComplete');
        };

    });