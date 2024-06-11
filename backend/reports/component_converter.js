exports.simplifyCaseComponents = (assets) => {
    let simplifiedComponents;
    let computerCase = null;

    assets.forEach(asset => {
        simplifiedComponents = '';

        if(asset.hasOwnProperty('computerId')){
            computerCase = asset.components.find(component => component.name == 'GABINETE');
        
            computerCase.components.forEach( (component, idx) => {
                simplifiedComponents += component.name;
                simplifiedComponents += component.name == 'PROCESADOR' ? 
                    ` ${component.brand} ${component.model}` : ` ${component.capacity}`;
                simplifiedComponents += (idx < computerCase.components.length - 1) ? ', ' : '.';
            });
        }
        
        asset.feature = simplifiedComponents;
    });
}