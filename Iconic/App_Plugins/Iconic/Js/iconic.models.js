"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icon = function Icon(icon, packageId) {
    _classCallCheck(this, Icon);

    this.icon = icon || "";
    this.packageId = packageId || "";
};

var Package = (function () {
    function Package() {
        _classCallCheck(this, Package);

        this.id = this.uuid();
        this.name = "";
        this.selector = "";
        this.template = '<i class="{icon}"></i>';
        this.overrideTemplate = false;
        this.backofficeTemplate = "";
        this.cssfile = "";
        this.sourcefile = "";
        this.extractedStyles = [];
    }

    _createClass(Package, [{
        key: "uuid",
        value: function uuid() {
            var uuid = "",
                i,
                random;
            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    uuid += "-";
                }
                uuid += (i == 12 ? 4 : i == 16 ? random & 3 | 8 : random).toString(16);
            }
            return uuid;
        }
    }]);

    return Package;
})();

