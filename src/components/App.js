
import React, {useEffect, useState } from 'react';
import Fiscalias from './Fiscalias'
import Header from './Header'
import fetch from 'node-fetch'

//componente para login y listado de fiscalias
const App = () => {
  
    const [auth, setAuth] = useState(false) //estados para poder almacenar el estado de autenticacion, token, usuaio y errorres
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
  
    useEffect(() => { //funciona como un ComponentDidMount, el cual realiza la busqueda del token
      if(localStorage.getItem("tk") !== null){
        const tk = localStorage.getItem("tk")
        if(tk.length > 90){
          setToken(tk)
          setAuth(true)
        }
      }
      
    }, [])
  
    const logout = () => { //logout elimina el token, y "cierra" la sesion
      localStorage.removeItem("tk")
      setToken('')
      setAuth(false)
    }
  
  
    const login = (e) => { //login es disparado por el formulario de inicio de sesion.
      e.preventDefault() //evitamos que la pagina se refresque
      
      const params = new URLSearchParams();
      params.append('email', user);
      params.append('pass', pass);
      fetch('http://localhost:8080/Fiscalias/users', { method: 'POST', body: params }) //envio de parametros a la REST API
      .then(res => res.json()) 
      .then(json => {
        if(json){ //verificar si recibimos respuesta
          setToken(json)
          setAuth(true)
          localStorage.setItem("tk", json);
        }
      }) //si se recibe un codigo 401 Forbidden, (autenticacion fallida)
      .catch(err => {
        console.log(err)
        setError('Error de Autenticacion') //indicamos el error a mostrar
      })
    }
  
    return auth ? ( //si esta autenticado muestra la pagina principal de fiscalias
      <div> 
        <Header logout={logout}/>
        <Fiscalias token={token}/>
        
      </div> //logeado
    ) : (
      <div className="box-layout"> 
        <div className="box-layout__box">
          <form onSubmit={login}>
            E-mail: <input value={user} onChange={(e) => setUser(e.target.value)} />
            <br/> 
            Password: <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <br/>
            <button>Login</button>
            <p className="errorMsj">{error}</p>
          </form>
        </div>
      </div>
      ) //de lo contrario muestra la pagina para inicio de sesion
    
  }

  export {App as default}