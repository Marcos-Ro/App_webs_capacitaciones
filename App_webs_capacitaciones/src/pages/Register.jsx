import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {

    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    const [errorCorreo, setErrorCorreo] = useState("");
    const [errorNombre, setErrorNombre] = useState("");
    const [errorTelefono, setErrorTelefono] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmar, setErrorConfirmar] = useState("");

    function registrar(e){

        e.preventDefault();

        setErrorCorreo("");
        setErrorNombre("");
        setErrorTelefono("");
        setErrorPassword("");
        setErrorConfirmar("");

        let valido = true;

        let expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(correo.trim() === ""){

            setErrorCorreo("Ingrese un correo");

            valido = false;

        }
        else if(!expresionCorreo.test(correo)){

            setErrorCorreo("Correo inválido");

            valido = false;

        }

        if(nombreUsuario.trim() === ""){

            setErrorNombre("Ingrese un nombre de usuario");

            valido = false;

        }

        if(telefono.trim() === ""){

            setErrorTelefono("Ingrese un teléfono");

            valido = false;

        }
        else if(!/^\d{10}$/.test(telefono)){

            setErrorTelefono("Debe tener 10 dígitos");

            valido = false;

        }

        if(password.length < 8){

            setErrorPassword("Mínimo 8 caracteres");

            valido = false;

        }

        if(password !== confirmarPassword){

            setErrorConfirmar("Las contraseñas no coinciden");

            valido = false;

        }

        if(!valido){
            return;
        }

        let usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        let existe = usuarios.some(usuario =>

            usuario.correo === correo ||

            usuario.nombreUsuario === nombreUsuario

        );

        if(existe){

            alert("El usuario ya está registrado.");

            return;

        }

        let nuevoUsuario = {

            correo,
            nombreUsuario,
            telefono,
            password

        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem(

            "usuarios",

            JSON.stringify(usuarios)

        );

        alert("Usuario registrado correctamente.");

        navigate("/");

    }

    return(

        <div className="contenedor-login">

            <div className="tarjeta">

                <h1>Registro de Usuario</h1>

                <p className="subtitulo">

                    Crea una nueva cuenta

                </p>

                <form onSubmit={registrar}>

                    <label>Correo Electrónico</label>

                    <input
                        type="email"
                        value={correo}
                        onChange={(e)=>setCorreo(e.target.value)}
                        placeholder="correo@ejemplo.com"
                    />

                    <small className="error">{errorCorreo}</small>

                    <label>Nombre de Usuario</label>

                    <input
                        type="text"
                        value={nombreUsuario}
                        onChange={(e)=>setNombreUsuario(e.target.value)}
                        placeholder="Nombre de usuario"
                    />

                    <small className="error">{errorNombre}</small>

                    <label>Número Telefónico</label>

                    <input
                        type="text"
                        value={telefono}
                        onChange={(e)=>setTelefono(e.target.value)}
                        placeholder="0999999999"
                    />

                    <small className="error">{errorTelefono}</small>

                    <label>Contraseña</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <small className="error">{errorPassword}</small>

                    <label>Confirmar Contraseña</label>

                    <input
                        type="password"
                        value={confirmarPassword}
                        onChange={(e)=>setConfirmarPassword(e.target.value)}
                    />

                    <small className="error">{errorConfirmar}</small>

                    <button type="submit">

                        Registrarse

                    </button>

                </form>

                <p className="enlace">

                    Ya tienes una cuenta?{" "}

                    <Link to="/">

                        Iniciar Sesión

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;