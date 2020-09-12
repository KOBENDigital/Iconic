"use strict";

angular.module("umbraco").controller("Koben.Iconic.Prevalues.Packages", ["$scope", "$http", "editorService", function ($scope, $http, editorService) {
    $scope.overrideBgTemplate = false;

    if (!angular.isArray($scope.model.value)) $scope.model.value = [];

    $scope.createNewPackage = function () {
        var newItem = new Package();

        editorService.open({
            title: "Create new package",
            view: "/app_plugins/iconic/views/iconic.edit.dialog.html",
            saved: function saved() {
                $scope.model.value.push(angular.copy(newItem));
            },
            "package": newItem
        });
    };

    $scope.editPackage = function (pkg) {
        editorService.open({
            title: "Edit package",
            view: "/app_plugins/iconic/views/iconic.edit.dialog.html",
            "package": pkg
        });
    };

    $scope.removeItem = function (index) {
        $scope.model.value.splice(index, 1);
    };

    $scope.toggleItemDisplay = function (item) {
        if ($scope.selectedItem === item) {
            $scope.selectedItem = null;
        } else {
            $scope.selectedItem = item;
        }
    };
}]);

