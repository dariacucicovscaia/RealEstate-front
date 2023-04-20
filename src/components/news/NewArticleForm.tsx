import {Field, Formik} from "formik";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import UserService from "../../services/user.service";
import AdminPanelFullUser from "../../types/AdminPanelFullUser";
import NewsService from "../../services/news.service";
import IArticle from "../../types/IArticle";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import axios from "axios";
import {routes} from "../../config/routes";

function NewArticleForm() {

    const [loaded, setLoaded] = useState(false)
    const user = useAuthUser();
    const authHeader = useAuthHeader();
    const [userDetails, setUserDetails] = useState<AdminPanelFullUser>()
    const [articleCreated, setCreatedArticle] = useState<IArticle>();
    const [imageUrl, setImageUrl] = useState("");
    const hiddenFileInput = React.useRef(null);
    const [uploadedPictures, setUploadedPictures] = useState<File>();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (e: EditorState) => {
        setEditorState(e)

    }
    const handleClick = (event: any) => {
        event.preventDefault();
        // @ts-ignore
        hiddenFileInput.current.click();
    };
    useEffect(() => {
        setLoaded(false)
        UserService.getUserDetails(user()?.id, authHeader()).then(resp => setUserDetails(resp.data))
    }, [loaded])

    const handleFileUpload = (file: File) => {
        console.log(file)
        const userEmail = user()?.email.substring(0, user()?.email.lastIndexOf("@"))


        const data = new FormData();
        data.append('file', file)
        data.append('userName', userEmail)
        axios.post(routes.STATIC_CONTENT_URL + '/uploadArticlePic', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((e) => console.error(e))

    };
    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>

            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        content: '',
                        imagePath: '',
                        imageCapture: '',
                        firstName: userDetails?.firstName,
                        lastName: userDetails?.lastName,
                        externalId: user()?.id,
                        isPublished: false,
                    }}

                    onSubmit={async (values, {setErrors, setStatus}) => {
                        try {
                            values.firstName = userDetails?.firstName
                            values.lastName = userDetails?.lastName
                            var text = editorState.getCurrentContent().getBlocksAsArray();
                            text.map((item) => {
                                values.content = item.getText()
                            });

                            console.log(values)

                            // @ts-ignore
                            NewsService.saveArticle(values).then(resp => {
                                setCreatedArticle(resp.data)
                                if (uploadedPictures) {
                                    console.log("uploading")
                                    handleFileUpload(uploadedPictures)
                                }
                            })


                            setLoaded(true);
                            setStatus({success: false});
                        } catch (err) {
                            console.error(err);
                            setStatus({success: false});
                            // @ts-ignore
                            setErrors({submit: err.message});
                        }
                    }}
                >
                    {({errors, handleBlur, handleChange, handleSubmit, touched, values}) => (
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="title-newArticle"
                                        type="title"
                                        value={values.title}
                                        name="title"
                                        label="title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Article title"
                                        fullWidth
                                        error={Boolean(touched.title && errors.title)}
                                    />
                                    {touched.title && errors.title && (
                                        <FormHelperText error id="helper-text-phoneNumber-signup">
                                            {errors.title}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="description-newArticle"
                                        type="description"
                                        value={values.description}
                                        name="description"
                                        label="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Short description for your article"
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-phoneNumber-signup">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel>
                                        <Box sx={{
                                            justifyContent: "left", alignItems: "left",
                                            display: "flex"
                                        }}>
                                            <Box sx={{marginRight: "3px"}}><Field type="checkbox"
                                                                                  name="isPublished"/></Box>Publish
                                        </Box>
                                    </InputLabel>

                                </Stack>
                            </Grid>


                            <div className="flex flex-col items-start mb-2">
                                <Button
                                    fullWidth
                                    sx={{
                                        background: "white",
                                        color: "black",
                                        fontWeight: "bolder",
                                        m: 0.50,
                                        width: '100%',
                                        borderRadius: 2
                                    }}
                                    onClick={handleClick}
                                >
                                    Upload picture
                                </Button>
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setUploadedPictures(e.target.files[0]);
                                            console.log(e.target.files[0])

                                            const userEmail = user()?.email.substring(0, user()?.email.lastIndexOf("@"))
                                            values.imagePath = ("/article/" + userEmail + "/" + e.target.files[0].name)
                                            setImageUrl(URL.createObjectURL(e.target.files[0]))

                                        }
                                    }}
                                    style={{display: "none"}}
                                />
                                <Box justifyContent="center" alignItems="center" display="flex">
                                    {
                                        imageUrl &&
                                        uploadedPictures ?
                                            <img src={imageUrl} height="200px" style={{margin: "2px"}}/>
                                            : <></>
                                    }
                                </Box>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    )}
                </Formik>
            </Box>

        </Box>

    )
}

export default NewArticleForm