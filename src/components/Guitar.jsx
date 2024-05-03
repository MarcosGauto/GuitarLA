
// en img src se pone llaves con un template para indicarle de donde viene la imagen
function Guitar({guitar}) {  

    const {id, name, image, description, price} = guitar // se hizo una destruction del props

    const handleClick = (id) => { //le avisa que va a tomar el id

    }

    return(
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
            <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />   
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description} </p>
            <p className="fw-black text-primary fs-3">{price} </p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={ ()=> handleClick(guitar)}  //nombre de la funcion cuando el usuario ejecute el boton, en este caso llama al id para identificar que guitarra va al carrito
                                            //si toma una funcion hay que colocar un callback para que no se llame en automatico sino que espere el evento es decir una funcion ()=>
            >Agregar al Carrito</button>
        </div>
    </div>
    )
}

export default Guitar