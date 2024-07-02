import {
    createContext,
    useState
} from 'react'

export const ChatRoomContext = createContext();

export function ThemeProvider( { children } ) {
    const [theme, setTheme] = useState({ hello: 'hello world'})

    return(
        <ChatRoomContext.Provider value={{ theme , setTheme}}>
            {children}
        </ChatRoomContext.Provider>
    )
}