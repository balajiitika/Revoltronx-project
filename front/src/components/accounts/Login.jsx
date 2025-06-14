import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataProvider';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import {API} from '../../service/api';
import user from '../../../../server/model/user';
import {useNavigate, userNavigate} from 'react-router-dom';

const Component = styled(Box)`
    width:400;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
    `;
    
    const Image = styled('img')({
        width:100,
        margin: 'auto',
        display: 'flex',
        padding: '50px 0 0'
    })
     const Wrapper = styled(Box)`
        padding: 25px 35px;
        display: flex;
        flex: 1;
        flex-direction : column;
        & > div, & > button, & > p{
        margin-top: 20px
        }
     `
    const LoginButton = styled(Button)`
        text-transform : none; 
        background : #FB641B;
        color: #fff;
        height: 48px;
        border-radius: 2px;
        `
    const SignupButton = styled(Button)`
        text-transform : none; 
        background : #fff;
        color: #2874f0;
        height: 48px;
        border-radius: 2px;
        box-shadow : 0 2px 4px 0 rgb(0 0 0/ 20%);
    `
    const Text = styled(Typography)`
        color: #878787;
        font-size: 14px;
    `
    const Error = styled(Typography)`
        font-size: 10px;
        color:#ff6161;
        line-height:0;
        margin-top: 10px;
        font-weight: 600;
    `
    const loginIntialvalues = {
        username: '',
        password: ''
    }
    const signupIntialvalues = {
        name:'',
        username: '',
        password: '',
    }
        
const Login = ({isUserAuthenticated}) =>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setsignup ] = useState(signupIntialvalues);
    const [error, setError] = useState('');
    const [login, setlogin] = useState(loginIntialvalues);
    
    const [setAccount] = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () =>{
         account === 'signup' ? setAccount('login') : setAccount('signup');
    }

    const onInputchange = (e) =>{
        setsignup({...signup,   [e.target.name]: e.target.value});
    }
        const signupUser = async() =>{
           let response = await API.userSignup(signup);
           if (response.isSuccess) {
            setError('');
            setsignup(signupIntialvalues);
            setAccount('login')
           }else{
                setError('something went wrong! Please try again later')
           }
        }
        const onValueChange = (e) => {
            setlogin({...login, [e.target.name]: e.target.value})
        }
        const loginUser = async () =>{
            let response = await API.userlogin(login);
            if (response.isSuccess) {
                setError('');
                sessionStorage.setItem('accessToken',`Bearer $(respose.data.accessToken)`);
                 sessionStorage.setItem('refreshToken',`Bearer $(respose.data.refreshToken)`);
              setAccount({ usename: response.data.username, name:response.data.name})
                 isUserAuthenticated(true);
              navigate('/');  
            } else {
                setError('something went wrong! Please try again later')
            }
        }
    return(
       <Component>
        <Box>
        <Image src={imageURL} alt="login" />
        {
        account === 'login'?
            

        <Wrapper>
       <TextField variant='standard' value={login.username } onChange={(e) =>onValueChange(e)} name='username' label="Enter username" />
       <TextField variant='standard' value={login.password} onChange={(e) =>onValueChange(e)} name='password' label="Enter password"/>
       {error && <Error>{error}</Error>}
       <LoginButton variant='contained'onClick={() => loginUser()} >Login</LoginButton>
       <Text style={{textAlign: "center"} }>OR</Text>
       <SignupButton onClick={()=> toggleSignup()}>Create an Account</SignupButton>
       </Wrapper>
        :
       <Wrapper>
       <TextField variant='standard' onChange={(e) => onInputchange(e)} name = 'name' label="Enter name" />
       <TextField variant='standard' onChange={(e) => onInputchange(e)} name = 'username'label="Enter username"/>
       <TextField variant='standard' onChange={(e) => onInputchange(e)} name = 'password' label="Enter password"/>
       {error && <Error>{error}</Error>}
       <SignupButton variant='contained' onClick={() => signupUser()}>Signup</SignupButton>
       <Text style={{textAlign: "center"} }>OR</Text>
       <LoginButton onClick={()=> toggleSignup()}>Already have an Account</LoginButton>
       </Wrapper>
        }
       </Box>
       </Component>
    )
}

export default Login;    