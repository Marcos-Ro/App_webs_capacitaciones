import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCursosPorCategoria } from "../services/courseService";
import "../css/Subcurses.css";

function Subcurses() {
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [inscripciones, setInscripciones] = useState([]);
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const categoriaGuardada = localStorage.getItem("categoriaSeleccionada");
        if(!categoriaGuardada){
            navigate("/curses");
            return;
        }
        setCategoria(categoriaGuardada);
        setCursos(
            obtenerCursosPorCategoria(categoriaGuardada)
        );
        setUsuario(JSON.parse(localStorage.getItem("usuarioActivo")));
        setInscripciones(JSON.parse(localStorage.getItem("inscripciones")) || []);
    }, [navigate]);

    function inscribirse(nombreCurso){
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        let inscripcionesActuales = JSON.parse(localStorage.getItem("inscripciones")) || [];

        const existe = inscripcionesActuales.some(item =>
            item.usuario === usuario.nombreUsuario &&
            item.curso === nombreCurso
        );

        if(!existe){
            inscripcionesActuales.push({
                usuario: usuario.nombreUsuario,
                curso: nombreCurso
            });

            localStorage.setItem("inscripciones", JSON.stringify(inscripcionesActuales));
            alert("Inscripción realizada correctamente.");
        }

        localStorage.setItem("cursoSeleccionado", nombreCurso);
        navigate("/content");
    }

    return (
        <>
            <header className="header">
                <div className="logo">Capacitaciones Web</div>
                <button onClick={() => navigate("/curses")}>Volver</button>
            </header>

            <div className="contenedor">
                <h1 className="titulo">{categoria}</h1>

                {cursos.map((curso,index)=>{
                    const inscrito = inscripciones.some(item =>
                        usuario &&
                        item.usuario===usuario.nombreUsuario &&
                        item.curso===curso.nombre
                    );

                    return (
                        <div className="subcurso" key={index}>
                            <h3>{curso.nombre}</h3>
                            <p><strong>Duración:</strong> {curso.horas}</p>
                            <p>{curso.descripcion}</p>
                            <button onClick={()=>inscribirse(curso.nombre)}>
                                {inscrito ? "Ver Curso" : "Inscribirse"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Subcurses;
