import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Index() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const [errorUsuario, setErrorUsuario] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    function iniciarSesion(e){

        e.preventDefault();

        setErrorUsuario("");
        setErrorPassword("");

        let usuarioIngresado = usuario.trim();

        let passwordIngresada = password;

        let valido = true;

        if(usuarioIngresado === ""){

            setErrorUsuario(
                "Ingrese usuario o correo"
            );

            valido = false;

        }

        if(passwordIngresada === ""){

            setErrorPassword(
                "Ingrese contraseña"
            );

            valido = false;

        }

        if(!valido){
            return;
        }

        let usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

        let usuarioEncontrado =
        usuarios.find(usuario =>

            (
                usuario.correo === usuarioIngresado ||

                usuario.nombreUsuario === usuarioIngresado
            )

            &&

            usuario.password === passwordIngresada

        );

        if(!usuarioEncontrado){

            alert(
                "Usuario o contraseña incorrectos."
            );

            return;

        }

        localStorage.setItem(

            "usuarioActivo",

            JSON.stringify(usuarioEncontrado)

        );

        alert(

            "Bienvenido " +
            usuarioEncontrado.nombreUsuario

        );

        navigate("/curses");

    }

    return(

        <div className="contenedor-login">

            <div className="tarjeta">

                <h1>
                    Capacitaciones Web
                </h1>

                <p className="subtitulo">

                    Inicia sesión para continuar

                </p>

                <form onSubmit={iniciarSesion}>

                    <label>

                        Correo o Usuario

                    </label>

                    <input

                        type="text"

                        value={usuario}

                        onChange={(e)=>

                            setUsuario(e.target.value)

                        }

                        placeholder="Ingrese su correo o usuario"

                    />

                    <small className="error">

                        {errorUsuario}

                    </small>

                    <label>

                        Contraseña

                    </label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e)=>

                            setPassword(e.target.value)

                        }

                        placeholder="Ingrese su contraseña"

                    />

                    <small className="error">

                        {errorPassword}

                    </small>

                    <button type="submit">

                        Iniciar Sesión

                    </button>

                </form>

                <p className="enlace">

                    No tienes una cuenta?{" "}

                    <Link to="/register">

                        Registrarse

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Index;