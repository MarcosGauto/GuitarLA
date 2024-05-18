import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";

function App() {
  const [data, setData] =useState (db)
  const [cart, setCart] =useState([])

  const MAXITEMS = 5
  const MINITEMS = 1

  useEffect(() =>{
    localStorage.setItem(`cart`, JSON.stringify(cart))
  },[cart]) //cada vez que cart cambie y quiera ejecutar lo sigueinte ,y lo haga sincrono ..tampoco hay que mandarlo a llamar..se va a estar ejecutando siempre dentro de este callback


  function addToCart (item) {   // inmutable: signifa que nos va a modificar el arreglo, es decir con el setcard esta tomando una copia del state y agregando al carrito
                                // si lo hiciera con el .push estaria modificando el arreglo, siempre tiene que ser inmutable
    const itemExists = cart.findIndex(guitar => guitar.id === item.id) // esto va a iterar sobre nuestro carrito de compras y va a crear un bojeto temporal llamado guitar
        if(itemExists >= 0){ // aca dice que si es menor o igual a cero ya existe
        const updateCart = [...cart] // tomamos una copia de cart para no modificar el state
        updateCart[itemExists].quantity++
        setCart(updateCart)
    }  else{
      item.quantity = 1
      setCart(prevCart => [...prevCart, item]); //va a tomar el carrito previo a cambiar y sumarle
    }

  }
function removeFromCart(id){
  setCart(prevCart => prevCart.filter(guitar => guitar.id !== id) );
}

function increaseQuantity(id) {
  const updateCart = cart.map ( item =>{  //.map nos retoma un arreglo nuevo que va a estar en el updateCart
    if(item.id === id && item.quantity < MAXITEMS){
      return{
        ...item,
        quantity: item.quantity + 1
      }
    }
    return item
  })
  setCart(updateCart)
}
function decreaseQuantity(id) {
  const updateCart = cart.map ( item =>{  //.map nos retoma un arreglo nuevo que va a estar en el updateCart
    if(item.id === id && item.quantity > MINITEMS){
      return{
        ...item,
        quantity: item.quantity - 1
      }
    }
    return item
  })
  setCart(updateCart)
}

function clearCart() {
  setCart([])
}
 


  return (
    <>

    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
    />

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
