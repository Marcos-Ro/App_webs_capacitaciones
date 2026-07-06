export function obtenerUsuarios(){

    return JSON.parse(

        localStorage.getItem("usuarios")

    ) || [];

}

export function guardarUsuarios(usuarios){

    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );

}

export function obtenerAdministradores(){

    return JSON.parse(

        localStorage.getItem("administradores")

    ) || [];

}