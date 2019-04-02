angular.module("umbraco").controller("Koben.Iconic.Prevalues.Packages", [
    "$scope",
    "$http",
    "assetsService",
    "localizationService",
    function ($scope, $http, assetsService, localizationService) {
        $scope.overrideBgTemplate = false;

        $scope.data = {
            configType: "custom",
            selectedItem: null,
            editItem: null,
            selectedPreConfig: null,
            showNewItemForm: false
        };

        if (!angular.isArray($scope.model.value)) $scope.model.value = [];


        $scope.createNewPackage = function () {
            $scope.newItem = new Package();
        }

        $scope.saveNewItem = function () {
            $scope.model.value.push(angular.copy($scope.newItem));

            $scope.newItem = null;
            $scope.data.showNewItemForm = false;
            $scope.data.selectedPreConfig = null;
        };

        $scope.removeItem = function (index) {
            $scope.model.value.splice(index, 1);
        };

        $scope.toggleItemDisplay = function (item) {
            if ($scope.data.selectedItem === item) {
                $scope.data.selectedItem = null;
            } else {
                $scope.data.selectedItem = item;
            }
        }

        $scope.resetNewItem = function () {
            $scope.newItem = null;
        }

        $scope.selectPreConfig = function (config) {
            Object.assign($scope.newItem, config);
        };

     

        function loadPreconfigs() {
            $http.get("/App_Plugins/Iconic/preconfigs.json").then(
                function (response) {
                    $scope.preconfig = response.data.preconfigs;
                },
                function (response) {
                    displayError("iconicErrors_loading");
                }
            );
        }

        loadPreconfigs();
    }
]);
