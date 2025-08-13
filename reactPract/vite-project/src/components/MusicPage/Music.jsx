import { useEffect, useState } from "react";
import axios from 'axios'
import '../../App.css'

function Music(props) {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(data => setJsonData(data.data.users))
    }, [])
    
    const arrElements = jsonData.map(e => (
        <div key={e.id}>{e.fullName}</div>
    ))

    return (
        <div>
            {arrElements}
        </div>
    )
}

export default Music