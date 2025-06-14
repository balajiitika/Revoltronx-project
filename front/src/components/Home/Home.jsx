
// components
import { Grid } from "@mui/material";
import Banner from "../Banner/banner";
import Categories from "./categories";
import Posts from "./post/Posts";
const Home = () =>{
    return (
        <>   
        <Banner/>
        <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
        <Categories/>
         </Grid>
            <Grid container item xs={2} sm={10} lg={10}>
            <Posts/>
            </Grid>
        </Grid>
        </>
    )
}

 export default Home;