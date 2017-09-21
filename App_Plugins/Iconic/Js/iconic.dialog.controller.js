angular.module("umbraco")
    .controller("Koben.Iconic.Dialog.Controller",
    ['$scope', '$http', 'dialogService', 'assetsService', function ($scope, $http, dialogService, assetsService) {

        $scope.packages = $scope.model.pickerConfig.packages;
        $scope.pckgselected;
        $scope.iconsSize = 16;
        $scope.styles = [];
        $scope.loading = false;

        $scope.loadPackage = function () {
            $scope.loading = true;

            assetsService.loadCss($scope.pckgselected.cssfile).then(function () {                
                $scope.loading = false;
            });
            
        }

        $scope.selectIcon = function (icon) {
            $scope.model.pickerData = {};
            $scope.model.pickerData.packageAlias = $scope.pckgselected.alias;
            $scope.model.pickerData.style = $scope.pckgselected.extraClasses + ' ' + icon;
            $scope.submitForm($scope.model); //it passes the model back to the overlay caller
            $scope.closeOverLay();
        }

        function initOverlay() {
            if ($scope.model.pickerData && $scope.model.pickerData.packageAlias) {
                $scope.pckgselected = $scope.model.pickerConfig.packages.find((el) => el.alias == $scope.model.pickerData.packageAlias);
                $scope.loadPackage();
            }
        }

        initOverlay();

    }]);