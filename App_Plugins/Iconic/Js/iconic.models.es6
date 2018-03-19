class Icon {
    constructor(icon, packageId) {
        this.icon = icon || "";
        this.packageId = packageId || "";
    }
}

class Package {
    constructor() {
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

    uuid() {
        var uuid = "", i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }
}