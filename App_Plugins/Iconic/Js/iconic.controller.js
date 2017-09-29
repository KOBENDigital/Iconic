angular.module("umbraco")
    .controller("Koben.Iconic.Controller", ['$scope', 'dialogService', 'assetsService', function ($scope, dialogService, assetsService) {
        var config = $scope.model.config;

        //it will store the package selected if any
        $scope.pckg;
        $scope.modelIsValid = false;
        $scope.icon;
                    
        $scope.selectIcon = function (model) {
            if (model.pickerData.iconStyle && model.pickerData.packageId) {
                $scope.pckg = loadPackage(config.packages, model.pickerData.packageId);
                $scope.model.value = model.pickerData;
                $scope.model.value.iconDisplay = parseIconTemplate($scope.pckg.template, $scope.model.value.iconStyle);
                $scope.modelIsValid = true;
            } else {
                $scope.modelIsValid = false;
            }
            
        }


        $scope.displayIcon = function (icon) {
            if ($scope.modelIsValid) {
                return parseIconTemplate($scope.pckg.template, icon)
            }
        }

        function parseIconTemplate(template, icon) {
            return template.replace("{icon}", icon);
        }

        $scope.removeIcon = function () {
            $scope.model.value = {};            
            $scope.modelIsValid = false;
        }

        $scope.overlay = {
            view: "/app_plugins/iconic/views/iconic.dialog.html",
            title: "Select and icon",
            hideSubmitButton: true,
            submit: $scope.selectIcon,
            close: function () {
                $scope.overlay.show = false;                
            },
            pickerData: new Icon($scope.model.value.iconStyle,  $scope.model.value.packageId),
            pickerConfig: config
        }


        function loadPackage(packages, packageId) {
            return packages.find((el) => el.id == packageId);
        }

        function initPicker() {
            $scope.loading = true;
            if (!angular.isObject($scope.model.value)) $scope.model.value = {};

            if ($scope.model.value && $scope.model.value.packageId && $scope.model.value.iconStyle) {
                
                $scope.pckg = loadPackage(config.packages, $scope.model.value.packageId);
                if ($scope.pckg) {
                    assetsService.loadCss($scope.pckg.cssfile);
                    $scope.modelIsValid = true;
                }
            } else {
                $scope.modelIsValid = false;
            }
            $scope.loading = false;
        }

        initPicker();

    }]);