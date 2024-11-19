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
                <li class="nav-item" @click="navigate('login')">
                <a class="nav-link" href="login.html">Iniciar Sesión</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="register.html">Registrarse</a>
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

new Vue({
    el: "#app",
    data:{
        email:"",
        password:"",
        errorMessage:"",
        apiUrl:"http://127.0.0.1:5000/login"
    },
    methods:{
        async handleLogin(){
            if(this.email.trim() === "" || this.password.trim() === ""){
                this.errorMessage = "No se ha podido iniciar Sesion, faltan datos";
                return;
            }
            else{
                try{
                    const response = await axios.post(this.apiUrl,{
                        email: this.email,
                        password: this.password
                    });

                    if(response.data.message = "Login exitoso"){
                        localStorage.setItem('user',this.email)
                        window.location.href = "./index.html"
                    }else{
                        this.errorMessage = "No se ha podido Iniciar Sesión. Verifique sus credenciales";
                    }

                }catch(error){
                    this.errorMessage = "Usuario o contraseña incorrectos"
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Credenciales Incorrectas',
                        text: 'Verifica que tu email y contraseña esten correctos.',
                    });
                }
            }
        }
    }
});