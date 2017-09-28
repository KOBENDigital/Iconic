angular.module("umbraco").controller("Koben.Iconic.Prevalues.Packages", ['$scope', '$http', 'assetsService', function ($scope, $http, assetsService) {

    $scope.newItem = new Package();

    $scope.currentItem;
    $scope.analysing = "init";
    $scope.newItemFormErrors = [];
    $scope.configType = "custom";
    $scope.selectedPreConfig = {};

    $scope.addNewItem = function () {

        $scope.analysing = "busy";

        if (!angular.isArray($scope.model.value)) $scope.model.value = [];
        $scope.newItemFormErrors = []; //remove errors

        if (!$scope.newItem.name) $scope.newItemFormErrors.name = true;
        if (!$scope.newItem.selector) $scope.newItemFormErrors.selector = true;
        if (!$scope.newItem.cssfile) $scope.newItemFormErrors.cssfile = true;

        if (Object.keys($scope.newItemFormErrors).length > 0) {
            $scope.analysing = "error";
            return;
        }

        extractStyles($scope.newItem, function () {            
            $scope.model.value.push(angular.copy($scope.newItem));

            //restart new item form model
            $scope.newItem = new Package(); 
            $scope.showNewItemForm = false;
            $scope.analysing = "success";
        }, function () {
            $scope.newItemFormErrors.selector = true;
            $scope.newItemFormErrors.cssfile = true;
            $scope.analysing = "error";
        });

    }


    $scope.selectItem = function (item) {
        if ($scope.currentItem === item)
            $scope.currentItem = null;
        else
            $scope.currentItem = item;
    }

    $scope.removeItem = function (index) {
        $scope.model.value.splice(index, 1);
    }



    $scope.selectPreConfig = function (config) {
        Object.assign($scope.newItem, config);
    }

    $scope.hideItemForm = function () {
        $scope.showNewItemForm = false;
    }


    function extractStyles(item, successCallback, errorCallback) {

        if (!item.selector || item.selector.length <= 0) {
            errorCallback();
        }

        $http.get(item.sourcefile).success(function (data) {
            item.extractedStyles = [];
            var pattern = new RegExp(item.selector, 'g');

            var match = pattern.exec(data);
            while (match !== null) {
                item.extractedStyles.push(match[1])
                match = pattern.exec(data);
            }

            if (item.extractedStyles.length > 0) {
                successCallback();
            } else {
                console.error("Extracted styles are 0");
                errorCallback();

            }

        }).error(function (response) {
            console.error("File couldn't be loaded.");
            errorCallback();
        })

    }



    $scope.preconfig = [{
        name: 'Glyphicons',
        selector: '\\.(glyphicon-[\\w-]+):before{',
        template: '<i class="glyphicon {icon}"></i>',
    }, {
        name: 'Font Awesome',
        selector: '\\.(fa-[\\w-]+):before{',
        template: '<i class="fa {icon}"></i>',
    },
    {
        name: 'Foundation Icons',
        selector: '\\.(fi-[\\w-]+):before{',
        template: '<i class="{icon}"></i>',
    },
    {
        name: 'Material Icons',
        selector: '([\\w_]+)\\se',
        template: '<i class="material-icons">{icon}</i>'
    }];


}]);