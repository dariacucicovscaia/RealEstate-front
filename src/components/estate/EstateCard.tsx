import React, {useEffect, useState} from "react";
import IEstate from "../../types/IEstate";
import EstateService from "../../services/estate.service";
import EstateDTO from "../../types/EstateDTO";
import bedroomIcon from '../../assets/icons/bedroom-icon.svg';
import bathroomIcon from '../../assets/icons/bath-room-icom.svg';
import garageIcon from '../../assets/icons/garage-property-svgrepo-com.svg';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {ImageList, ImageListItem} from "@mui/material";
import Button from "@mui/material/Button";
import squareMeters from "../../assets/icons/square.svg";

const EstatesCard: React.FC<{ estate: IEstate }> = ({estate}) => {
    const [estateDetails, setEstateDetails] = useState<EstateDTO>();
    const navigate = useNavigate();

    useEffect(() => {
        EstateService.getAllEstateDetails(estate.id).then(res => {
                setEstateDetails(res.data)
            }
        )
    }, [estate])
    return (
        <div className="card">
            <div className="card__name">

            </div>
            <div className="card-body">
                <ImageList sx={{width: "100%", height: 200}} cols={4} rowHeight={164}>
                    {estate.estatePhotos.map((photo: string) => {
                        if (photo) return (
                            <ImageListItem key={photo}>
                                <img className="img-fluid" src={photo}/>
                            </ImageListItem>
                        )
                        else return ( <ImageListItem key={"/estate/noEstate.png"}><img className="img-fluid" src="/estate/noEstate.png"/></ImageListItem>)
                    })}

                </ImageList>
                <h3>{estateDetails?.price} {estateDetails?.currency}</h3>
                <Box justifyContent={"left"} alignItems={"left"} display={"flex"} sx={{
                    margin: "20px 0px"
                }}>
                    <div className="d-flex">
                        <img src={bedroomIcon}/>
                        <div style={{margin: "5%"}}>{estateDetails?.numberOfRooms}</div>
                        <img src={bathroomIcon}/>
                        <div style={{margin: "5%"}}>{estateDetails?.numberOfBathRooms}</div>
                        <img src={squareMeters}/>
                        <div style={{margin: "5%"}}>{estateDetails?.squareMeters}m&#178;</div>
                        {
                            (estateDetails?.numberOfGarages !== 0) ?
                                <><img src={garageIcon}/>
                                    <div style={{margin: "5%"}}> {estateDetails?.numberOfGarages}</div>
                                </>
                                : <></>
                        }
                        <div style={{margin: "5%"}}>|</div>
                        <div style={{margin: "5%"}}>{estateDetails?.typeOfEstate}</div>
                    </div>
                </Box>
                <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                    <Button onClick={() =>navigate("/details/"+estate.id)}
                            sx={{
                                background: "#F1F1F1",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                width: '25%',
                                borderRadius: 2
                            }}>
                        details
                    </Button>
                </Box>
            </div>
        </div>
    )
}
export default EstatesCard;