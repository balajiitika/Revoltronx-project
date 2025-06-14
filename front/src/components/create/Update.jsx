import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import {AddCircle as Add} from '@mui/icon-material';
import { Form, useParams } from 'react-router-dom';
import { categories } from '../../constants/data';
import { useLocation, useNavigate, useParamsS } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)(({theme}) => ({
    margin: '50px 100px',
    [(theme.breakpoints.down('md'))]:{
        margin:0
    }
}));

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

const Update = () =>{


const [post,setPost] = useState(initalPost);
const [file,setFile] = useState(''); 

const {account } = useContext(DataContext);

const location = useLocation();
const navigate = useNavigate();
const {id} = useParams();
const url = post.picture ? post.picture:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'


useEffect(() =>{
    const fetchData = async () => {
        let response = await API.getPostById(id);
        if (response.isSuccess) {
            setPost(response.data);
        }
    }
    fetchData();
}, [])


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
const UpdateBlogPost = async () =>{ 
   let response = await API.UpdateBlogPost(post)
   if (response.isSuccess) {
      navigate(`/details/${id}`);
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
           
                <InputTextField placeholder='Title' value={post.title} onChange={(e) => handleChange(e)} name="title"/>
                <Button variant='contained' onClick={() => UpdateBlogPost()}>Update</Button>
            </StyledFormControl>
           
            <Textarea
            minRows={5}
            placeholder='Tell your story....'
            onChange={(e) => handleChange(e)}
            name='description'
            value={post.description}
         />
        </Container>
    )
}

export default Update;