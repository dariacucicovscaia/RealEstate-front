import React, {useEffect, useState} from "react";

import Page from "../types/Page";
import {useAuthHeader} from "react-auth-kit";
import UserService from "../services/user.service";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import {Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import searchIcon from "../assets/icons/search.svg"
function AdminPanel() {
    const [users, setUsers] = useState<Page<AdminPanelFullUser>>()
    const authHeader = useAuthHeader();
    const [page, setPage] = useState<number>(1);
    const pageSize = 7;
    const [loaded, setLoaded] = useState(false);
    const [criteria, setCriteria] = useState<string>();

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

    useEffect(() => {
            UserService.getAllUsers(criteria, pageSize, page, authHeader()).then(res => {
                setUsers(res.data)
            })

            console.log(page)
            console.log(criteria)
        setLoaded(false)
        }, [page, loaded]
    )

    useEffect(() => {
        setLoaded(true)
    })
    const getPhotoPath = (path: string) => {
        if (path === null) {
            return "/profileImg/nouser.png"
        } else
            return path;
    }


    return (
        <div className="container-md">
            <div className="input-group" style={{
                margin:"1%"
            }}>
                <input type="search"  className="form-control rounded" placeholder="Search by email" aria-label="Search"
                       aria-describedby="search-addon" onChange={e => {
                           setLoaded(true)
                           setCriteria(e.target.value)}}/>
                <img src={searchIcon} alt="Search Icon" onClick={() => {
                    console.log(criteria)
                    setLoaded(false)
                }}/>


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
                                            <td>{result.accountStatus}</td>
                                            <td>{result.createdAt}</td>
                                        </tr>
                                        </tbody>
                                    )
                                })}
                        </table> : <>No elements found</>
                    }
                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{
                        margin: "20px 0px"
                    }}>
                        <Pagination size="large" count={getPageNumber()} page={page} onChange={handleChange}
                                    variant="outlined"/>
                    </Box>
                </div>
                :
                <>no data</>}
        </div>
    )
}

export default AdminPanel;

