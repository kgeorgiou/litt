var app = angular.module('litt', ['angular-loading-bar']);

app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

app.controller('LittController', ['$scope', '$http', function ($scope, $http) {

    var API_URL = "http://litt.kg.gg/littup";
    var REGEX_SANITIZER = new RegExp(/[^a-zA-Z-]/g);

    $scope.searchTerm = "";
    $scope.term = "";

    $scope.similarsList = undefined;

    $scope.$watch('searchTerm', function (newVal, oldVal) {
        if (!newVal || !newVal.length)
            return;

        if (REGEX_SANITIZER.test(newVal))
            $scope.searchTerm = newVal.replace(REGEX_SANITIZER, '');
    });


    $scope.getSynonyms = function () {

        $scope.term = $scope.searchTerm;

        $http.post(API_URL, { term : $scope.term }).success(function (data) {
            $scope.similarsList = data.words;
        }).error(function (status, error) {

        });

    };

    $scope.showResult = function () {
        return $scope.similarsList && $scope.similarsList.length && $scope.term && $scope.term.length;
    };

    $scope.isResultEmpty = function() {
        return $scope.similarsList && !$scope.similarsList.length && $scope.term && $scope.term.length;
    }

}]);