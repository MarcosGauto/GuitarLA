import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

const useCart = () =>{
    
    const initialCart = () => { //se genera para saber el valor inicial y sino ponerlo en el arreglo vacio
        const localStorageCart = localStorage.getItem(`cart`) // recupera del localsotrage y con getitem para obtener el carrito
        return localStorageCart ? JSON.parse(localStorageCart) : [] //ponemos el return para saber si el carrito tiene algo entonces convertilo en un string y devuelta en un arreglo, y en caso que no haya nada en arreglo vacio
        }
    
      const [data, setData] =useState (db)
      const [cart, setCart] =useState(initialCart)
    
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
     
        // state derivado
        const isEmty = useMemo (() => cart.length === 0, [cart]) //toma dos parametros,le esta diciendo que el codigo no se ejecuta hasta que no cambie, y  solamente hagas render cuando el carrito cambie(es decir cuando agregues o elimines guitarras)
        const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0),[cart] )// reduce te toma dos parametros, es decir total el total y lo multiplica por el item y como segunda funcion es recordar lo realizo anteriormente y sumarlo al otro item que se agrego en el carrito
        //cero es el valor inicial


    return{  //aca retornamos todo lo que pusimos en el header
        data, //retornamos las guitarras
        cart, //retornamos el carrito
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmty,
        cartTotal,
    }

}

export default useCart;