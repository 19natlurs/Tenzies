import React from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.held ? "#59E391" : "white"
    }

    return (


        <div className="overall" onClick={props.hold} style={styles}>
            <div className="single">{props.value}</div>
        </div>



    )
}