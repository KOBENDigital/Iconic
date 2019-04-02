angular.module("umbraco").directive("iconicIcon", function () {
    var controller = function controller($scope) {
        $scope.$watch("icon", function () {
            if ($scope.package.overrideTemplate) {
                $scope.template = $scope.package.backofficeTemplate.replace(
                    "{icon}",
                    $scope.icon
                );
            } else {
                $scope.template = $scope.package.template.replace(
                    "{icon}",
                    $scope.icon
                );
            }
        });
    };

    var link = function ($scope, el, att) {
        $scope.$watch("icon", function () {
            el.html($scope.template);
            el.attr("title", $scope.icon);
        });
    };

    return {
        restrict: "E",
        scope: {
            icon: "=icon",
            package: "=package"
        },
        controller: controller,
        link: link
    };
});

angular.module("umbraco").directive("packageForm", function () {
    var controller = function ($scope, $http, localizationService, editorService) {
        $scope.submitPackageForm = function () {


            if ($scope.packageForm.$valid) {
                extractStyles(
                    $scope.package,
                    function () {
                        $scope.analysing = "success";
                        $scope.onsaved();
                    },
                    function () {
                        $scope.analysing = "error";
                    }
                );
            }
        };

        $scope.openCssFilePicker = function () {
            const config = {
                select: function (node) {
                    const id = unescape(node.id);
                    $scope.package.cssfile = id;
                    editorService.close();
                }
            };
            openTreePicker(config);

        };

        $scope.openRulesFilePicker = function () {
            const config = {
                select: function (node) {
                    const id = unescape(node.id);
                    $scope.package.sourcefile = id;
                    editorService.close();
                }
            };
            openTreePicker(config);
        };

        function openTreePicker(config) {
            const picker = {
                title: "Select file",
                section: "settings",
                treeAlias: "files",
                entityType: "file",
                filter: function (i) {
                    if (i.name.indexOf(".min.css") === -1 &&
                        i.name.indexOf(".css") === -1) {
                        return true;
                    }
                },
                filterCssClass: "not-allowed",
                close: function () {
                    editorService.close();
                }
            };

            var args = _.assign(picker, config);

            editorService.treePicker(args);
        }

        $scope.removeCssFile = function () {
            $scope.package.cssfile = null;
        };

        $scope.removeRulesFile = function () {
            $scope.package.sourcefile = null;
        };

        function displayError(alias) {
            localizationService.localize(alias).then(function (response) {
                $scope.error = response.value;
            });
        }

        function extractStyles(item, successCallback, errorCallback) {
            $scope.error = null;

            if (!item.selector || item.selector.length <= 0) {
                errorCallback();
                displayError("iconicErrors_selector");
            }

            if (!item.sourcefile) item.sourcefile = item.cssfile;

            $http.get(item.sourcefile).then(
                function (response) {
                    item.extractedStyles = [];
                    var pattern = new RegExp(item.selector, "g");

                    var match = pattern.exec(response.data);
                    while (match !== null) {
                        item.extractedStyles.push(match[1]);
                        match = pattern.exec(response.data);
                    }

                    if (item.extractedStyles.length > 0) {
                        successCallback();
                    } else {
                        displayError("iconicErrors_no_rules");
                        errorCallback();
                    }
                },
                function (response) {
                    displayError("iconicErrors_loadingCss");
                    errorCallback();
                }
            );
        }
    };

    return {
        restrict: "E",
        scope: {
            package: "=",
            onsaved: "&",
            oncancel: "&"
        },
        controller,
        templateUrl: "/App_Plugins/Iconic/Views/directives/package-form.html"
    };
});
