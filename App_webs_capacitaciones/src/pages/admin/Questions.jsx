import { useEffect, useState } from "react";
import "../../css/admin/Questions.css";

import {
    obtenerCursos,
    guardarCursos
} from "../../services/courseService";

function Questions() {

    const [curso, setCurso] = useState(null);

    const [nivel, setNivel] = useState(null);

    const [pregunta, setPregunta] = useState("");

    const [a, setA] = useState("");

    const [b, setB] = useState("");

    const [c, setC] = useState("");

    const [correcta, setCorrecta] = useState(0);

    useEffect(() => {

        const idCurso = Number(localStorage.getItem("cursoEditar"));

        const idNivel = Number(localStorage.getItem("nivelEditar"));

        const cursos = obtenerCursos();

        const cursoEncontrado = cursos.find(c => c.id === idCurso);

        const nivelEncontrado = cursoEncontrado.niveles.find(

            n => n.id === idNivel

        );

        setCurso(cursoEncontrado);

        setNivel(nivelEncontrado);

    }, []);

    function agregarPregunta() {

        if (

            !pregunta ||

            !a ||

            !b ||

            !c

        ) {

            alert("Complete todos los campos.");

            return;

        }

        const cursos = obtenerCursos();

        const indiceCurso = cursos.findIndex(

            c => c.id === curso.id

        );

        const indiceNivel = cursos[indiceCurso]

            .niveles.findIndex(

                n => n.id === nivel.id

            );

        cursos[indiceCurso]

            .niveles[indiceNivel]

            .cuestionario.push({

                pregunta,

                opciones: [

                    a,

                    b,

                    c

                ],

                correcta: Number(correcta)

            });

        guardarCursos(cursos);

        setNivel(

            cursos[indiceCurso]

            .niveles[indiceNivel]

        );

        setPregunta("");

        setA("");

        setB("");

        setC("");

        setCorrecta(0);

    }
    function eliminarPregunta(indicePregunta){

        if(!confirm("¿Eliminar esta pregunta?")){

            return;

        }

        const cursos = obtenerCursos();

        const indiceCurso = cursos.findIndex(

            c => c.id === curso.id

        );

        const indiceNivel = cursos[indiceCurso]

            .niveles.findIndex(

                n => n.id === nivel.id

            );

        cursos[indiceCurso]

            .niveles[indiceNivel]

            .cuestionario.splice(

                indicePregunta,

                1

            );

        guardarCursos(cursos);

        setNivel(

            cursos[indiceCurso]

            .niveles[indiceNivel]

        );

    }

    if (!nivel) {

        return <h2>Cargando...</h2>;

    }

    return (

        <div className="questions">

            <h1>

                {curso.nombre}

            </h1>

            <h2>

                {nivel.titulo}

            </h2>

            <div className="formulario">

                <input

                    placeholder="Pregunta"

                    value={pregunta}

                    onChange={e =>

                        setPregunta(e.target.value)

                    }

                />

                <input

                    placeholder="Opción A"

                    value={a}

                    onChange={e =>

                        setA(e.target.value)

                    }

                />

                <input

                    placeholder="Opción B"

                    value={b}

                    onChange={e =>

                        setB(e.target.value)

                    }

                />

                <input

                    placeholder="Opción C"

                    value={c}

                    onChange={e =>

                        setC(e.target.value)

                    }

                />

                <select

                    value={correcta}

                    onChange={e =>

                        setCorrecta(e.target.value)

                    }

                >

                    <option value="0">

                        Opción A

                    </option>

                    <option value="1">

                        Opción B

                    </option>

                    <option value="2">

                        Opción C

                    </option>

                </select>

                <button

                    onClick={agregarPregunta}

                >

                    Agregar Pregunta

                </button>

            </div>

            <h2>

                Preguntas existentes

            </h2>

        {

            nivel.cuestionario.map((p, i)=>(

                <div

                    className="pregunta"

                    key={i}

                >

                    <strong>

                        {p.pregunta}

                    </strong>

                    <p>

                        A. {p.opciones[0]}

                    </p>

                    <p>

                        B. {p.opciones[1]}

                    </p>

                    <p>

                        C. {p.opciones[2]}

                    </p>

                    <p>

                        Correcta:

                        {p.correcta + 1}

                    </p>

                    <button

                        onClick={()=>

                            eliminarPregunta(i)

                        }

                    >

                        Eliminar

                    </button>

                </div>

            ))

        }

        </div>

    );

}

export default Questions;