import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
import {Link,useSearchParams} from 'react-router-dom';
import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1); 

` 
   const StyledButton = styled(Button)`
   margin:20px;
   width:855%;
   background: #6495ED;
   color:#fff;
   ` 

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`
const Categories = () =>{
    const [SearchParams] =useSearchParams();
    const category = SearchParams.get('category ')
    return(
<>
        <StyledLink to={`/create?category=${category || ''}`}>
    <StyledButton variant="contained">crete Blog</StyledButton>
</StyledLink>

<StyledTable>
    <TableHead>
        <TableRow>
            <TableCell>
                <StyledLink to='/'>
                All Categories
                </StyledLink>
            </TableCell>
        </TableRow>
    </TableHead>
    <TableHead>
        <TableBody>
            {
                categories.map(categories =>(
                    <TableRow key={category.id}>
                        <TableCell>
                            <StyledLink to={`/category=${category.type}` }>
                           {category.type}
                           </StyledLink>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </TableHead>
</StyledTable>
</>
    )
}

export default Categories;