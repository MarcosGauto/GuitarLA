import { useState } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const [data, setData] =useState (db)
  const [cart, setCart] =useState([])

  function addToCart (item) {   // inmutable: signifa que nos va a modificar el arreglo, es decir con el setcard esta tomando una copia del state y agregando al carrito
                                // si lo hiciera con el .push estaria modificando el arreglo, siempre tiene que ser inmutable

    const itemExists =cart.findIndex(guitar => guitar.id === item.id) // esto va a iterar sobre nuestro carrito de compras y va a crear un bojeto temporal llamado guitar
    if(itemExists >= 0){ // aca dice que si es menor o igual a cero ya existe
    } else{
      item.quantity = 1
      setCart(prevCart => [...prevCart, item]); //va a tomar el carrito previo a cambiar y sumarle
    }
    
  }

 
  return (
    <>

    <Header />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (  //siempre que iteres con un .map siempre hay que pasarle un identificador unico siempre va a tener el nombre de key
            <Guitar
              key={guitar.id}
              guitar={guitar}            //parte de la izq es el nombre del prop, es decir forma por la que vamos acceder y derecha es el valor que le vamos a pasar
              setCart={setCart}
              addToCart={addToCart}
            />

          ))}
          
          

          



        </div>

    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
