// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
//   Typography,
//   useTheme,
//   Alert,
// } from "@mui/material";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput
// }
//   from 'mdb-react-ui-kit';
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "state";
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";
// import axios from "axios";
// // import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'
// import { toast, Toaster } from 'react-hot-toast'

// const registerSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("email is required"),
//   password: yup.string().required("required"),
//   location: yup.string().required("required"),
//   picture: yup.string().required("required"),
// });

// const loginSchema = yup.object().shape({
//   email: yup.string().email("invalid email").required("required"),
//   password: yup.string().required("required"),
// });

// const initialValuesRegister = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   location: "",
//   occupation: "",
//   picture: "",
// };

// const initialValuesLogin = {
//   email: "",
//   password: "",
// };

// const Form = () => {
//   const [pageType, setPageType] = useState("login");
//   const { palette } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const isLogin = pageType === "login";
//   const isRegister = pageType === "register";


//   const register = async (values, onSubmitProps) => {
//     // this allows us to send form info with image
//     const formData = new FormData();
//     for (let value in values) {
//       formData.append(value, values[value]);
//     }
//     formData.append("picturePath", values.picture.name);


//     axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, formData,
//       { headers: { "Content-Type": "application/json" } }
//     ).then((res) => {
//       const savedUser = res.data;
//       onSubmitProps.resetForm();

//       if (savedUser) {
//         setPageType("login");
//       }
//     }).catch((err) => {
//       ((error) => {
//         toast.error(error.response.data.error, {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",

//         });
//       })(err)
//     })
//   };

//   const login = async (values, onSubmitProps) => {
//     axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, JSON.stringify(values),
//       { headers: { "Content-Type": "application/json" } }
//     ).then((response) => {
//       const loggedIn = response.data;
//       onSubmitProps.resetForm();
//       if (loggedIn) {
//         dispatch(
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token,
//           })

//         );
//         navigate("/home");
//       }

//     }).catch((err) => {
//       ((error) => {
//         toast.error(error.response.data.msg, {
//           position : 'top-right'
//         });
//       })(err)
//       // alert(error.response.data.msg)
//     })



//   };

//   const handleFormSubmit = async (values, onSubmitProps) => {
//     if (isLogin) await login(values, onSubmitProps);
//     if (isRegister) await register(values, onSubmitProps);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
//       validationSchema={isLogin ? loginSchema : registerSchema}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         setFieldValue,
//         resetForm,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           {/* <Box */}
//           <MDBContainer className="my-5 main">

//             <MDBCard>
//               <MDBRow className='g-0 body'>

//                 <MDBCol md='6'>
//                   <MDBCardImage src='https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700' alt="login form" className='p-5 img-fluid' style={{ objectFit: "cover", height: "100%" }} />
//                 </MDBCol>

//                 <MDBCol md='6'>
//                   <MDBCardBody className='d-flex flex-column mt-5 d-flex align-items-centeryy'>

//                     <div className='d-flex flex-row mt-2'>
//                       <MDBIcon fas icon="fa-doutone fa-hashtag fa-3x me-3" style={{ color: '#ff6219' }} />

//                       <span className="h1 fw-bold mb-0">sociolog</span>
//                     </div>

//                     <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
//                     {/* > */}
//                     {isRegister && (

//                       <Box>

//                         <TextField wrapperClass='mb-4' className='mb-4' label='firstName' id='formControlLg' type='text' size="lg" fullWidth value={values.firstName} name="firstName" onBlur={handleBlur} onChange={handleChange}
//                           error={
//                             Boolean(touched.firstName) && Boolean(errors.firstName)
//                           }
//                           helperText={touched.firstName && errors.firstName}
//                           sx={{ gridColumn: "span 2" }}
//                         />
//                         <TextField wrapperClass='mb-4 mt-2' className='mb-4' label='lastName' id='formControlLg' type='text' size="lg" fullWidth value={values.lastName} name="lastName" onBlur={handleBlur} onChange={handleChange}
//                           error={Boolean(touched.lastName) && Boolean(errors.lastName)}
//                           helperText={touched.lastName && errors.lastName}
//                           sx={{ gridColumn: "span 2" }}
//                         />
//                         <TextField wrapperClass='mb-4 mt-2' className='mb-4' label='Location' id='formControlLg' type='text' size="lg" fullWidth value={values.location} name="location" onBlur={handleBlur} onChange={handleChange}
//                           error={Boolean(touched.location) && Boolean(errors.location)}
//                           helperText={touched.location && errors.location}
//                           sx={{ gridColumn: "span 4" }}
//                         />
//                         <TextField wrapperClass='mb-4' className='mb-4' label='occupation' id='formControlLg' type='text' size="lg" fullWidth value={values.occupation} name="occupation" onBlur={handleBlur} onChange={handleChange}
//                           error={Boolean(touched.occupation) && Boolean(errors.occupation)}
//                           helperText={touched.occupation && errors.occupation}
//                           sx={{ gridColumn: "span 4" }}
//                         />

//                         <Box
//                           gridColumn="span 4"
//                           border={`1px solid ${palette.neutral.medium}`}
//                           borderRadius="5px"
//                           p="1rem"
//                           marginBottom={"1.5rem"}
//                         >
//                           <Dropzone
//                             acceptedFiles=".jpg,.jpeg,.png"
//                             multiple={false}
//                             onDrop={(acceptedFiles) =>
//                               setFieldValue("picture", acceptedFiles[0])
//                             }
//                           >
//                             {({ getRootProps, getInputProps }) => (
//                               <Box
//                                 {...getRootProps()}
//                                 border={`2px dashed ${palette.primary.main}`}
//                                 p="1rem"
//                                 sx={{ "&:hover": { cursor: "pointer" } }}
//                               >
//                                 <input {...getInputProps()} />
//                                 {!values.picture ? (
//                                   <p>Add Picture Here</p>
//                                 ) : (
//                                   <FlexBetween>
//                                     <Typography>{values.picture.name}</Typography>
//                                     <EditOutlinedIcon />
//                                   </FlexBetween>
//                                 )}
//                               </Box>
//                             )}
//                           </Dropzone>
//                         </Box>
//                       </Box>


//                     )}

//                     <TextField wrapperClass='mb-4' className='mb-4' label='Email address' id='formControlLg' type='email' name="email" size="lg" value={values.email} onBlur={handleBlur} onChange={handleChange}
//                       error={Boolean(touched.email) && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                       sx={{ gridColumn: "span 4" }}
//                     />
//                     <TextField wrapperClass='mb-4' className='mb-4' label='Password' id='formControlLg' type='password' name="password" size="lg" value={values.password} onBlur={handleBlur} onChange={handleChange}
//                       error={Boolean(touched.password) && Boolean(errors.password)}
//                       helperText={touched.password && errors.password}
//                       sx={{ gridColumn: "span 4" }}
//                     />

//                   </MDBCardBody>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCard>
//           </MDBContainer>

//           <Box>
//             <Button
//               // onClick={handleLogin}
//               fullWidth
//               type="submit"
//               sx={{
//                 m: "2rem 0",
//                 p: "1rem",
//                 backgroundColor: palette.primary.main,
//                 color: palette.background.alt,
//                 "&:hover": { color: palette.primary.main },
//               }}
//             >
//               {isLogin ? "LOGIN" : "REGISTER"}
//             </Button>
//             {/* <ToastContainer /> */}
//             <Toaster/>
//             <Typography
//               onClick={() => {
//                 setPageType(isLogin ? "register" : "login");
//                 resetForm();
//               }}
//               sx={{
//                 textDecoration: "underline",
//                 color: palette.primary.main,
//                 "&:hover": {
//                   cursor: "pointer",
//                   color: palette.primary.light,
//                 },
//               }}
//             >
//               {isLogin
//                 ? "Don't have an account? Sign Up here."
//                 : "Already have an account? Login here."}
//             </Typography>
//           </Box>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default Form;



import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Alert } from "@mui/material";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";


const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        JSON.stringify(values),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const loggedIn = response.data;
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        }
      })
      .catch((err) => {
        ((error) => {
          toast.error(error.response.data.msg, {
            position: "top-center",
          });
        })(err);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
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
                  <MDBCardImage src='https://amumtionalrollercoasterhome.files.wordpress.com/2021/05/happy-friends-celebrating-event-together_74855-7482.webp' alt="login form" className='p-5 img-fluid' style={{ objectFit: "cover", height: "100%", width: "100%", display:"inlineblock" }} />
                </MDBCol>

                <MDBCol md='6'>
                  <MDBCardBody className='d-flex flex-column mt-5 d-flex align-items-centeryy'>

                    <div className='d-flex flex-row mt-2'>
                      <MDBIcon fas icon="fa-doutone fa-hashtag fa-3x me-3" style={{ color: '#ff6219' }} />

                      <span className="h1 fw-bold mb-0">Sociolog</span>
                    </div>

                    <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Login to your account</h5>
                    <Box>
                      <TextField
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                      </Button>
                      <Box mt={2}>
                        <Typography variant="body2" align="center"
                          sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                              cursor: "pointer",
                              color: palette.primary.light,
                            },
                          }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" onClick={() => setPageType("register")}>
                            Register
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBContainer>
          <Toaster/>
        </form>
      )}
    </Formik>
  );
};

export default Login;
