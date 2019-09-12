"use strict";

angular.module("umbraco").controller("Koben.Iconic.Controller", ['$scope', 'assetsService', function ($scope, assetsService) {
    var config = $scope.model.config;

    $scope.pckg;
    $scope.modelIsValid = false;
    $scope.icon;

    $scope.selectIcon = function (model) {
        if (model.pickerData.icon && model.pickerData.packageId) {
            $scope.pckg = loadPackage(config.packages, model.pickerData.packageId);
            $scope.model.value = model.pickerData;
            $scope.modelIsValid = true;
        } else {
            $scope.modelIsValid = false;
        }
    };

    $scope.removeIcon = function () {
        $scope.model.value = {};
        $scope.modelIsValid = false;
    };

    $scope.overlay = {
        view: "/app_plugins/iconic/views/iconic.dialog.html",
        title: "Select an icon",
        hideSubmitButton: true,
        submit: $scope.selectIcon,
        close: function close() {
            $scope.overlay.show = false;
        },
        pickerData: $scope.model.value,
        pickerConfig: config
    };

    function loadPackage(packages, packageId) {
        return packages.find(function (el) {
            return el.id === packageId;
        });
    }

    function initPicker() {
        $scope.loading = true;
        if (!angular.isObject($scope.model.value)) $scope.model.value = {};

        if ($scope.model.value && $scope.model.value.packageId && $scope.model.value.icon) {

            $scope.pckg = loadPackage(config.packages, $scope.model.value.packageId);
            if ($scope.pckg) {
                assetsService.loadCss("~/" + $scope.pckg.cssfile);
                $scope.modelIsValid = true;
            }
        } else {
            $scope.modelIsValid = false;
        }
        $scope.loading = false;
    }

    initPicker();
}]);

