import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Content.css";

import { obtenerCursoPorNombre } from "../services/courseService";

import {

    calcularPorcentaje,
    completarNivel,
    nivelCompletado,
    cursoFinalizado

} from "../services/progressService";

function Content(){

    const navigate = useNavigate();

    const [curso,setCurso] = useState(null);

    const [usuario,setUsuario] = useState(null);

    const [nivelActual,setNivelActual] = useState(null);

    const [porcentaje,setPorcentaje] = useState(0);

    const [respuestas,setRespuestas]=useState([]);

    const [aprobado,setAprobado]=useState(false);

    useEffect(()=>{ 

        const nombreCurso =

            localStorage.getItem("cursoSeleccionado");

        if(!nombreCurso){

            navigate("/subcurses");

            return;

        }

        const cursoEncontrado =

            obtenerCursoPorNombre(nombreCurso);

        if(!cursoEncontrado){

            navigate("/subcurses");

            return;

        }

        const usuarioActivo =

            JSON.parse(

                localStorage.getItem("usuarioActivo")

            );

        setCurso(cursoEncontrado);

        setUsuario(usuarioActivo);
        console.log(cursoEncontrado);
        if(cursoEncontrado.niveles.length > 0){

            setNivelActual(

                cursoEncontrado.niveles[0]

            );

        }

        setPorcentaje(

            calcularPorcentaje(

                usuarioActivo.nombreUsuario,

                cursoEncontrado.nombre,

                cursoEncontrado.niveles.length

            )

        );
        setRespuestas([]);

    },[]);
    function responder(indice,respuesta){

    const nuevas=[...respuestas];

    nuevas[indice]=respuesta;

    setRespuestas(nuevas);

}

function finalizarNivel(){

    let correctas=0;

    nivelActual.cuestionario.forEach((pregunta,index)=>{

        if(respuestas[index]===pregunta.correcta){

            correctas++;

        }

    });

    const nota=Math.round(

        (correctas/

        nivelActual.cuestionario.length)

        *100

    );

    if(nota<70){

        alert(

            "No aprobaste el cuestionario.\n\n"

            +"Resultado: "

            +nota+

            "%"

        );

        return;

    }

    completarNivel(

        usuario.nombreUsuario,

        curso.nombre,

        nivelActual.id

    );

    setAprobado(true);

    setPorcentaje(

        calcularPorcentaje(

            usuario.nombreUsuario,

            curso.nombre,

            curso.niveles.length

        )

    );

    alert("Nivel completado correctamente.");

}

    if(!curso){

        return <h2>Cargando...</h2>;

    }
    if(curso.niveles.length === 0){

        return(
            <>
                <h2>

                    Este curso todavía no tiene contenido.

                </h2>
            </>
        );
    }

    return(

        <>

            <header className="header">

                <div className="logo">

                    Capacitaciones Web

                </div>

                <button

                    onClick={()=>navigate("/subcurses")}

                >

                    Volver

                </button>

            </header>

            <div className="content-container">

                <h1>

                    {curso.nombre}

                </h1>

                <div className="barra-container">

                    <div

                        className="barra"

                        style={{

                            width:porcentaje+"%"

                        }}

                    />

                </div>

                <p>

                    {porcentaje}% completado

                </p>

                <div className="niveles">

                    {

                        curso.niveles.map(nivel=>(

                            <button

                                key={nivel.id}

                                className={

                                    nivelActual.id===nivel.id

                                    ?

                                    "nivel activo"

                                    :

                                    "nivel"

                                }

                                onClick={()=>

                                    setNivelActual(nivel)

                                }

                            >

                                {nivel.titulo}

                                {

                                    nivelCompletado(

                                        usuario.nombreUsuario,

                                        curso.nombre,

                                        nivel.id

                                    )

                                    &&

                                    " ✅"

                                }

                            </button>

                        ))

                    }

                </div>

                <div className="teoria">

                    <h2>

                        {nivelActual.titulo}

                    </h2>

                    <p>

                        {nivelActual.teoria}

                    </p>

                </div>
                <div className="material">

                    <h2>

                        Material

                    </h2>

                    <a

                        href={nivelActual.material.archivo}
                        target="_blank"
                    >
                        Descargar
                        {nivelActual.material.nombre}

                    </a>

                </div>
                <div className="quiz">

                    <h2>Cuestionario</h2>

                    {

                        nivelActual.cuestionario.map((pregunta, index) => (

                            <div
                                className="pregunta"
                                key={index}
                            >

                                <h4 className="titulo-pregunta">

                                    {pregunta.pregunta}

                                </h4>

                                {

                                    pregunta.opciones.map((opcion, i) => (

                                        <label
                                            className="opcion"
                                            key={i}
                                        >

                                            <input

                                                type="radio"

                                                name={"pregunta" + index}

                                                checked={

                                                    respuestas[index] === i

                                                }

                                                onChange={() =>

                                                    responder(index, i)

                                                }

                                            />

                                            <span>

                                                {opcion}

                                            </span>

                                        </label>

                                    ))

                                }

                            </div>

                        ))

                    }

                    <button

                        className="btn-finalizar"

                        onClick={finalizarNivel}

                    >

                        Finalizar Nivel

                    </button>

                </div>
                {
                    cursoFinalizado(

                    usuario.nombreUsuario,

                    curso.nombre,

                    curso.niveles.length

                    )

                    &&

                    <div

                    className="certificado"

                    >

                    <button

                    onClick={()=>

                    navigate("/certificate")

                    }
                    >
                    Obtener Certificado
                    </button>

                    </div>

                    }

            </div>

        </>

    );

}

export default Content;