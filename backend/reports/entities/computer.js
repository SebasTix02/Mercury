const Asset = require('./asset');

class Computer extends Asset{

    constructor(assetKey, category, name, brand, model, feature, 
        series, acquisitionDependency, entryDate, currentCustodian,
        building, location, computerId, operativeSystem){
        
        super(assetKey, category, name, brand, model, feature, 
            series, acquisitionDependency, entryDate, currentCustodian,
            building, location);
        this.computerId = computerId;
        this.operativeSystem = operativeSystem;
        this.components = [];
    }
}

module.exports = Computer;