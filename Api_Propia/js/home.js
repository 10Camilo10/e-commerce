function generateCartId(){
    return '_'+Math.random().toString(36).substring(2,9);
}

const store = new Vuex.Store({
    state:{
        count: 0,
        cart: JSON.parse(localStorage.getItem("list")) || [] // Usa un arreglo vacío si no hay datos en localStorage
    },
    mutations:{
        ADD_TO_CART(state,product){
            const cartItem = { ...product,cartId: generateCartId()}
            state.cart.push(cartItem);
            localStorage.setItem("list",JSON.stringify(state.cart));
        },
        REMOVE_FROM_CART(state,product){
            state.cart = state.cart.filter(item => item.cartId !== product.cartId);
            localStorage.setItem("list",JSON.stringify(state.cart));
        }
    },
    getters:{
        cart: state => state.cart,
        cartTotal: state => state.cart.reduce((total, product) => total + product.price, 0)
    }
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
    store,
    data(){
        return{
            productos: [],
            productosRecientes: [],
            loginText: 'Iniciar Sesion',
            searchQuery:'',
            user: localStorage.getItem('user') || "prueba",
            url_products:'http://127.0.0.1:5000/products',
            apiUrl:"http://127.0.0.1:5000/pedidos",
            selectedCategory: 'all'
        }  
    },
    computed:{
        cart(){
            return this.$store.getters.cart;
        },
        cartTotal(){
            return this.$store.getters.cartTotal;
        },
        filteredProducts(){
            if(this.searchQuery.trim() === ''){
                return [];
            }
            const query = this.searchQuery.toLowerCase();
            return this.productos.filter(product => product.name.toLowerCase().includes(query) ||
                                                    product.category.toLowerCase().includes(query) ||
                                                    product.price.toString().includes(query));
        }
    },
    methods:{
        async cargarProductos(){
            console.log(this.user)
            try{
                const respuesta = await fetch(this.url_products);
                if(respuesta.ok){
                    const productos = await respuesta.json();
                    this.productos = productos;
                }
            }catch(error){
                console.error('Error al cargar productos: ',error);
            }
        },
        async cargarProductosRecientes(){
            try{
                const respuesta = await fetch(this.url_products);
                if(respuesta.ok){
                    const productos = await respuesta.json();
                    this.productosRecientes = productos.slice(-3).reverse();
                }
            }catch(error){
                console.error('Error al cargar productos: ',error);
            }
        },
        toggleLogin(){
            if(this.loginText === 'Cerrar Sesion'){
                localStorage.removeItem('isLoggedIn');
                this.loginText = 'Iniciar Sesion';
            }else{
                window.location.href = 'login.html';
            }
        },
        addToCart(product){
            this.$store.commit('ADD_TO_CART',product);
            Swal.fire({
                icon: 'success',
                title: 'Completado',
                text: 'Producto Agregado Exitosamente.',
            });
        },
        removeFromCart(product){
            this.$store.commit('REMOVE_FROM_CART', product);
            Swal.fire({
                icon: 'error',
                title: 'Eliminado',
                text: 'Producto Eliminado Exitosamente.',
            });
        },
        async redirectToPayPal() {
            const { value: userEmail } = await Swal.fire({
                title: 'Proceso de Pago con PayPal',
                input: 'email', // Tipo de entrada
                inputLabel: 'El correo electronico de tu cuenta de paypal',
                inputPlaceholder: 'Escribe tu correo',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                  // Validación básica de correo
                  if (!value) {
                    return 'Por favor ingresa un correo electrónico';
                  }
                },
              });

            if (userEmail) {
                let businessEmail = userEmail;
                const baseURL = "https://www.paypal.com/cgi-bin/webscr";
                let paypalUrl = `${baseURL}?cmd=_cart&upload=1&business=${businessEmail}`;
        
                this.cart.forEach((item, index) => {
                const itemNumber = index + 1;
                paypalUrl += `&item_name_${itemNumber}=${encodeURIComponent(
                    item.name
                )}`;
                paypalUrl += `&amount_${itemNumber}=${item.price}`;
                paypalUrl += `&quantity_${itemNumber}=1`;
                });
        
                paypalUrl += `&currency_code=COP&invoice=${Date.now()}`;
                
                try{
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];

                    const response = await axios.post(this.apiUrl,{
                        valor: this.cartTotal,
                        fecha: formattedDate,
                        usuario: this.user
                    });
    
                    if(response.data.message = "Pedido creado exitosamente"){
                        window.location.href = "./index.html"
                    }else{
                        this.errorMessage = "No se ha podido registrar el pedido";
                    }
    
                }catch(error){
                    console.error(error);
                }
                // Redirigir al usuario a PayPal
                window.location.href = paypalUrl;

            } else {
                Swal.fire('No se ingresó ningún correo');
            }
            
        }
    },
    created(){
        this.cargarProductosRecientes();
        this.cargarProductos();
        this.loginText = localStorage.getItem('isLoggedIn') === 'true' ? 'Cerrar Sesion' : 'Iniciar Sesion';
    }
});