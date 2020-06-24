import React, { useState, useEffect} from 'react'
import fetch from 'node-fetch'
import { Redirect } from 'react-router-dom';

const EditFiscalia = (props) => { //componente para edicion de fiscalias
  
    const idParam = props.match.params.id
    const [name, setName] = useState('')
    const [id, setId] = useState(0)
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [phone, setPhone] = useState('')
    const [dept, setDept] = useState('')
    
  
    useEffect(() => { //cuando el componente es cargado busca los datos de la fiscalia
      fetch('http://localhost:8080/Fiscalias/fiscalias?id='+idParam, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        const fiscalia = json
        if(fiscalia){
          setId(fiscalia.id)
          setName(fiscalia.name)
          setLat(fiscalia.lat)
          setLon(fiscalia.lon)
          setPhone(fiscalia.phone)
          setDept(fiscalia.dept)
        }
      });
    }, [])
  
    function checkStatus(res) { //verifica si se obtubo una respuesta OK
      if (res.ok) { // res.status >= 200 && res.status < 300 
          return (<Redirect to="/" />)
      } else {
          throw new Error('Something went worng')
      }
    }
  
  
    const modificar = (e) => { //este metodo es el encargado de enviar los datos a la REST API para actualizacion
      e.preventDefault()
      const params = new URLSearchParams();
      params.append('id', id);
      params.append('name', name);
      params.append('lat', lat);
      params.append('lon', lon);
      params.append('phone', phone);
      params.append('dept', dept);
      fetch('http://localhost:8080/Fiscalias/fiscalias', { method: 'PUT', body: params }) //metodo PUT y los paametros a modificar
      .then(checkStatus).catch(e => {
        console.log('something went wrong!')
      })
    }
  
    
  
    return ( //cuerpo del componente
    <div className='content-container'>
      <h1>Editar Fiscalia</h1>
      <form onSubmit={modificar}>
        Nombre: <input value={name} onChange={(e) => setName(e.target.value)} />
        <br/>
        Lat: <input value={lat} onChange={(e) => setLat(e.target.value)} />
        <br/>
        Lon: <input value={lon} onChange={(e) => setLon(e.target.value)} />
        <br/>
        Telefono: <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br/>
        Departamento: <input value={dept} onChange={(e) => setDept(e.target.value)} />
        <br/>
        <input type="hidden" value={id} />
        <button className="button-change">Enviar</button>
        <a className="button-cancel" href="/">Cancelar</a>
      </form>
    </div> 
    )
  }

  export {EditFiscalia as default}