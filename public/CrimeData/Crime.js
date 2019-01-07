var data_struct=function (Index,Longt,Lat,Year,Month,Day,Time,Weekday,Division,Neighborhood,Crime_type) {

    this.Crime_type=Crime_type;
    this.Lat=Lat;
    this.Longt=Longt;
    this.Year=Year;
    this.Month=Month;
    this.Day=Day;
    this.Time=Time;
    this.Index=Index;
    this.Weekday=Weekday;
    this.Division=Division;
    this.Neighborhood=Neighborhood;

    this.geoJSON={
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [this.Longt, this.Lat]
        },
        "properties": {
            'Crime_type':this.Crime_type,
            'Year':this.Year,
            'Month':this.Month,
            'Day':this.Day,
            'Time':this.Time,
            'Index':this.Index,
            'Weekday':this.Weekday,
            'Division':this.Division,
            'Neighborhood':this.Neighborhood

        }
    };
    this.getJsonData=function () {
        return this.geoJSON;
    }


}





module.exports={Crime_event: data_struct};