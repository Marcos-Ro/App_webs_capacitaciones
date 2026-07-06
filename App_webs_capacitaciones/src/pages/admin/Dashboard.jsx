import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/admin/Dashboard.css";

import { obtenerCursos } from "../../services/courseService";

function Dashboard() {

    const navigate = useNavigate();
    const [totalCursos, setTotalCursos] = useState(0);
    function cerrarSesion(){

    localStorage.removeItem("adminActivo");

    navigate("/admin/login");

}

    useEffect(() => {

        const admin = localStorage.getItem("adminActivo");

        if (!admin) {

            navigate("/admin/login");

            return;

        }

        const cursos = obtenerCursos();

        setTotalCursos(cursos.length);

    }, [navigate]);

    return (

        <div className="dashboard">

            <div className="topo">

                <div>

                    <h1>

                        Panel de Administración

                    </h1>

                    <p>

                        Bienvenido Administrador

                    </p>

                </div>

                <button

                    className="logout"

                    onClick={cerrarSesion}

                >

                    Cerrar Sesión

                </button>

            </div>

            <div className="cards">

                <div className="card">

                    <h2>

                        {totalCursos}

                    </h2>

                    <p>

                        Cursos registrados

                    </p>

                </div>

            </div>

            <div className="acciones">

                <button

                    onClick={() =>

                        navigate("/admin/courses")

                    }

                >

                    Gestionar Cursos

                </button>

            </div>

        </div>

    );

}

export default Dashboard;