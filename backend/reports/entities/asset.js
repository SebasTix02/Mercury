class Asset{

    constructor(assetKey, category, name, brand, model, feature, 
        series, acquisitionDependency, entryDate, currentCustodian,
        building, location){
        
        this.assetKey = assetKey;
        this.category = category;
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.feature = feature;
        this.series = series;
        this.acquisitionDependency = acquisitionDependency;
        this.entryDate = entryDate;
        this.currentCustodian = currentCustodian;
        this.building = building;
        this.location = location;
    }
}

module.exports = Asset;