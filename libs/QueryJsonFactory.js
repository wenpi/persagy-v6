var Constants = require('./Constants');
exports.getDefaultQuery = function (type, buildingSign, mark, collection, operation, energyTypeId, timeType) {
    var _type = type;
    var dataType = {
        energyTypeId: energyTypeId,
        timeType: timeType,
        building: buildingSign || "all",
        mark: mark || "udm",
        collection: collection || "building"
    };

    var jsonQuery = {
        version: Constants.version,
        type: type || "all",
        building: {
            buildingSign: buildingSign || "all",
            dataType: dataType
        },
        operation: operation || "select"
    };

    if (type != 'building') {
        jsonQuery[_type] = dataType;
    }
    return jsonQuery;
};

//udm
exports.getUdmQuery = function (collection, operation) {
    var jsonQuery = exports.getDefaultQuery('udm', 'all', 'udm', collection, operation);
    jsonQuery.udm = {
        mark: 'udm',
        collection: collection
    };
    return jsonQuery;
};
//udmview
exports.getUdmViewQuery = function (collection, operation) {
    var jsonQuery = {
        version: Constants.version,
        type: "udmview",
        udmview: {
            mark: "udmview",
            collection: collection
        },
        operation: operation || "select"
    };
    return jsonQuery;
};
//building
exports.getBuildingQuery = function (buildingSign, collection, mark, operation) {
    var jsonQuery = exports.getDefaultQuery("building", buildingSign, mark || "ems", collection, operation);
    return jsonQuery;
};
//buildingview
exports.getBuildingViewQuery = function (collection) {
    var viewName = "buildingview";
    var jsonQuery = exports.getDefaultQuery(viewName, "", viewName, collection);
    jsonQuery.buildingview = {
        mark: viewName,
        collection: collection || ""
    };
    return jsonQuery;
};