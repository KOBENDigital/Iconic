angular.module("umbraco").directive('iconicIcon', function () {

    return {
        restrict: 'E',
        scope: {
            icon: '=',
            package: '='
        },
        template: displayIcon
    }

    function displayIcon(el, attr) {
        console.debug(attr.icon);
        if (package && icon) {
            return package.template.replace("{icon}", icon.iconStyle);
        }

        return "";
    }

});