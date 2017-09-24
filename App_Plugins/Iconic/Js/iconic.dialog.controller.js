angular.module("umbraco")
    .controller("Koben.Iconic.Dialog.Controller",
    ['$scope', '$http', 'assetsService', function ($scope, $http, assetsService) {

        $scope.packages = $scope.model.pickerConfig.packages;
        $scope.pckgselected = {};
        

        $scope.iconsSize = 16;
        $scope.styles = [];
        $scope.loading = false;

        $scope.loadPackage = function () {
            $scope.loading = true;

            assetsService.loadCss($scope.pckgselected.cssfile).then(function () {
                $scope.loading = false;
            });

        }

        $scope.displayIcon = function (icon) {
            return $scope.pckgselected.template.replace("{icon}", icon);
        }


        $scope.selectIcon = function (icon) {
            $scope.model.pickerData = new Icon(icon, $scope.pckgselected.id);            
            $scope.submitForm($scope.model); //it passes the model back to the overlay caller
            $scope.closeOverLay();
        }

        function initOverlay() {
            if ($scope.model.pickerData && $scope.model.pickerData.packageId) {
                $scope.pckgselected = $scope.model.pickerConfig.packages.find((el) => el.id == $scope.model.pickerData.packageId);
                $scope.loadPackage();
            }
        }   

        initOverlay();

    }]);