import { useEffect, useState } from "react";
import "../../css/admin/ContentManager.css";

import {
    obtenerCursos,
    guardarCursos
} from "../../services/courseService";

function ContentManager() {

    const [curso, setCurso] = useState(null);

    const [titulo, setTitulo] = useState("");

    const [teoria, setTeoria] = useState("");

    const [nombreMaterial, setNombreMaterial] = useState("");

    const [rutaMaterial, setRutaMaterial] = useState("");

    useEffect(() => {

        const idCurso = Number(

            localStorage.getItem("cursoEditar")

        );

        const cursos = obtenerCursos();

        const encontrado = cursos.find(

            c => c.id === idCurso

        );

        setCurso(encontrado);

    }, []);

    function agregarNivel() {

        if (

            !titulo ||

            !teoria ||

            !nombreMaterial ||

            !rutaMaterial

        ) {

            alert("Complete todos los campos.");

            return;

        }

        const cursos = obtenerCursos();

        const indice = cursos.findIndex(

            c => c.id === curso.id

        );

        cursos[indice].niveles.push({

            id: Date.now(),

            titulo,

            teoria,

            material: {

                nombre: nombreMaterial,

                archivo: rutaMaterial

            },

            cuestionario: []

        });

        guardarCursos(cursos);

        setCurso(cursos[indice]);

        setTitulo("");

        setTeoria("");

        setNombreMaterial("");

        setRutaMaterial("");

        alert("Nivel agregado.");

    }
    function eliminarNivel(idNivel){

    if(

        !confirm(

            "¿Eliminar este nivel?"

        )

    ) return;

    const cursos=

        obtenerCursos();

    const indice=

        cursos.findIndex(c=>

            c.id===curso.id

        );

    cursos[indice].niveles=

        cursos[indice].niveles.filter(

            nivel=>

            nivel.id!==idNivel

        );

    guardarCursos(cursos);

    setCurso(cursos[indice]);

}

function editarNivel(nivel){

    setTitulo(

        nivel.titulo

    );

    setTeoria(

        nivel.teoria

    );

    setNombreMaterial(

        nivel.material.nombre

    );

    setRutaMaterial(

        nivel.material.archivo

    );

}

    if (!curso) {

        return <h2>Cargando...</h2>;

    }

    return (

        <div className="contentManager">

            <h1>

                {curso.nombre}

            </h1>

            <h2>

                Administrar Contenido

            </h2>

            <div className="formulario">

                <input

                    placeholder="Título del nivel"

                    value={titulo}

                    onChange={e =>

                        setTitulo(e.target.value)

                    }

                />

                <textarea

                    placeholder="Teoría"

                    value={teoria}

                    onChange={e =>

                        setTeoria(e.target.value)

                    }

                />

                <input

                    placeholder="Nombre del material"

                    value={nombreMaterial}

                    onChange={e =>

                        setNombreMaterial(

                            e.target.value

                        )

                    }

                />

                <input

                    placeholder="Ruta del PDF"

                    value={rutaMaterial}

                    onChange={e =>

                        setRutaMaterial(

                            e.target.value

                        )

                    }

                />

                <button

                    onClick={agregarNivel}

                >

                    Agregar Nivel

                </button>

            </div>

            <div className="niveles">

                {

                    curso.niveles.map(

                        nivel => (

                            <div
                                key={nivel.id}
                                className="nivel"
                            >

                                <h3>{nivel.titulo}</h3>

                                <p>{nivel.material.nombre}</p>

                                <div className="accionesNivel">

                                    <button

                                        onClick={()=>

                                            editarNivel(nivel)

                                        }

                                    >

                                        Editar

                                    </button>

                                    <button

                                        onClick={()=>

                                            eliminarNivel(nivel.id)

                                        }

                                    >

                                        Eliminar

                                    </button>

                                    <button

                                        onClick={()=>{

                                            localStorage.setItem(

                                                "nivelEditar",

                                                nivel.id

                                            );

                                            localStorage.setItem(

                                                "cursoEditar",

                                                curso.id

                                            );

                                            window.location.href="/admin/questions";

                                        }}

                                    >

                                        Cuestionario

                                    </button>

                                </div>
 
                            </div>
                            

                        )

                    )

                }

            </div>

        </div>

    );

}

export default ContentManager;