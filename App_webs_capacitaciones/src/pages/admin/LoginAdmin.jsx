import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/admin/LoginAdmin.css";

function LoginAdmin() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");

    const [password, setPassword] = useState("");

    function iniciarSesion() {

        const administradores = JSON.parse(

            localStorage.getItem("administradores")

        ) || [];
        console.log("Administradores:", administradores);
        console.log("Usuario escrito:", usuario);
        console.log("Password escrita:", password);
        alert(
            "Usuario: " + usuario +
            "\nPassword: " + password
        );

        const admin = administradores[0];
        console.log(admin);
        console.log("Administrador encontrado:", admin);

        if(!admin){

            alert("Usuario o contraseña incorrectos.");

            return;

        }

        localStorage.setItem(

            "adminActivo",

            JSON.stringify(admin)

        );

        navigate("/admin");

    }

    return(

        <div className="loginAdmin">

            <div className="loginBox">

                <h1>

                    Panel Administrativo

                </h1>

                <input

                    type="text"

                    placeholder="Usuario"

                    value={usuario}

                    onChange={e=>setUsuario(e.target.value)}

                />

                <input

                    type="password"

                    placeholder="Contraseña"

                    value={password}

                    onChange={e=>setPassword(e.target.value)}

                />

                <button

                    onClick={iniciarSesion}

                >

                    Ingresar

                </button>

            </div>

        </div>

    );

}

export default LoginAdmin;