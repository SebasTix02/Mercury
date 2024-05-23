class ComputerComponent{

    constructor(id, assetKey, name, building, location, position, status){
        this.id = id;
        this.assetKey = assetKey;
        this.name = name;
        this.building = building;
        this.location = location;
        this.position = position;
        this.status = status;
        this.components = [];
    }
}

module.exports = ComputerComponent