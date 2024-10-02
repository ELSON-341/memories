import axios from "../axios/axios-config"

import { useState } from "react"

import {toast} from 'react-toastify'

import "./AddMemory.css"

const AddMemory = () => {
  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("image", image)
    formData.append("title", inputs.title)
    formData.append("description", inputs.description)

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      toast.success(response.data.msg)
    } catch (error) {
      console.log(`erro${error}`);
      toast.error(error.response.data.msg)
    }

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