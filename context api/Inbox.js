import React, { createContext, useState } from 'react'

export const InboxContext = createContext();

export const InboxProvider = (props) =>{
    const [inbox, setInbox] = useState()
    return(
        <InboxContext.Provider value={[inbox , setInbox]}>
            {props.children}
        </InboxContext.Provider>
    )
}