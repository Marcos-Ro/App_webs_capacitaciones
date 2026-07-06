import { useEffect, useState } from "react";
import "../../css/admin/Courses.css";
import { useNavigate } from "react-router-dom";

import {

    obtenerCursos,
    agregarCurso,
    eliminarCurso

} from "../../services/courseService";

function Courses() {

    const navigate = useNavigate();

    const [cursos, setCursos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nuevoCurso, setNuevoCurso] = useState({

        categoria: "",

        nombre: "",

        horas: "",

        descripcion: ""

    });

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    useEffect(() => {

        cargarCursos();

    }, []);

    function cargarCursos() {

        const listaCursos = obtenerCursos();

        setCursos(listaCursos);

        const categoriasUnicas = [

            ...new Set(

                listaCursos.map(

                    curso => curso.categoria

                )

            )

        ];

        setCategorias(categoriasUnicas);

    }

    function manejarCambio(e) {

        setNuevoCurso({

            ...nuevoCurso,

            [e.target.name]: e.target.value

        });

    }

    function guardarCurso() {

        if (

            !nuevoCurso.categoria ||

            !nuevoCurso.nombre ||

            !nuevoCurso.horas ||

            !nuevoCurso.descripcion

        ) {

            alert("Complete todos los campos.");

            return;

        }

        if (editando) {

            let cursos = obtenerCursos();

            cursos = cursos.map(curso =>

                curso.id === idEditar

                    ? {

                        ...curso,

                        categoria: nuevoCurso.categoria,

                        nombre: nuevoCurso.nombre,

                        horas: nuevoCurso.horas,

                        descripcion: nuevoCurso.descripcion

                    }

                    : curso

            );

            localStorage.setItem(

                "cursos",

                JSON.stringify(cursos)

            );

            setEditando(false);

            setIdEditar(null);

        }

        else {

            agregarCurso({

                id: Date.now(),

                ...nuevoCurso,

                niveles: []

            });

        }

        setNuevoCurso({

            categoria: "",

            nombre: "",

            horas: "",

            descripcion: ""

        });

        cargarCursos();

    }

    function borrarCurso(id) {

        if (!confirm("¿Eliminar este curso?")) return;

        eliminarCurso(id);

        cargarCursos();

    }

    function editarCurso(curso) {

        setEditando(true);

        setIdEditar(curso.id);

        setNuevoCurso({

            categoria: curso.categoria,

            nombre: curso.nombre,

            horas: curso.horas,

            descripcion: curso.descripcion

        });

    }

    return (

        <div className="courses">

            <h1>

                Gestión de Cursos

            </h1>

            <div className="formulario">

                <input

                    list="listaCategorias"

                    name="categoria"

                    placeholder="Categoría"

                    value={nuevoCurso.categoria}

                    onChange={manejarCambio}

                />

                <datalist id="listaCategorias">

                    {

                        categorias.map((categoria, index) => (

                            <option

                                key={index}

                                value={categoria}

                            />

                        ))

                    }

                </datalist>

                <input

                    name="nombre"

                    placeholder="Nombre"

                    value={nuevoCurso.nombre}

                    onChange={manejarCambio}

                />

                <input

                    name="horas"

                    placeholder="Horas"

                    value={nuevoCurso.horas}

                    onChange={manejarCambio}

                />

                <textarea

                    name="descripcion"

                    placeholder="Descripción"

                    value={nuevoCurso.descripcion}

                    onChange={manejarCambio}

                />

                <button

                    onClick={guardarCurso}

                >

                    {editando ? "Guardar Cambios" : "Agregar Curso"}

                </button>

            </div>

            <div className="listaCursos">

                {

                    cursos.map(curso => (

                        <div

                            className="curso"

                            key={curso.id}

                        >

                            <h3>

                                {curso.nombre}

                            </h3>

                            <p>

                                <strong>Categoría:</strong> {curso.categoria}

                            </p>

                            <p>

                                <strong>Duración:</strong> {curso.horas}

                            </p>

                            <button

                                onClick={() => editarCurso(curso)}

                            >

                                Editar

                            </button>

                            <button

                                className="contenido"

                                onClick={() => {

                                    localStorage.setItem(

                                        "cursoEditar",

                                        curso.id

                                    );

                                    navigate("/admin/content-manager");

                                }}

                            >

                                Administrar Contenido

                            </button>

                            <button

                                className="eliminar"

                                onClick={() =>

                                    borrarCurso(curso.id)

                                }

                            >

                                Eliminar

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Courses;