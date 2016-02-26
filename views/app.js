var app = angular.module('litt', ['angular-loading-bar']);

app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

app.controller('LittController', ['$scope', '$http', function ($scope, $http) {

    var API_URL = "http://localhost:3003/littup";
    var REGEX_SANITIZER = new RegExp(/[^a-zA-Z-]/g);

    $scope.searchTerm = "";
    $scope.term = "";

    $scope.synonymsList = [];

    $scope.$watch('searchTerm', function (newVal, oldVal) {
        if (!newVal || !newVal.length)
            return;

        if (REGEX_SANITIZER.test(newVal))
            $scope.searchTerm = newVal.replace(REGEX_SANITIZER, '');
    });


    $scope.getSynonyms = function () {

        $scope.term = $scope.searchTerm;

        $http.post(API_URL, { term : $scope.term }).success(function (data) {
            $scope.synonymsList = data.words;
        }).error(function (status, error) {

        });

    };

    $scope.showHeader = function () {
        return $scope.synonymsList && $scope.synonymsList.length && $scope.term && $scope.term.length;
    }

}]);