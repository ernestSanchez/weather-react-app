import React, {Fragment, useState, useEffect} from 'react';
import Header from './componets/Header';
import Formulario from './componets/Formulario';
import Clima from './componets/Clima';
import Error from './componets/Error';

function App() {
 
    // state de Formulario
    const [busqueda, guardarBusqueda] = useState({
      ciudad: '',
      pais: ''
  });

const [consultar, guardarConsultar ] = useState(false);
const  [resultado,guardarResultado ] = useState({});
const [error, guardarError] = useState(false);


const {ciudad, pais } = busqueda;

useEffect(() => {
  const consultarApi = async ()=>{

    if(consultar){
      const appId = '0962ec0008061ab084bafe70e7bb7441';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;


    
    
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarResultado(resultado);
    guardarConsultar(false);
   
    
      if(resultado.cod === "404"){
        guardarError(true);
      }else{
        guardarError(false);
      }
    }
  }
  consultarApi()
 },[consultar]);

let componente;

if(error) {
  componente = <Error mensaje="No hay resultados"/>
}else{
  componente =  <Clima 
                resultado={resultado}
                />
        }

  return (
    <Fragment>
      <Header 
       titulo='Clima React App'
      />

      <div className="contenedor-form">
            <div className="container">
              <div className="row">
                  <div className="col m6 s12">
                    <Formulario 
                    busqueda={busqueda}
                    guardarBusqueda={guardarBusqueda}
                    guardarConsultar={guardarConsultar}
                    />
                  </div>
                  <div className="col m6 s12">
                   {componente}
                  </div>
              </div>

            </div>
      </div>
    </Fragment>
  
  );
}

export default App;
