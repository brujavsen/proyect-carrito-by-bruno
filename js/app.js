//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrarEventListeners();
function registrarEventListeners() {
    //Se agrega un curso al presionar "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=> {
        articulosCarrito = []; //resetear array
        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del array articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
    }

}

//Lee el contenido del HTML al dar click y extra info del elemento
function leerDatosCursos(curso) {
    // console.log(curso)

    //Crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si el elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna objeto actualizado
            }else{
                return curso; //Retorna los objetos que nos son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //Agrega elementos al array de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, id, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //Agrega el HTML en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML() {

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}