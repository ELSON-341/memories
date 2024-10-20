import axios from "../axios/axios-config"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "./Home.css"

const Home = () => {
  const [memories, setMemories] = useState([])


  useEffect(() => {
    const getMemories = async () => {
      try {
        const res = await axios.get("/memories")

        setMemories(res.data)
      } catch (error) {
        console.log(`Um ${error}`);
        
      }

    }
    getMemories()
  }, [])

  if(!memories) return <p>Carregando...</p>
  return (
    <div className="home">
      <h2>Confira as últimas memórias</h2>
      <div className="memories-container">
        {memories.length > 0 && memories.map((memory) => (
          <div className="memory" key={memory._id}>
            <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
            <p>{memory.title}</p>
            <Link className="btn" to={`/memories/${memory._id}`}>Conmentar</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home