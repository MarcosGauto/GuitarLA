import { useMemo } from "react";

useMemo

function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) {

    // state derivado
    const isEmty = useMemo (() => cart.length === 0, [cart]) //toma dos parametros,le esta diciendo que el codigo no se ejecuta hasta que no cambie, y  solamente hagas render cuando el carrito cambie(es decir cuando agregues o elimines guitarras)
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0),[cart] )// reduce te toma dos parametros, es decir total el total y lo multiplica por el item y como segunda funcion es recordar lo realizo anteriormente y sumarlo al otro item que se agrego en el carrito
    //cero es el valor inicial

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmty ? (   //antes tenia parentesis isEmty porque era una funcion pero ya no lo es
                                <p className="text-center">El carrito esta vacio</p>
                                ):(
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(guitar => (
                                                <tr key={guitar.id}>
                                                    <td>
                                                        <img className="img-fluid" src="./public/img/guitarra_02.jpg" alt="imagen guitarra" />
                                                    </td>
                                                    <td>{guitar.name}</td>
                                                    <td className="fw-bold">
                                                        ${guitar.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() =>decreaseQuantity(guitar.id)}
                                                        >
                                                            -
                                                        </button>
                                                        {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(guitar.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => removeFromCart(guitar.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal} </span></p>
                                </>
                                )}
                                <button 
                                    className="btn btn-dark w-100 mt-3 p-2" 
                                    onClick={clearCart}
                                    >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )

}

export default Header;