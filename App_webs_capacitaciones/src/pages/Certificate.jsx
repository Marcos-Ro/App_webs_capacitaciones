import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import medalla from "../assets/images/medalla.png";

import "../css/Certificate.css";

function Certificate() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);

    const [curso, setCurso] = useState("");

    const [fecha, setFecha] = useState("");

    useEffect(() => {

        const usuarioActivo = JSON.parse(
            localStorage.getItem("usuarioActivo")
        );

        const cursoSeleccionado = localStorage.getItem(
            "cursoSeleccionado"
        );

        if (!usuarioActivo || !cursoSeleccionado) {

            navigate("/curses");

            return;

        }

        setUsuario(usuarioActivo);

        setCurso(cursoSeleccionado);

        const hoy = new Date();

        setFecha(
            hoy.toLocaleDateString()
        );

    }, [navigate]);

    if (!usuario) {

        return <h2>Cargando...</h2>;

    }

    return (

        <div className="certificate-page">

            <div className="certificate">

                <h1>

                    CERTIFICADO

                </h1>

                <p>

                    Se certifica que

                </p>

                <h2>

                    {usuario.nombre}

                </h2>

                <p>

                    ha completado satisfactoriamente el curso

                </p>

                <h3>

                    {curso}

                </h3>

                <p>

                    Fecha de finalización

                </p>

                <strong>

                    {fecha}

                </strong>

                <div className="medalla">

                    <img
                        src={medalla}
                        alt="Medalla"
                    />

                </div>

                <div className="botones">

                    <button
                        onClick={() => window.print()}
                    >
                        Imprimir / Guardar PDF
                    </button>

                    <button
                        onClick={() => navigate("/certificates")}
                    >
                        Mis Certificados
                    </button>

                    <button
                        onClick={() => navigate("/curses")}
                    >
                        Volver a Cursos
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Certificate;