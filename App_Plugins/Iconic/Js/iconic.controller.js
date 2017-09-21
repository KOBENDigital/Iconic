angular.module("umbraco")
    .controller("Koben.Iconic.Controller", ['$scope', 'dialogService', 'assetsService', function ($scope, dialogService, assetsService) {

        //--------- NOTES: -----------------
        //
        //// It accepts a value as:
        // model.value = {
        //     packageAlias: "alias",
        //     style: "selected style"
        //}

        ////and config
        // model.value.config.packages = [{
        //     alias: "alias",
        //     name: "package name",
        //     selector: "regex to extract the classes from css file",
        //     extraClasses: "add any extra classes apart of the specific one that the icon needs to be display"
        //     cssfile: "url to the css file"
        // }]
        //
        //----------------------------------

        var config = $scope.model.config;

        //it will store the package selected if any
        $scope.pckg;
             
        $scope.overlay = {
            view: "/app_plugins/iconic/views/iconic.dialog.html",            
            title: "Select and icon",
            hideSubmitButton: true,
            submit: $scope.selectIcon,
            close: function () {
                $scope.overlay.show = false;
                $scope.overlay = null;
            },
            pickerData: $scope.model.value,
            pickerConfig: config
        }

        $scope.selectIcon = function (model) {
            if (model.pickerData.style && model.pickerData.packageAlias) {
                $scope.model.value = model.pickerData;
                $scope.modelIsValid = true;
            }
            
        }

        $scope.removeIcon = function () {
            $scope.model.value = {};            
            $scope.modelIsValid = false;
        }


        function loadPackage(packages, packageAlias) {
            return packages.find((el) => el.alias == packageAlias);
        }

        function initPicker() {
            $scope.loading = true;
            if (!angular.isObject($scope.model.value)) $scope.model.value = {};

            if ($scope.model.value && $scope.model.value.packageAlias && $scope.model.value.style) {
                $scope.pckg = loadPackage(config.packages, $scope.model.value.packageAlias);
                if ($scope.pckg) {
                    assetsService.loadCss($scope.pckg.cssfile);
                    $scope.modelIsValid = true;
                }
            }
            $scope.loading = false;
        }

        initPicker();

    }]);