"use strict";

angular.module("umbraco").directive("iconicIcon", function () {
    var controller = function controller($scope) {
        $scope.$watch("icon", function () {
            if ($scope["package"].overrideTemplate) {
                $scope.template = $scope["package"].backofficeTemplate.replace("{icon}", $scope.icon);
            } else {
                $scope.template = $scope["package"].template.replace("{icon}", $scope.icon);
            }
        });
    };

    var link = function link($scope, el, att) {
        $scope.$watch("icon", function () {
            el.html($scope.template);
            el.attr("title", $scope.icon);
        });
    };

    return {
        restrict: "E",
        scope: {
            icon: "=icon",
            "package": "=package"
        },
        controller: controller,
        link: link
    };
});

