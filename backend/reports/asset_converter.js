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
                    row.ASSET_MODEL, convertNull(row.FEATURE), convertNull(row.ASSET_SERIES), convertNull(row.ACQUISITION_DEPENDENCY),
                    convertNull(row.ENTRY_DATE), convertNull(row.CURRENT_CUSTODIAN), convertNull(row.ASSET_BUILDING),
                    convertNull(row.ASSET_LOCATION), row.COMPUTER_ID, convertNull(row.OPERATIVE_SYSTEM));
                normalizedData.push(lastAsset);
            } else {
                
                lastAsset = new Asset(row.ASSET_KEY, row.ASSET_CATEGORY, row.ASSET_NAME, row.ASSET_BRAND, 
                    row.ASSET_MODEL, convertNull(row.FEATURE), convertNull(row.ASSET_SERIES), convertNull(row.ACQUISITION_DEPENDENCY),
                    convertNull(row.ENTRY_DATE), convertNull(row.CURRENT_CUSTODIAN), convertNull(row.ASSET_BUILDING),
                    convertNull(row.ASSET_LOCATION));
                normalizedData.push(lastAsset);
            }
        }
        if(row.COMPUTER_ID){
            if(lastComputerComponent == null || lastComputerComponent.id != row.COMPUTER_COMPONENT_ID){
                lastComputerComponent = new ComputerComponent(row.COMPUTER_COMPONENT_ID, convertNull(row.COMPUTER_COMPONENT_ASSET_KEY),
                    row.COMPUTER_COMPONENT_NAME, convertNull(row.COMPUTER_COMPONENT_BUILDING), 
                    convertNull(row.COMPUTER_COMPONENT_LOCATION), convertNull(row.COMPUTER_COMPONENT_POSITION),
                    row.COMPUTER_COMPONENT_STATUS);
                lastAsset.components.push(lastComputerComponent);
            }
            if(row.CASE_COMPONENT_ID){
                lastComputerComponent.components.push(new CaseComponent(row.COMPUTER_ID, convertNull(row.CASE_COMPONENT_BRAND),
                    row.CASE_COMPONENT_NAME, convertNull(row.CASE_COMPONENT_MODEL), convertNull(row.CASE_COMPONENT_SERIES),
                    convertNull(row.CASE_COMPONENT_TYPE), convertNull(row.CASE_COMPONENT_CAPACITY), row.CASE_COMPONENT_STATUS,
                    convertNull(row.IS_UPGRADE), convertNull(row.UPGRADE_DATE), convertNull(row.UPGRADE_DETAIL))
                );
            }
        }
    });
    return normalizedData;
}

function convertNull(value){
    return value ? value : ''
}