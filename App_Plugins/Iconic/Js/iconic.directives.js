angular.module("umbraco").directive('iconicIcon', function () {

    var controller = function controller($scope) {

        $scope.$watch('icon', function () {
            $scope.template = $scope.package.template.replace("{icon}", $scope.icon);
        })


    };

    var link = function ($scope, el, att) {
        $scope.$watch('icon', function () {
            el.html($scope.template);
        });
    }


    return {
        restrict: 'E',
        scope: {
            icon: '=icon',
            package: '=package'
        },
        controller: controller,
        link: link
    }

});