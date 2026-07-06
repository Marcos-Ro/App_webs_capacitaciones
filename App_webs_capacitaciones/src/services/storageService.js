// =====================================================
// storageService.js
// Inicializa toda la información del sistema
// =====================================================

export function inicializarSistema() {

    crearAdministrador();

    crearCursos();

}

// =====================================================
// ADMINISTRADOR
// =====================================================

function crearAdministrador() {

    let administradores = JSON.parse(

        localStorage.getItem("administradores")

    );

    if (administradores) return;

    administradores = [

        {

            id: 1,

            nombre: "Administrador",

            usuario: "admin",

            password: "admin123"

        }

    ];

    localStorage.setItem(

        "administradores",

        JSON.stringify(administradores)

    );

}

// =====================================================
// CURSOS
// =====================================================

function crearCursos() {

    let cursos = JSON.parse(

        localStorage.getItem("cursos")

    );

    if (cursos) return;

    cursos = [

        {

            id: 1,

            categoria: "Programación",

            nombre: "HTML Básico",

            horas: "20 Horas",

            descripcion: "Aprende la estructura de una página web desde cero.",

            niveles: [

                {

                    id: 1,

                    titulo: "Introducción a HTML",

                    teoria: `

HTML significa HyperText Markup Language.

Es el lenguaje encargado de construir la estructura de una página web.

Con HTML podemos crear:

• Encabezados

• Párrafos

• Listas

• Imágenes

• Formularios

• Tablas

• Enlaces

Todo sitio web comienza utilizando HTML.

                    `,

                    material: {

                        nombre: "Guía de Introducción a HTML",

                        archivo: "/material/html/introduccion.pdf"

                    },

                    cuestionario: [

                        {

                            pregunta: "¿Qué significa HTML?",

                            opciones: [

                                "HyperText Markup Language",

                                "Home Tool Markup Language",

                                "High Text Machine Language"

                            ],

                            correcta: 0

                        }

                    ]

                },

                {

                    id: 2,

                    titulo: "Etiquetas HTML",

                    teoria: `

Las etiquetas permiten crear los distintos elementos de una página.

Ejemplos:

<h1>

<p>

<a>

<img>

<ul>

<li>

Cada etiqueta cumple una función específica.

                    `,

                    material: {

                        nombre: "Etiquetas HTML",

                        archivo: "/material/html/etiquetas.pdf"

                    },

                    cuestionario: [

                        {

                            pregunta: "¿Qué etiqueta crea un enlace?",

                            opciones: [

                                "<img>",

                                "<a>",

                                "<table>"

                            ],

                            correcta: 1

                        }

                    ]

                },

                {

                    id: 3,

                    titulo: "Formularios",

                    teoria: `

Los formularios permiten recibir información del usuario.

Elementos importantes:

input

textarea

button

select

label

                    `,

                    material: {

                        nombre: "Formularios HTML",

                        archivo: "/material/html/formularios.pdf"

                    },

                    cuestionario: [

                        {

                            pregunta: "¿Qué etiqueta crea un campo de texto?",

                            opciones: [

                                "<input>",

                                "<body>",

                                "<head>"

                            ],

                            correcta: 0

                        }

                    ]

                }

            ]

        }

    ];

    localStorage.setItem(

        "cursos",

        JSON.stringify(cursos)

    );

}