import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Curses.css";
import { obtenerCursos } from "../services/courseService";

function Curses() {

    const navigate = useNavigate();

    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [modoOscuro, setModoOscuro] = useState(false);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

        let usuario = JSON.parse(
            localStorage.getItem("usuarioActivo")
        );

        if (!usuario) {

            navigate("/");
            return;

        }

        setUsuarioActivo(usuario);

        const cursos = obtenerCursos();

        const categoriasUnicas = [
            ...new Map(
                cursos.map(curso => [
                    curso.categoria,
                    {
                        nombre: curso.categoria,
                        descripcion:
                            "Explora los cursos de " + curso.categoria
                    }
                ])
            ).values()
        ];

        setCategorias(categoriasUnicas);

        let modoOscuroGuardado = JSON.parse(
            localStorage.getItem("modoOscuro")
        );

        if (modoOscuroGuardado) {

            document.body.classList.add("dark");
            setModoOscuro(true);

        }

    }, [navigate]);

    function cerrarSesion() {

        localStorage.removeItem("usuarioActivo");

        navigate("/");

    }

    function cambiarModoOscuro(e) {

        if (e.target.checked) {

            document.body.classList.add("dark");

            localStorage.setItem(
                "modoOscuro",
                JSON.stringify(true)
            );

            setModoOscuro(true);

        }
        else {

            document.body.classList.remove("dark");

            localStorage.setItem(
                "modoOscuro",
                JSON.stringify(false)
            );

            setModoOscuro(false);

        }

    }

    function abrirCategoria(categoria) {

        localStorage.setItem(
            "categoriaSeleccionada",
            categoria
        );

        navigate("/subcurses");

    }

    return (

        <>

            <header className="header">

                <div className="logo">

                    Capacitaciones Web

                </div>

                <div>

                    <span className="usuario">

                        {usuarioActivo &&
                            "Hola, " + usuarioActivo.nombreUsuario}

                    </span>

                    <button
                        classname="btn-salir"
                        onClick={cerrarSesion}
                    >

                        Cerrar Sesión

                    </button>

                </div>

                <button
                    className="btn-certificados"
                    onClick={() => navigate("/certificates")}
                >

                    Mis Certificados

                </button>

            </header>

            <div className="contenedor">

                <div className="settings">

                    <h3>

                        Configuración

                    </h3>

                    <label>

                        <input

                            type="checkbox"

                            checked={modoOscuro}

                            onChange={cambiarModoOscuro}

                        />

                        Activar Modo Oscuro

                    </label>

                </div>

                <h1 className="titulo">

                    Cursos Disponibles

                </h1>

                <div className="grid-cursos">

                    {

                        categorias.map((categoria, index) => (

                            <div
                                className="curso"
                                key={index}
                            >

                                <h3>

                                    {categoria.nombre}

                                </h3>

                                <p>

                                    {categoria.descripcion}

                                </p>

                                <button

                                    onClick={() =>
                                        abrirCategoria(categoria.nombre)
                                    }

                                >

                                    Ver Cursos

                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default Curses;