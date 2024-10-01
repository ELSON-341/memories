import axios from "axios"

import { useState } from "react"

import "./AddMemory.css"

const AddMemory = () => {
  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(inputs, image)
  }

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setImage(event.target.files[0])

    } else {
      setInputs({ ...inputs, [event.target.name]: event.target.value })
    }
  }


  return (
    <div className="add-memory-page">
      <h2>Crie uma memória</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Título: </p>
          <input type="text" placeholder="Defina um título" name="title" onChange={handleChange} />
        </label>
        <label>
          <p>Descrição: </p>
          <textarea type="text" placeholder="Explique o que aconteceu..." name="description" onChange={handleChange}></textarea>
        </label>
        <label>
          <p>Foto: </p>
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <input type="submit" value="Enviar" className="btn" />
      </form>
    </div>
  )
}

export default AddMemory