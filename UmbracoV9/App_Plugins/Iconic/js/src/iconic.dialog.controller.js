angular.module("umbraco")
    .controller("Koben.Iconic.Dialog.Controller",
        ['$scope', 'assetsService', 'umbRequestHelper', function ($scope, assetsService, umbRequestHelper) {

        $scope.packages = $scope.model.pickerConfig.packages;
        $scope.pckgselected = null;


        $scope.iconsSize = 16;
        $scope.styles = [];
        $scope.loading = false;

        $scope.loadPackage = function (pckg) {
            
			if(pckg == null) return;
			
			$scope.loading = true;

		
            assetsService.loadCss('~/' + pckg.cssfile).then(function () {
                $scope.loading = false;
                $scope.pckgselected = pckg;
            });

        }



        $scope.selectIcon = function (icon) {
            $scope.model.pickerData = new Icon(icon, $scope.pckgselected.id);
            $scope.submitForm($scope.model); //it passes the model back to the overlay caller
            $scope.closeOverLay();
        }

        

        function initOverlay() {
            var pckg;

            if ($scope.model.pickerData && $scope.model.pickerData.packageId) {
                pckg = $scope.model.pickerConfig.packages.find((el) => el.id == $scope.model.pickerData.packageId);
            }

            //if there is only one package we select that one, regardless what the stored values says.
            if ($scope.packages.length === 1) {
                pckg = $scope.packages[0]; 
            }

            if (angular.isObject(pckg)) {
                $scope.loadPackage(pckg);
            }
        }

        initOverlay();

    }]);