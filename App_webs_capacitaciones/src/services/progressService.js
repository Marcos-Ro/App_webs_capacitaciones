// =====================================================
// progressService.js
// Control del progreso de los cursos
// =====================================================

const PREFIJO = "progreso_";

function obtenerClave(usuario, curso) {

    return PREFIJO + usuario + "_" + curso;

}

// =====================================================
// Obtener progreso
// =====================================================

export function obtenerProgreso(usuario, curso) {

    const progreso = JSON.parse(

        localStorage.getItem(

            obtenerClave(usuario, curso)

        )

    );

    return progreso || [];

}

// =====================================================
// Guardar progreso
// =====================================================

export function guardarProgreso(usuario, curso, progreso) {

    localStorage.setItem(

        obtenerClave(usuario, curso),

        JSON.stringify(progreso)

    );

}

// =====================================================
// Completar un nivel
// =====================================================

export function completarNivel(usuario, curso, idNivel) {

    let progreso = obtenerProgreso(usuario, curso);

    if (!progreso.includes(idNivel)) {

        progreso.push(idNivel);

        guardarProgreso(

            usuario,

            curso,

            progreso

        );

    }

}

// =====================================================
// Saber si un nivel está aprobado
// =====================================================

export function nivelCompletado(

    usuario,

    curso,

    idNivel

) {

    const progreso = obtenerProgreso(

        usuario,

        curso

    );

    return progreso.includes(idNivel);

}

// =====================================================
// Calcular porcentaje
// =====================================================

export function calcularPorcentaje(

    usuario,

    cursoNombre,

    totalNiveles

) {

    const progreso = obtenerProgreso(

        usuario,

        cursoNombre

    );

    if (totalNiveles === 0) {

        return 0;

    }

    return Math.round(

        (progreso.length / totalNiveles) * 100

    );

}

// =====================================================
// Curso terminado
// =====================================================

export function cursoFinalizado(

    usuario,

    curso,

    totalNiveles

) {

    return (

        calcularPorcentaje(

            usuario,

            curso,

            totalNiveles

        ) === 100

    );

}

// =====================================================
// Reiniciar progreso
// =====================================================

export function reiniciarCurso(

    usuario,

    curso

) {

    localStorage.removeItem(

        obtenerClave(

            usuario,

            curso

        )

    );

}