import Estate from "./IEstate";

export default interface EstateDetails{
    estate : Estate;
    squareMeters : number;
    numberOfRooms : number;
    numberOfBathRooms : number;
    numberOfGarages : number;
    yearOfConstruction : string;
    typeOfEstate : string;

}