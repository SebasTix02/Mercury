class CaseComponent{

    constructor(id, name, brand, model, series, type, capacity,
        status, isUpgrade, upgradeDate, upgradeDetail){

        this.id = id;
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.series = series;
        this.type = type;
        this.capacity = capacity;
        this.status = status;
        this.isUpgrade = isUpgrade;
        this.upgradeDate = upgradeDate;
        this,upgradeDetail = upgradeDetail;
    }
}

module.exports = CaseComponent;