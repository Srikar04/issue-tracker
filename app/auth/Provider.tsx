'use client';

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'


/*
Note : React renders all server components before sending the result to the client, 
including server components nested inside client components. 
If you only set use client on your providers file, 
but you import it in a server side layout, 
only the providers will be client side and the rest (the children) will be server side.
*/

const AuthProvider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider
