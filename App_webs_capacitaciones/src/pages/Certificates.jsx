import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Certificates.css";

import { obtenerCursos } from "../services/courseService";
import { cursoFinalizado } from "../services/progressService";

function Certificates() {

    const navigate = useNavigate();

    const [certificados, setCertificados] = useState([]);

    useEffect(() => {

        const usuario = JSON.parse(
            localStorage.getItem("usuarioActivo")
        );

        if (!usuario) {

            navigate("/");

            return;

        }

        const cursos = obtenerCursos();

        const lista = cursos.filter(curso =>

            cursoFinalizado(

                usuario.nombreUsuario,

                curso.nombre,

                curso.niveles.length

            )

        );

        setCertificados(lista);

    }, [navigate]);

    return (

        <div className="certificates">

            <h1>

                Mis Certificados

            </h1>

            {

                certificados.length === 0 ?

                (

                    <p>

                        Todavía no has obtenido certificados.

                    </p>

                )

                :

                certificados.map(curso => (

                    <div

                        className="certificado-card"

                        key={curso.id}

                    >

                        <h2>

                            {curso.nombre}

                        </h2>

                        <p>

                            Certificado disponible.

                        </p>

                        <button

                            onClick={() => {

                                localStorage.setItem(

                                    "cursoSeleccionado",

                                    curso.nombre

                                );

                                navigate("/certificate");

                            }}

                        >

                            Ver Certificado

                        </button>

                    </div>

                ))

            }

            <button

                className="volver"

                onClick={() => navigate("/curses")}

            >

                Volver

            </button>

        </div>

    );

}

export default Certificates;