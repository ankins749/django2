document.addEventListener('DOMContentLoaded', function() {
    window.iniciarSesion = function() {
        console.log('pepe');
        var correo = document.getElementById("campo_mail").value;
        var contrasena = document.getElementById("campo_contraseña").value;

        // Cargar el archivo JSON de usuarios
        fetch('/static/core/data/cuentas.json')
        .then(response => response.json())
        .then(data => {
            // Buscar el usuario en el archivo JSON
            var usuarioEncontrado = data.find(function(cuentauser) {
                return (cuentauser.correo === correo || cuentauser.nombre === correo) && cuentauser.contrasena === contrasena;
            });

            if (usuarioEncontrado) {
                // alert("¡Inicio de sesión exitoso!");

                if (usuarioEncontrado.rol === 1) { // Administrador
                    window.location.href = adminURL;
                } else if (usuarioEncontrado.rol === 0) { // Usuario normal
                    window.location.href = indexURL;
                    window.location.reload();
                }
                
            } else {
                alert("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar los datos de usuario.');
        });
    };

    function validarformulario() {
        console.log("triple te");
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var contrasena = document.getElementById("contrasena").value;
        var comuna = document.getElementById("comuna").value;
        var calle = document.getElementById("calle").value;
        var numero = document.getElementById("numero").value;
        var rol = "0";

        if (!nombre || !correo || !contrasena || !comuna || !calle || !numero) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        console.log("triple ta");
        var nuevoUsuario = {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            comuna: comuna,
            calle: calle,
            numero: numero,
            rol: rol
        };

        var cuentas = localStorage.getItem("cuentas");
        cuentas = cuentas ? JSON.parse(cuentas) : [];

        cuentas.push(nuevoUsuario);

        localStorage.setItem("cuentas", JSON.stringify(cuentas));

        // alert("¡Registro exitoso!");

        window.location.href = "index.html";
    }

    function cerrarSesion() {
        localStorage.removeItem("token");
        window.location.href = "index.html";
        window.location.reload();
    }

    // sigo sin entender pior que me da error y funciona bien 
    document.getElementById('foto').addEventListener('change', function() {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('imagenSeleccionada').src = event.target.result;
                document.getElementById('imagenSeleccionada').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
});
function generarContrasena() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contraseña = '';
    for (let i = 0; i < 10; i++) {
        contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    document.getElementById('campo_contrasena').type = 'text'; 
    document.getElementById('campo_contrasena').value = contraseña;
    console.log(contraseña);

}

