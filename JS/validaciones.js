export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
]

const mensajesDeError = {
  nombre: {
    valueMissing:"El campo nombre no puede estar vacio"
  },
  email: {
    valueMissing:"El campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing:"El campo contraseña no puede estar vacio",
    patternMismatch: "Al menos 6 caracteres, maximo 12, al menos una letra, un numero y un caracter especial"
  },
  nacimiento: {
    valueMissing:"El campo fecha de nacimiento no puede estar vacio",
    customError:"Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
  },
  direccion: {
    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"La direccion debe contener entre 10 a 40 caracteres"
  },
  ciudad: {
    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"La ciudad debe contener entre 4 a 30 caracteres"
  },
  estado: {
    valueMissing:"Este campo no puede estar vacio",
    patternMismatch:"El estado debe contener entre 4 a 30 caracteres"
  }
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = ""
  tipoDeErrores.forEach(error => {
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error]
    }
  })
  return mensaje
}

function validarNacimiento(input) {
  //recibe el input como parametro
  const fechaCliente = new Date(input.value); //Valor de la fecha que pone el usuario en el input
  let mensaje = ""; //Mensaje vacio
  if (!mayorDeEdad(fechaCliente)) {
    //se comprueba si el usuario tiene 18 años llamando a la función mayorDeEdad y si NO ES ASI, sale un mensaje de error a la variable mensaje.
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje); //se utiliza el método setCustomValidity para establecer el mensaje de error personalizado en el input.
}

function mayorDeEdad(fecha) {
  //recibe un objeto Date como parámetro
  const fechaActual = new Date(); //Se crea un objeto Date que representa la fecha actual
  const diferenciaFechas = new Date( //se calcula una fecha que representa el momento en que el usuario cumplirá 18 años
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual; //se compara esa fecha con la fecha actual y se devuelve true si el usuario tiene al menos 18 años y false si no es así.
}
