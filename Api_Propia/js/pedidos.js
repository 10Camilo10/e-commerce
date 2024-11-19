Vue.component('nav-bar',{
    props:['title'],
    template:`
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{title}}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
           <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item" @click="navigate('login')">
                    <a class="nav-link" href="login.html">Iniciar Sesión</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="register.html">Registrarse</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="comments.html">Comentarios</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="Pedidos.html">Pedidos</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `
});

Vue.component('foot',{
    props:['description', 'title'],
    template:`
    <footer class="text-center text-lg-start bg-dark text-muted">
        <br>
        <!-- Section: Links  -->
        <section class="">
            <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                    <i class="fas fa-gem me-3"></i>{{title}}
                </h6>
                <p class="description">
                    {{description}}
                </p>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <!-- Links -->
                <h6 class="text-uppercase fw-bold mb-4">
                    Productos
                </h6>
                <p>
                    <a href="#!" class="text-reset">Angular</a>
                </p>
                <p>
                    <a href="#!" class="text-reset">React</a>
                </p>
                <p>
                    <a href="#!" class="text-reset">Vue</a>
                </p>
                <p>
                    <a href="#!" class="text-reset">Laravel</a>
                </p>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <!-- Links -->
                <h6 class="text-uppercase fw-bold mb-4">
                    Algunos Links
                </h6>
                <p>
                    <a href="#!" class="text-reset">Precios</a>
                </p>
                <p>
                    <a href="#!" class="text-reset">Configuracion</a>
                </p>
                <p>
                    <a href="#!" class="text-reset">Pedidos</a>
                </p>
                <p>
                    <a href="#!" class="text-reset">Ayuda</a>
                </p>
                </div>
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <!-- Links -->
                <h6 class="text-uppercase fw-bold mb-4">Contacto</h6>
                <p><i class="fas fa-home me-3"></i> Bgotá, BG Ucompensar, CO</p>
                <p>
                    <i class="fas fa-envelope me-3"></i>
                    camilomoravilla@com
                </p>
                <p><i class="fas fa-phone me-3"></i> + 57 302 522 5399</p>
                <p><i class="fas fa-print me-3"></i> + 57 302 522 5399</p>
                </div>
            </div>
            </div>
        </section>
    </footer>
    `
});

Vue.component('main-section',{
    props:['title','description'],
    template:`
        <section class="main">
            <div class="jumbotron container col-sm-8 offset-sm-5">
                <h1 class="display-4 title">{{title}}</h1>
                <p class="lead">Los mejores dispositivos de tecnologia, para una vida con enfoques</p>
                <hr class="my-4">
                <p>{{description}}</p>
                <br>
                <a class="btn btn-outline-light" href="#products" role="button">Nuestros Productos</a>
            </div>
        </section>
    `
});

new Vue({
    el: '#app',
    data(){
        return{
            pedidos: [],
            user: localStorage.getItem('user') || "prueba",
            errorMessage:"",
            url_pedidos:'http://127.0.0.1:5000/pedidos',
        }  
    },
    methods:{
        async cargarPedidos() {
            try {
                const response = await axios.get(`${this.url_pedidos}/${this.user}`);
                this.pedidos = response.data; // Asignar los datos obtenidos
                this.errorMessage = ""; // Limpiar cualquier mensaje de error
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.errorMessage = "No se encontraron pedidos para este usuario.";
                } else {
                    this.errorMessage = "Error al obtener los pedidos.";
                }
                this.pedidos = []; // Limpiar los pedidos en caso de error
            }
        }
    },
    created(){
        this.cargarPedidos();
    }
});