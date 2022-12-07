import React from 'react'
import { useState, useEffect } from "react"

function BubleChat({ mesList }) {
    // const [listMes, setListMes] = useState(['gggggggggggggggggggg gggggggg g g g g g g g g g g',2,3,4,5])
    const [listMes, setListMes] = useState([])

    // setListMes(listMes => ({ ...listMes, inputList }))
    useEffect(() => {
        // const list = inputList
        setListMes(mesList)
        console.log(mesList)
        // setListMes(prev => [...prev, 'check'])
        // console.log(inputList)
        // setListMes(listMes => ({ ...listMes, inputList }))
    }, [mesList])

    // const BubbleChat = (message) => {
    //     return (
    //         <div className="chat-bubble me">{message}</div>

    //     )
    // }

    return (
        <div>

            {listMes.map((m) => (
                <div className={`chat-bubble ${ m.from ===1 ? "you" : "me"}`}>{m.message}</div>
            )
            )}


            {/* <button onClick={()=>check()}> check</button> */}
            {/* <div className="chat-bubble me">check</div> */}
        </div>

    )
}

export default BubleChat