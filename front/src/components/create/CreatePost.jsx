import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import {AddCircle as Add} from '@mui/icon-material';
import { Form } from 'react-router-dom';
import { categories } from '../../constants/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import {UserContext} from "../App";
import axios from axios;

const Container = styled(Box)(({theme}) => ({
    margin: '50px 100px',
    [(theme.breakpoints.down('md'))]:{
        margin:0
    }
}));

let {userAuth:{access_token}} = useContext(Usercontext)

const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});

const StyledFormControl = styled(Form)`
    margin-top:10px;
    display:flex;
    flex-direction:row;
`
const InputTextField = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size:25px;
`
const Textarea = styled(TextareaAutosize)`
    width:100%;
    margin-top:50%;
    font-size:10px;
    border: none;
    &:focus-visible{
        outline:none;
    }
`;
const initalPost ={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createdDate: new Date()
}

const CreatePost = () =>{


const [post,setPost] = useState(initalPost);
const [file,setFile] = useState(''); 

const {account } = useContext(DataContext);

const location = useLocation();
const Navigate = useNavigate();
const url = post.picture ? post.picture:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'

useEffect(() => {
        const getImage = async () => {
            if(file){
                const data = new FormData();
                data.append('name',file.name)
                data.append("file",file);
            const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
         post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        }, [file])

const handleChange = (e) =>{
    setPost({...post,[e.target.name]: e.target.value})
}
const savePost = async () =>{
   let response = await API.createPost(post)
   if (response.isSuccess) {
      navigate('/');
   }
}
const handleSaveDraft = (e) =>{
    if(e.target.className.includes("disable")){
        return;
    }
    if (!title.lenght) {
        return toast.error("Write blog title before saving it as a draft");
        
    }
    let loadingToast = toast.loading("publishing...");

    e.target.classList.add('disable');
    
    if (setPost.isReady) {
        setPost.save().then(content =>{
             
            let blogObj ={
        title, banner, des, content, tags, draft: true
    }
   
        axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/CreatePost",blogObj,{
        
            headers:{
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() =>{
            e.target.classList.remove('disable');

            toast.dismiss(loadingToast);
            toast.success("Saved");

            setTimeout(() => {
                navigate("/")
            }, 500);
        })
        .catch(({response}) =>{
            e.target.classList.remove('disble');
            toast.dismiss(loadingToast);
        })         
        })
    }

    
}
    return(
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontsize="large" color="action"/>
                </label>
                <input 
                type="file"
                id='fileInput'
                style={{display:'none'}}
                onChange={(e) => setFile(e.target.files[0])}
                />
           
                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title"/>
                <Button variant='contained' onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>
           <button variant='contained' handleSaveDraft>

           </button>
            <Textarea
            minRows={5}
            placeholder='Tell your story....'
            onChange={(e) => handleChange(e)}
            name='description'
         />
        </Container>
    )
}

export default CreatePost;