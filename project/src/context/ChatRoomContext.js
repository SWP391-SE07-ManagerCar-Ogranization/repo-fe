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
    const [theme, setTheme] = useState({ hello: 'hello world', userDataFull: null })
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