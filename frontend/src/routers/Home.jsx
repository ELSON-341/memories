import axios from "../axios/axios-config"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [memories, setMemories] = useState([])


  useEffect(() => {
    const getMemories = async () => {
      const res = await axios.get("/memories")

      setMemories(res.data)
    }
    getMemories()
  }, [])

  return (
    <div className="home">
      <h2>Confira as últimas memórias</h2>
      <div className="memories-container">
        {memories.length === 0 && memories.map(memory => (
          <p>{memory.title}</p>
        ))}
      </div>
    </div>
  )
}

export default Home