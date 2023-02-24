import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Alert } from "@mui/material";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-hot-toast';

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("email is required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.mixed().test('fileFormat', 'Invalid file format', (value) => {
        if (!value) {
          return true; // empty values are validated in a different way
        }
        const acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        return acceptedFormats.includes(value.type);
      }),
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const RegistrationForm = () => {
    const [pageType, setPageType] = useState("register");
    const { palette } = useTheme();
    const navigate = useNavigate();

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        axios.post(`http://localhost:5000/auth/register`, formData, { headers: { "Content-Type": "application/json" } })
            .then((res) => {
                console.log(res.data,'--------------');
                const savedUser = res.data;
                onSubmitProps.resetForm();

                if (savedUser) {
                    navigate("/");
                }
            })
            .catch((err) => {
                toast.error(err.response.data.error, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    };

    return (
        <Formik
            onSubmit={register}
            initialValues={initialValues}
            validationSchema={registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <MDBContainer className="my-5 main">

                        <MDBCard>
                            <MDBRow className='g-0 body'>

                                <MDBCol md='6'>
                                    <MDBCardImage src='https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700' alt="login form" className='p-5 img-fluid' style={{ objectFit: "cover", height: "100%" }} />
                                </MDBCol>

                                <MDBCol md='6'>
                                    <MDBCardBody className='d-flex flex-column mt-5 d-flex align-items-centeryy'>

                                        <div className='d-flex flex-row mt-2'>
                                            <MDBIcon fas icon="fa-doutone fa-hashtag fa-3x me-3" style={{ color: '#ff6219' }} />

                                            <span className="h1 fw-bold mb-0">Sociolog</span>
                                        </div>

                                        <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create an account</h5>
                                        <Box>

                                            <TextField wrapperClass='mb-4' className='mb-4' label='firstName' id='formControlLg' type='text' size="lg" fullWidth value={values.firstName} name="firstName" onBlur={handleBlur} onChange={handleChange}
                                                error={
                                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                                }
                                                helperText={touched.firstName && errors.firstName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField wrapperClass='mb-4 mt-2' className='mb-4' label='lastName' id='formControlLg' type='text' size="lg" fullWidth value={values.lastName} name="lastName" onBlur={handleBlur} onChange={handleChange}
                                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField wrapperClass='mb-4 mt-2' className='mb-4' label='Location' id='formControlLg' type='text' size="lg" fullWidth value={values.location} name="location" onBlur={handleBlur} onChange={handleChange}
                                                error={Boolean(touched.location) && Boolean(errors.location)}
                                                helperText={touched.location && errors.location}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField wrapperClass='mb-4' className='mb-4' label='occupation' id='formControlLg' type='text' size="lg" fullWidth value={values.occupation} name="occupation" onBlur={handleBlur} onChange={handleChange}
                                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                                helperText={touched.occupation && errors.occupation}
                                                sx={{ gridColumn: "span 4" }}
                                            />

                                            <Box
                                                gridColumn="span 4"
                                                border={`1px solid ${palette.neutral.medium}`}
                                                borderRadius="5px"
                                                p="1rem"
                                                marginBottom={"1.5rem"}
                                            >
                                                <Dropzone
                                                    acceptedFiles=".jpg,.jpeg,.png"
                                                    multiple={false}
                                                    onDrop={(acceptedFiles) =>
                                                        setFieldValue("picture", acceptedFiles[0])
                                                    }
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <Box
                                                            {...getRootProps()}
                                                            border={`2px dashed ${palette.primary.main}`}
                                                            p="1rem"
                                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {!values.picture ? (
                                                                <p>Add Picture Here</p>
                                                            ) : (
                                                                <FlexBetween>
                                                                    <Typography>{values.picture.name}</Typography>
                                                                    <EditOutlinedIcon />
                                                                </FlexBetween>
                                                            )}
                                                        </Box>
                                                    )}
                                                </Dropzone>
                                            </Box>
                                            <TextField wrapperClass='mb-4' className='mb-4' label='Email' id='formControlLg' type='email' size="lg" fullWidth value={values.email} name="email" onBlur={handleBlur} onChange={handleChange}
                                                error={Boolean(touched.email) && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField wrapperClass='mb-4' className='mb-4' label='Password' id='formControlLg' type='password' name="password" size="lg" fullWidth value={values.password} onBlur={handleBlur} onChange={handleChange}
                                                error={Boolean(touched.password) && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                                sx={{ gridColumn: "span 4" }}
                                            />

                                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                                Register
                                            </Button>
                                            <Box mt={2}>
                                                <Typography variant="body2" align="center">
                                                    Already have an account?{" "}
                                                    <Link to="/" onClick={() => setPageType("login")}>
                                                        Login
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBContainer>
                </form>
            )}
        </Formik>
    )
}

export default RegistrationForm