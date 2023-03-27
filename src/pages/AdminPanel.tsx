import React, {useEffect, useState} from "react";

import Page from "../types/Page";
import {useAuthHeader} from "react-auth-kit";
import UserService from "../services/user.service";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import {Pagination, Switch} from "@mui/material";
import Box from "@mui/material/Box";
import searchIcon from "../assets/icons/search.svg"
import {useNavigate} from "react-router-dom";

function AdminPanel() {
    const [users, setUsers] = useState<Page<AdminPanelFullUser>>()
    const authHeader = useAuthHeader();
    const [page, setPage] = useState<number>(1);
    const pageSize = 4;
    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState(false);
    const [criteria, setCriteria] = useState<string>();


    const handleChangeUserStatus = (event: React.ChangeEvent<HTMLInputElement>, user: AdminPanelFullUser) => {
        console.log(event.target.checked);
        console.log(user)
        //@ts-ignore
            UserService.changeUserStatus(user.id, event.target.checked, authHeader()).then((res) =>
                setActive(true)
            )
    };

    const getPageNumber = () => {
        let nrOfPages = 0;
        if (users) {
            nrOfPages = Math.ceil(users?.totalElements / users?.elementsPerPage);
        }
        return nrOfPages;
    }

    // @ts-ignore
    const handleChange = (event, page) => {
        setPage(page);
    };

    const getPhotoPath = (path: string) => {
        if (path === null) {
            return "/profileImg/nouser.png"
        } else
            return path;
    }

    useEffect(() => {
            UserService.getAllUsers(criteria, pageSize, page, authHeader()).then(res => {
                setUsers(res.data)
            })

            console.log(page)
            console.log(criteria)
            setLoaded(false)
        setActive(false);
        }, [page, loaded, active]
    )

    useEffect(() => {
        setLoaded(true)
    })

    return (
        <div className="container-md">
            <div className="input-group" style={{
                margin: "1%"
            }}>
                <input type="search" className="form-control rounded"
                       placeholder="Search by email, first name and last name" aria-label="Search"
                       aria-describedby="search-addon" onChange={e => {
                    setCriteria(e.target.value)
                    setLoaded(false)
                }}/>
                <img src={searchIcon} style={{margin:"3px"}} alt="Search Icon"/>

            </div>
            {loaded ?
                <div>
                    {Array.isArray(users?.content) ?

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Profile image</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Account status</th>
                                <th>Created date</th>
                            </tr>
                            </thead>
                            {
                                users?.content.map((result: AdminPanelFullUser) => {
                                    return (
                                        <tbody key={result.id}>
                                        <tr>
                                            <td>{result.id}</td>
                                            <td><img className="img-thumbnail" src={getPhotoPath(result.profilePicture)}
                                                     height="50px" width="100px"/></td>
                                            <td>{result.firstName}</td>
                                            <td>{result.lastName}</td>
                                            <td>{result.email}</td>
                                            <td>{result.roles.toString()}</td>
                                            <td>
                                                <Switch
                                                    checked={result.accountStatus}
                                                    onChange={(event) => handleChangeUserStatus(event, result)}
                                                    inputProps={{'aria-label': 'controlled'}}
                                                />
                                            </td>
                                            <td>{result.createdAt}</td>

                                        </tr>
                                        </tbody>
                                    )
                                })}
                        </table> : <>No elements found</>
                    }
                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                        <Pagination sx={{
                            mr: 3,
                            mt: 1,
                        }} size="large" count={getPageNumber()} page={page} onChange={handleChange}
                                    variant="outlined"/>
                        {/*<Button*/}
                    {/*        sx={{*/}
                    {/*            background: "#F1F1F1",*/}
                    {/*            color: "black",*/}
                    {/*            fontWeight: "bolder",*/}
                    {/*            mt: 0.50,*/}
                    {/*            borderRadius: '10px',*/}
                    {/*            width: '26.5%'*/}
                    {/*        }}*/}
                    {/*        onClick={() => navigate("/dynamic-app-props")}*/}
                    {/*    >*/}
                    {/*        <img src={filterIcon}/>system properties*/}
                    {/*    </Button>*/}
                    </Box>

                </div>
                :
                <>no data</>}
        </div>
    )
}

export default AdminPanel;

