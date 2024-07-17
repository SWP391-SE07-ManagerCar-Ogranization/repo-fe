import {
    createContext,
    useState,
    useEffect
} from 'react'

import {
    getAccountById
} from '../service/AccountService'

export const ChatRoomContext = createContext();

export function ThemeChatRoomProvider( { children } ) {
        
  const dataInvoiceFake = [
    {
      invoiceId : 2,
      driverDetailId: 3,
      customerId: 7,
      bookingData: "bookingDate",
      startPoint: "City Center",
      endPoint: "Airport",
      timeStart: "Time Start",
      finish : false
    },
    {
      invoiceId : 3,
      driverDetailId: 3,
      customerId: 7,
      bookingData: "bookingDate",
      startPoint: "City Center",
      endPoint: "Airport",
      timeStart: "Time Start",
      finish : false
    }
  ]


    const [privateChats, setPrivateChats] = useState(dataInvoiceFake)
    const [roleCheck, setRoleCheck] = useState()
    const [theme, setTheme] = useState({ hello: 'hello world', userDataFull: null , privateChats, setPrivateChats, roleCheck, setRoleCheck})
    const {userData} = theme

    const getAccountById_ = async () => {
        try {
            
            const data = await getAccountById(userData.userId)
            console.log("DATAAA",data);
            setTheme((prev)=> (
                {
                    ...prev,
                    userDataFull: data
                }
            ))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {

        getAccountById_()
    }, [userData])


  


    return(
        <ChatRoomContext.Provider value={{ theme , setTheme}}>
            {children}
        </ChatRoomContext.Provider>
    )
}