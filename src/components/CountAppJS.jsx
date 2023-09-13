import React from "react";

function CountAppJS(){
    var count = 0;
    const handleIncreamentCount = () => {
        count = count + 1;
        document.getElementById('h_1').innerText = `Count: ${count}`
    }
    return (
        <div style={{padding:"20px"}}>
            <h1 id="h_1">Count: 0</h1>
            <button onClick={handleIncreamentCount}>Increament Count</button>
        </div>
    )
}

export default CountAppJS;
