// =====================================================
// courseService.js
// Servicios para administrar los cursos
// =====================================================

export function obtenerCursos() {

    return JSON.parse(
        localStorage.getItem("cursos")
    ) || [];

}

export function guardarCursos(cursos) {

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

}

export function obtenerCursoPorId(id) {

    const cursos = obtenerCursos();

    return cursos.find(curso =>
        curso.id === id
    );

}

export function obtenerCursoPorNombre(nombre) {

    const cursos = obtenerCursos();

    return cursos.find(curso =>
        curso.nombre === nombre
    );

}

export function obtenerCursosPorCategoria(categoria) {

    const cursos = obtenerCursos();

    return cursos.filter(curso =>
        curso.categoria === categoria
    );

}

export function agregarCurso(cursoNuevo) {

    const cursos = obtenerCursos();

    cursoNuevo.id = Date.now();

    cursos.push(cursoNuevo);

    guardarCursos(cursos);

}

export function editarCurso(cursoEditado) {

    let cursos = obtenerCursos();

    cursos = cursos.map(curso =>

        curso.id === cursoEditado.id

            ? cursoEditado

            : curso

    );

    guardarCursos(cursos);

}

export function eliminarCurso(id) {

    const cursos = obtenerCursos().filter(curso =>

        curso.id !== id

    );

    guardarCursos(cursos);

}

export function agregarNivel(idCurso, nivelNuevo) {

    const cursos = obtenerCursos();

    const curso = cursos.find(c =>

        c.id === idCurso

    );

    if (!curso) return;

    nivelNuevo.id = Date.now();

    curso.niveles.push(nivelNuevo);

    guardarCursos(cursos);

}

export function editarNivel(idCurso, nivelEditado) {

    const cursos = obtenerCursos();

    const curso = cursos.find(c =>

        c.id === idCurso

    );

    if (!curso) return;

    curso.niveles = curso.niveles.map(nivel =>

        nivel.id === nivelEditado.id

            ? nivelEditado

            : nivel

    );

    guardarCursos(cursos);

}

export function eliminarNivel(idCurso, idNivel) {

    const cursos = obtenerCursos();

    const curso = cursos.find(c =>

        c.id === idCurso

    );

    if (!curso) return;

    curso.niveles = curso.niveles.filter(nivel =>

        nivel.id !== idNivel

    );

    guardarCursos(cursos);

}