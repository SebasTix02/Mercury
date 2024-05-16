const Asset = require('./entities/asset');
const Computer = require('./entities/computer');
const ComputerComponent = require('./entities/computer_component');
const CaseComponent = require('./entities/case_component');

exports.getEntities = (denormalizedData) => {
    let normalizedData = [];
    let lastAsset;
    let lastComputerComponent;
    denormalizedData.forEach(row => {
        if(lastAsset == null || lastAsset.assetKey != row.ASSET_KEY){
            if(row.COMPUTER_ID){
                lastAsset = new Computer(row.ASSET_KEY, row.ASSET_CATEGORY, row.ASSET_NAME, row.ASSET_BRAND, 
                    row.ASSET_MODEL, row.FEATURE, row.ASSET_SERIES, row.ACQUISITION_DEPENDENCY, row.ENTRY_DATE, 
                    row.CURRENT_CUSTODIAN, row.ASSET_BUILDING, row.ASSET_LOCATION,
                    row.COMPUTER_ID, row.OPERATIVE_SYSTEM);
                normalizedData.push(lastAsset)
            } else {
                lastAsset = new Asset(row.ASSET_KEY, row.ASSET_CATEGORY, row.ASSET_NAME, row.ASSET_BRAND, 
                    row.ASSET_MODEL, row.FEATURE, row.SERIES, row.ACQUISITION_DEPENDENCY, row.ENTRY_DATE, 
                    row.CURRENT_CUSTODIANT, row.ASSET_BUILDING, row.ASSET_LOCATION);
                normalizedData.push(lastAsset);
            }
        }
        if(row.COMPUTER_ID){
            if(lastComputerComponent == null || lastComputerComponent.id != row.COMPUTER_COMPONENT_ID){
                lastComputerComponent = new ComputerComponent(row.COMPUTER_COMPONENT_ID, row.COMPUTER_COMPONENT_ASSET_KEY,
                    row.COMPUTER_COMPONENT_NAME, row.COMPUTER_COMPONENT_BUILDING, row.COMPUTER_COMPONENT_LOCATION,
                    row.COMPUTER_COMPONENT_POSITION, row.COMPUTER_COMPONENT_STATUS);
                lastAsset.components.push(lastComputerComponent);
            }
            if(row.CASE_COMPONENT_ID){
                lastComputerComponent.components.push(new CaseComponent(row.COMPUTER_ID, row.CASE_COMPONENT_BRAND,
                    row.CASE_COMPONENT_NAME, row.CASE_COMPONENT_MODEL, row.CASE_COMPONENT_SERIES,
                    row.CASE_COMPONENT_TYPE, row.CASE_COMPONENT_CAPACITY, row.CASE_COMPONENT_STATUS,
                    row.IS_UPGRADE, row.UPGRADE_DATE, row.UPGRADE_DETAIL));
            }
        }
    });
    return normalizedData;
}