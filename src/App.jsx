
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import useCart from "./hooks/useCart";


function App() {

  const{ data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmty, cartTotal } = useCart() // se coloca lo que esta en el return de useCart.js

  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      isEmty={isEmty}
      cartTotal={cartTotal}

    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (  //siempre que iteres con un .map siempre hay que pasarle un identificador unico siempre va a tener el nombre de key
            <Guitar
              key={guitar.id}
              guitar={guitar}            //parte de la izq es el nombre del prop, es decir forma por la que vamos acceder y derecha es el valor que le vamos a pasar
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
