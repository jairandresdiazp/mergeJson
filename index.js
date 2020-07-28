var body = {
    numeroDocumento: "8798",
    tipoDocumento: 1,
    primerNombre: "jair",
    primerApellido: "diaz",
    data: {
        holaqueHace: {
            esteDatosEsNuevo: true,
        },
        esteOtroDatoTambien: false,
        pruebaCadena: "jsfhskjfhksd",
        pruebaArregloCadena: ["jsfhskjfhksd", "djsjfhkjsd"],
        pruebaArregloObjeto: [{
            test: "jsfhskjfhksd",
            test2: "djsjfhkjsd"
        }],
        veiculos: [{
                placa: "22222",
                modelo: 2006,
                tipo: "automovil",
                cilidraje: 1400,
            },
            {
                id: "bty787",
                tipo: "moto",
            },
        ],
        informacionContacto: {
            test: [{
                test: [{
                    test: [{
                        test: [{
                            test: "valor",
                        }, ],
                    }, ],
                }, ],
            }, ],
            telefonos: ["38127368712", "827831729381"],
            correos: ["correo2@tuyewturw"],
        },
    },
};

var persona = {
    numeroDocumento: "7687687",
    tipoDocumento: 1,
    primerNombre: "jair",
    primerApellido: "diaz",
    data: {
        veiculos: [{
                placa: "123133",
                modelo: 2006,
                tipo: "automovil",
                cilidraje: 1400,
            },
            {
                id: "bty787",
                modelo: 2006,
            },
        ],
        informacionContacto: {
            test: [{
                test: [{
                    test: [{
                        test: [{
                            test: "valor",
                        }, ],
                    }, ],
                }, ],
            }, ],
            telefonos: ["38127368712", "827831729381"],
            correos: ["jdiaz@jsdhfk.com", "jjjd@kjshdjks.com"],
        },
    },
};

function fusionarArreglo(objetoNuevo, objetoActual) {
    var objetoFinal = objetoActual;
    objetoNuevo.forEach(function(_objetoNuevo) {
        var indice = -1;
        if (typeof _objetoNuevo == "object" && _objetoNuevo != null) {
            indice = objetoActual.findIndex((_objetoActual) => {
                if (
                    _objetoActual != null &&
                    _objetoActual.id != null &&
                    _objetoNuevo != null &&
                    _objetoNuevo.id != null
                ) {
                    if (
                        _objetoActual.id.toString().toLowerCase() ==
                        _objetoNuevo.id.toString().toLowerCase()
                    ) {
                        return true;
                    }
                }
            });
        } else {
            indice = objetoActual.findIndex((_objetoActual) => {
                if (_objetoActual != null && _objetoNuevo != null) {
                    if (
                        _objetoActual.toString().toLowerCase() ==
                        _objetoNuevo.toString().toLowerCase()
                    ) {
                        return true;
                    }
                }
            });
        }
        if (indice < 0) {
            if (_objetoNuevo != null) {
                objetoFinal.push(_objetoNuevo);
            }
        } else {
            if (typeof _objetoNuevo == "object" && _objetoNuevo != null) {
                objetoFinal.push(
                    fusionarObjeto(_objetoNuevo, objetoActual[indice], true)
                );
                objetoFinal.splice(indice, 1);
            } else if (_objetoNuevo != null) {
                objetoFinal.push(_objetoNuevo);
            }
        }
    });
    return objetoFinal;
}

function fusionarObjeto(objetoNuevo, objetoActual, contarReportes = false) {
    var objetoFinal = objetoActual;
    Object.keys(objetoNuevo).forEach(function(key) {
        var valorNuevo = objetoNuevo[key];
        if (objetoActual.hasOwnProperty(key)) {
            var valorActual = objetoActual[key];
            if (typeof valorNuevo == "object" && valorNuevo != null) {
                if (Array.isArray(valorNuevo) == true) {
                    objetoFinal[key] = fusionarArreglo(valorNuevo, valorActual);
                } else {
                    objetoFinal[key] = fusionarObjeto(valorNuevo, valorActual);
                }
            } else {
                objetoFinal[key] = valorNuevo;
            }
        } else {
            objetoFinal[key] = valorNuevo;
        }
    });
    objetoFinal["fechaUtlimoReporte"] = new Date().toISOString();
    if (contarReportes == true) {
        if (objetoFinal["numeroReportes"] == null) {
            objetoFinal["numeroReportes"] = 2;
        } else {
            objetoFinal["numeroReportes"]++;
        }
    }
    return objetoFinal;
}

console.time("fusionarObjeto");
console.log("test fusion del objeto " + JSON.stringify(fusionarObjeto(body, persona)));
console.timeEnd("fusionarObjeto");
