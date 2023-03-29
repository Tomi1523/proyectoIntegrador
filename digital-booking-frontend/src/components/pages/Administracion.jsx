import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Administracion = ({dir}) => {

    // Llamada API: Obtener categorías
    const [Categorias,setCategorias] = useState([])
    const [LoadingCategorias, setLoadingCategorias] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://${dir}:8080/categoria/listar`)
            .then(res => res.json())
            .then(data => {
                setCategorias(data)
                setLoadingCategorias(false)
            })
        }
        fetchData()
    },[LoadingCategorias])
    // Llamada API: Obtener ciudades
    const [Ciudades, setCiudades] = useState([])
    const [LoadingCiudades, setLoadingCiudades] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://${dir}:8080/ciudad/listar`)
            .then(res => res.json())
            .then(data => {
                setCiudades(data)
                setLoadingCiudades(false)
            })
        }
        fetchData()
    }, [LoadingCiudades])
    // Llamada API: Obtener caracterìsticas
    const [Caract, setCaract] = useState([])
    const [LoadingCaract, setLoadingCaract] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://${dir}:8080/caracteristicas/listar`)
            .then(res => res.json())
            .then(data => {
                setCaract(data)
                setLoadingCaract(false)
            })
        }
        fetchData()
    }, [LoadingCaract])
    // Creación de array de características para submit
    const [CaractSelect, setCaractSelect] = useState([])
    const handleCheckbox = (e) => {
        const value = parseInt(e.target.value)
        setCaractSelect((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            } else {
                return [...prev, value];
            }
        })
    }
    // Manejo de array de imágenes para submit
    const [Imagenes, setImagenes] = useState([])
    const handleAddImg = () => {
        const titulo = document.querySelector('#titleImg').value
        const url = document.querySelector('#urlImg').value
        if (titulo && url) {
            const newImg = {
                titulo: titulo,
                url: url
            }
            setImagenes((prev) => [...prev,newImg])
            document.querySelector('#titleImg').value = ''
            document.querySelector('#urlImg').value = ''
        }
    }
    const handleRemoveImg = (url) => {
        const indexUrl = Imagenes.findIndex(e => e.url === url)
        if (indexUrl !== -1) {
            const newArrayImg = [...Imagenes]
            newArrayImg.splice(indexUrl,1)
            setImagenes(newArrayImg)
        }
    }
    // Manejo de arrays de distintas políticas
    const [NormasCasa, setNormasCasa] = useState([])
    const [SaludSeg, setSaludSeg] = useState([])
    const [PolitCanc, setPolitCanc] = useState([])
    const handleAgregarPoliticas = (idInput) => {
        const value = document.querySelector(`#${idInput}`).value
        if (value) {
            switch (idInput) {
                case "normasCasa":
                    setNormasCasa((prev) => [...prev,value])
                break;
                case "saludSeguridad":
                    setSaludSeg((prev) => [...prev,value])
                break;            
                case "politCancelacion":
                    setPolitCanc((prev) => [...prev,value])
                break;
            }
            document.querySelector(`#${idInput}`).value = ''
        }
    }
    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='Administracion'>
            <section className="adminHeader">
                <h2>Aministración</h2>
                <Link to={"/"}><i className="fa-solid fa-angle-left"></i></Link>
            </section>
            <h1>Crear Propiedad</h1>
            <form onSubmit={handleSubmit}>
                <div className="basicData">
                    <section>
                        <label htmlFor="nombre">Nombre de la propiedad</label>
                        <input type="text" id='nombre' name='nombre'/>
                    </section>
                    <section>
                        <label htmlFor="categoria">Categoría</label>
                        <select name="categoria" id="categoria" defaultValue="">
                            <option value="" disabled>Seleccionar categoría</option>
                            {
                                Categorias.map((e,index) => {
                                    return <option key={index} value={e.titulo}>{e.titulo}</option>
                                })
                            }
                        </select>
                    </section>
                    <section>
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text" id='direccion' name='direccion'/>
                    </section>
                    <section>
                        <label htmlFor="ciudad">Ciudad</label>
                        <select name="ciudad" id="ciudad" defaultValue="">
                            <option value="" disabled>Seleccionar ciudad</option>
                            {
                                Ciudades.map((e,index) => {
                                    return <option key={index} value={e.nombre}>{e.nombre}</option>
                                })
                            }
                        </select>
                    </section>
                    <section className='descripcion'>
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea name="descripcion" id="descripcion" cols="30" rows="8"></textarea>
                    </section>
                </div>
                <div className="atributos">
                    <h2>Agregar Atributos</h2>
                    <section className="atributosCheck">
                        {
                            Caract.map((e) => {
                                return <div key={e.id}>
                                    <input type="checkbox" name={e.nombre} value={e.id} onChange={handleCheckbox} />
                                    <i className={e.icono}></i>
                                    <label htmlFor={e.nombre}> {e.nombre}</label>
                                </div>
                            })
                        }
                    </section>
                </div>
                <div className="politicas">
                    <h2>Políticas del producto</h2>
                    <section className="containerPolit">
                        <article>
                            <h3>Normas de la casa</h3>
                            <div>
                                <input type="text" id='normasCasa' />
                                <button onClick={() => handleAgregarPoliticas("normasCasa")}><i className="fa-solid fa-plus"></i></button>
                            </div>
                            <ul>
                                {
                                    NormasCasa.map((e,index) => {
                                        return <li key={index}>{e}</li>
                                    })
                                }
                            </ul>
                        </article>
                        <article>
                            <h3>Salud y seguridad</h3>
                            <div>
                                <input type="text" id='saludSeguridad' />
                                <button onClick={() => handleAgregarPoliticas("saludSeguridad")}><i className="fa-solid fa-plus"></i></button>
                            </div>
                            <ul>
                                {
                                    SaludSeg.map((e,index) => {
                                        return <li key={index}>{e}</li>
                                    })
                                }
                            </ul>
                        </article>
                        <article>
                            <h3>Política de cancelación</h3>
                            <div>
                                <input type="text" id='politCancelacion' />
                                <button onClick={() => handleAgregarPoliticas("politCancelacion")}><i className="fa-solid fa-plus"></i></button>
                            </div>
                            <ul>
                                {
                                    PolitCanc.map((e,index) => {
                                        return <li key={index}>{e}</li>
                                    })
                                }
                            </ul>
                        </article>
                    </section>
                </div>
                <div className="imagenes">
                    <h2>Cargar Imágenes</h2>
                    <section className="addImagenesInput">
                        <div>
                            <label htmlFor="titulo">Título de la imagen</label>
                            <input type="text" name='titulo' id='titleImg' />
                        </div>
                        <div>
                            <label htmlFor="url">Url</label>
                            <input type="text" name='url' id='urlImg' />
                        </div>
                        <button><i className="fa-solid fa-plus" onClick={handleAddImg}></i></button>
                    </section>
                    <section className="addedImgs">
                        {
                            Imagenes?.map((e,index) => {
                                return <article key={index}>
                                    <img src={e.url} alt={e.titulo} />
                                    <div>
                                        <h4>{e.titulo}</h4>
                                        <i className="fa-solid fa-x" onClick={() => handleRemoveImg(e.url)}></i>
                                    </div>
                                </article>
                            })
                        }
                    </section>
                </div>
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default Administracion