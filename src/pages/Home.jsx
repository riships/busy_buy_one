import React, { useEffect } from 'react'
import { addDataToCollection } from '../utils/utils';


function Home() {
    useEffect(() => {
        addDataToCollection()
    }, [])
    return (
        <>

        </>
    )
}

export default Home;