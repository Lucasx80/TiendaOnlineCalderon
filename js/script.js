document.addEventListener("DOMContentLoaded", function() {
    const productos = [
        { categoria: "Remeras", nombre: "Remera Estampada", precio: 7500, imagen:"img/rem1.png"},
        { categoria: "Remeras", nombre: "Remera Lisa", precio: 6500,imagen: "img/rem2.png" },
        { categoria: "Remeras", nombre: "Remera Selección", precio: 9000,imagen: "img/rem3.png" },
        { categoria: "Pantalones", nombre: "Pantalón Negro", precio: 15000,imagen: "img/pant1.png" },
        { categoria: "Pantalones", nombre: "Pantalón Blanco", precio: 13500,imagen: "img/pant2.png" },
        { categoria: "Pantalones", nombre: "Pantalón Azul", precio: 12800,imagen: "img/pant3.png" },
        { categoria: "Zapatillas", nombre: "Zapatillas Urbanas", precio: 35000,imagen: "img/zap1.png" },
        { categoria: "Zapatillas", nombre: "Zapatillas Deportivas", precio: 45500,imagen: "img/zap2.png" },
        { categoria: "Zapatillas", nombre: "Zapatillas de Running", precio: 50000,imagen: "img/zap3.png" },
    ];

    const containerProductos = document.getElementById("lista-productos");
    const containerCarrito = document.getElementById("lista-carrito");
    const carrito = [];

    // Función para mostrar los productos en el HTML
    function mostrarProductos() {
        containerProductos.innerHTML = "";
        productos.forEach((producto, index) => {
            const col = document.createElement("div");
            col.classList.add("col-md-4");

            const card = document.createElement("div");
            card.classList.add("card", "mb-4", "shadow-sm");

            const img = document.createElement("img");
            img.src = producto.imagen;
            img.classList.add("card-img-top");
            img.alt = producto.nombre;

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const nombre = document.createElement("h5");
            nombre.textContent = producto.nombre;
            nombre.classList.add("card-title");

            const precio = document.createElement("p");
            precio.textContent = `$${producto.precio}`;
            precio.classList.add("card-text");

            const boton = document.createElement("button");
            boton.textContent = "Agregar al carrito";
            boton.classList.add("btn", "btn-primary");
            boton.onclick = () => agregarAlCarrito(index);

            cardBody.appendChild(nombre);
            cardBody.appendChild(precio);
            cardBody.appendChild(boton);

            card.appendChild(img);
            card.appendChild(cardBody);

            col.appendChild(card);

            containerProductos.appendChild(col);
        });
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(index) {
        const producto = productos[index];
        carrito.push(producto);
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }

    // Función para mostrar el carrito en el HTML
    function mostrarCarrito() {
        containerCarrito.innerHTML = "";
        let totalCompra = 0;
        carrito.forEach((producto, index) => {
            const li = document.createElement("li");
            li.textContent = `${producto.nombre} - $${producto.precio}`;
            li.classList.add("list-group-item");

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "float-right");
            botonEliminar.onclick = () => eliminarDelCarrito(index);

            li.appendChild(botonEliminar);
            containerCarrito.appendChild(li);

            totalCompra += producto.precio;
        });
        document.getElementById("carrito").style.display = "block";
        document.getElementById("total-compra").textContent = `Total: $${totalCompra}`;
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }

    // Función para guardar el carrito en el localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para obtener el carrito del localStorage al cargar la página
    function obtenerCarritoDelLocalStorage() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            mostrarCarrito();
        }
    }

    // Mostrar los productos al cargar la página
    mostrarProductos();

    // Obtener el carrito del localStorage al cargar la página
    obtenerCarritoDelLocalStorage();

    // Evento para vaciar el carrito
    document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);
});






