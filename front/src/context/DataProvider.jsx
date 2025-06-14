 import { createContext } from "react"

export const DataContext = createContext(null);
 const [account, setAccount] = useState({username: '', name: ''})

const DataProvider = ({children}) =>{
        <DataContext.Provider value={(
            
        )}>
            {children}
        </DataContext.Provider>
 }

 export default DataProvider; 