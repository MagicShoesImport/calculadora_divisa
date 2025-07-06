
function init() {

 listar();
    $("#formularioREG_EDIT").on("submit", function(e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        guardaryeditar(e);
    });
    //================================================================//

    //================================================================//
}


function limpiar()
{

  $("#tasabcv").val("");
   $("#tasa_cambio").val("");
    $("#tasaventa").val("");
 $("#diferenciabs").val("");
  $("#brecha_porcentaje").val("");
   $("#cant_comprado").val("");
     $("#resultado1").val("");
      $("#cant_bs_comprado").val("");
       $("#resultado2").val("");
        $("#banco").val("");
         $("#porcentaje_total").val("");
          $("#tasa_final_compra").val("");
           $("#dolares_final_recibido").val("");
            $("#bs_final_inv").val("");
            $("#resultado3").val("");


  $("#metodo_retiro").val("").trigger("change");


}





function CalcularDiferencia() {
 var tasabcv = document.getElementById('tasabcv').value.replace('.', '');
var metodo_retiro = document.getElementById('metodo_retiro').value.replace('.', '');
var tasaventa = document.getElementById('tasaventa').value.replace('.', '');
var tasa_cambio = document.getElementById('tasa_cambio').value.replace('.', '');

// Obtener el valor del select de banco
var metodo_retiro_bancario = document.getElementById('metodo_retiro_bancario').value;
var porcentaje_banco = 0;

// Si hay un valor seleccionado, convertirlo a número
if (metodo_retiro_bancario) {
    porcentaje_banco = parseFloat(metodo_retiro_bancario.replace(',', '.'));
}

// Convertir todos los valores a números flotantes
tasabcv = parseFloat(tasabcv.replace(',', '.'));
tasaventa = parseFloat(tasaventa.replace(',', '.'));
tasa_cambio = parseFloat(tasa_cambio.replace(',', '.'));
metodo_retiro = parseFloat(metodo_retiro.replace(',', '.'));

// Calcular el porcentaje base
var porcentaje = (metodo_retiro / 100) * tasabcv;

// Sumar el porcentaje del banco seleccionado
porcentaje += (porcentaje_banco / 100) * tasabcv;

var tasaFinal = tasabcv + porcentaje;

if (!isNaN(tasa_cambio)) {
    var diferenciaTasaCambio = (tasa_cambio - 1) * 100;
    var sumadetasa = diferenciaTasaCambio + metodo_retiro;
    
    // Sumar el porcentaje del banco aquí también para mantener consistencia
    sumadetasa += porcentaje_banco;
    
    resultado1 = (sumadetasa / 100) * tasabcv;
    var tasaFinal = tasabcv + resultado1;
}

    if (tasaventa > tasaFinal) {
      var porcentaje_retiro = ((tasaFinal - tasabcv) / tasabcv) * 100;
        var resultadoFinal = tasaventa - tasaFinal;
        var porcentajeResultado = (resultadoFinal / tasabcv) * 100;
  document.getElementById('diferenciabs').value = resultadoFinal.toFixed(2).toString().replace(".", ","); // Muestra el resultado con 2 decimales
    document.getElementById('brecha_porcentaje').value = porcentajeResultado.toFixed(2).toString().replace(".", ","); // Muestra el resultado con 2 decimales
         document.getElementById('porcentaje_total').value = porcentaje_retiro.toFixed(2).toString().replace(".", ","); 
         document.getElementById('tasa_final_compra').value = tasaFinal.toFixed(2).toString().replace(".", ","); 

        // Crear inputs para mostrar resultados
       /* var resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

        // Crear y agregar los inputs
        resultadosDiv.innerHTML += 
              ` <input type="number" name="resultadoInput" id="resultadoInput" 
            class="form-control" placeholder="" maxlength="30" value="${resultadoFinal.toFixed(2)}"  readonly >
            <input type="number" name="porcentajeResultado" id="porcentajeResultado" 
            class="form-control" placeholder="" maxlength="30" value="${porcentajeResultado.toFixed(2)}" readonly>
         `; */
    } else {
        alert("Error: tasaventa no es mayor que la tasa final.");
    }
}


function CalcularGanancia() {
  var cant_comprado = document.getElementById('cant_comprado').value.replace('.', ''); // Remueve el punto
var cant_bs_comprado = document.getElementById('cant_bs_comprado').value.replace('.', ''); // Remueve el punto
var porcentajeResultado = document.getElementById('brecha_porcentaje').value.replace('.', '');

cant_comprado = parseFloat(cant_comprado.replace(',', '.'));
cant_bs_comprado = parseFloat(cant_bs_comprado.replace(',', '.'));
porcentajeResultado = parseFloat(porcentajeResultado.replace(',', '.'));
    
    // Calcular la ganancia
    var ganancia = (cant_comprado * porcentajeResultado) / 100;

      // Calcular la ganancia bs
    var gananciabs = (cant_bs_comprado * porcentajeResultado) / 100;
    
    // Mostrar el resultado en un input
    document.getElementById('resultado1').value = ganancia.toFixed(2).toString().replace(".", ",");// Muestra el resultado con 2 decimales
    document.getElementById('resultado2').value = gananciabs.toFixed(2).toString().replace(".", ","); // Muestra el resultado con 2 decimales
}


function CalcularInvRecibido() {
var cant_comprado = document.getElementById('cant_comprado').value.replace('.', ''); // Remueve el punto
var cant_bs_comprado = document.getElementById('cant_bs_comprado').value.replace('.', ''); // Remueve el punto
var porcentaje_total = document.getElementById('porcentaje_total').value.replace('.', ''); // Remueve el punto

cant_comprado = parseFloat(cant_comprado.replace(',', '.'));
cant_bs_comprado = parseFloat(cant_bs_comprado.replace(',', '.'));
porcentaje_total = parseFloat(porcentaje_total.replace(',', '.'));

    
    // Calcular  $ recibido 
    var resultado = (cant_comprado * porcentaje_total) / 100;
   dolaresrecibido = cant_comprado - resultado;


    
    // Calcular  $ recibido 
    var resultadobs = (cant_bs_comprado * porcentaje_total) / 100;
    bsfinalinv = cant_bs_comprado - resultadobs;

    
    
    // Mostrar el resultado en un input
    document.getElementById('dolares_final_recibido').value = dolaresrecibido.toFixed(2).toString().replace(".", ",");// Muestra el resultado con 2 decimales
    document.getElementById('bs_final_inv').value = bsfinalinv.toFixed(2).toString().replace(".", ","); // Muestra el resultado con 2 decimales
}


function CalcularGanancia() {
  var dolares_final_recibido = document.getElementById('dolares_final_recibido').value.replace('.', ''); // Remueve el punto
var tasaventa = document.getElementById('tasaventa').value.replace('.', ''); // Remueve el punto
var cant_bs_comprado = document.getElementById('cant_bs_comprado').value.replace('.', '');

dolares_final_recibido = parseFloat(dolares_final_recibido.replace(',', '.'));
tasaventa = parseFloat(tasaventa.replace(',', '.'));
cant_bs_comprado = parseFloat(cant_bs_comprado.replace(',', '.'));
    
  var bsgananciarecibido= (dolares_final_recibido *  tasaventa) - cant_bs_comprado  ;  


porcentajetotalganancianeta = (bsgananciarecibido / cant_bs_comprado ) * 100 ;

dolaresganancianeto = (dolares_final_recibido * porcentajetotalganancianeta ) / 100;

    // Mostrar el resultado en un input
    document.getElementById('resultado1').value = porcentajetotalganancianeta.toFixed(2).toString().replace(".", ",");// Muestra el resultado con 2 decimales
    document.getElementById('resultado2').value = dolaresganancianeto.toFixed(2).toString().replace(".", ","); // Muestra el resultado con 2 decimales
    document.getElementById('resultado3').value = bsgananciarecibido.toFixed(2).toString().replace(".", ","); // Muestra el resultado con 2 decimales
}


function mostrarTasaCambio() {
    const metodoSeleccionado = document.getElementById('metodo_retiro').value;
    const tasaCambioContainer = document.getElementById('tasaCambioContainer');

    if (metodoSeleccionado === '3,1' || metodoSeleccionado === '3,8') {
      tasaCambioContainer.style.display = 'block';
    } else {
      tasaCambioContainer.style.display = 'none';
    }
  }


function guardaryeditar(e) {


//----------------------------------------------------------------//

  e.preventDefault(); // No se activará la acción predeterminada del evento
  $("#btnGuardar").prop("disabled", true);

  var formData = new FormData($("#formularioREG_EDIT")[0]);

  $.ajax({
    url: "../ajax/diferencia_cambiaria.php?op=guardaryeditar&r=" + new Date().getTime(),
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function(data) {
        Swal.fire({
            title: 'Resultado',
            text: data, 
            icon: 'success',
            showConfirmButton: false,
            timer: 1300 // Tiempo antes de cerrar automáticamente
        }).then(() => {
           limpiar();
             var table = $('#datatable').DataTable(); // Reemplaza '#tuTabla' con el selector de tu tabla
            table.ajax.reload(); // Recarga la tabla
             $("#btnGuardar").prop("disabled", false);
        });
    },
    error: function() {
        loadingDialog.close(); // Cerrar el diálogo de loading
        Swal.fire({
            title: 'Error',
            text: "Error en la petición.",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
  });
}


function validar_form() {


// Obtener el elemento del input
const tasabcv = document.getElementById('tasabcv');

// Agregar un event listener para el evento 'input'
tasabcv.addEventListener('input', () => {
    // Obtener el valor actual del input
    const tasaBCV= tasabcv.value;

    // Validar si la longitud es mayor a la permitida
    if (tasaBCV.length > 20) {
        tasabcv.value = tasaBCV.slice(0, 20);
    }

        // Validar si contiene caracteres no numéricos
    if (!/^\d+$/.test(tasaBCV)) {
        tasabcv.value = tasaBCV.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    }
});


// Obtener el elemento del input
const tasa_cambio = document.getElementById('tasa_cambio');

// Agregar un event listener para el evento 'input'
tasa_cambio.addEventListener('input', () => {
    // Obtener el valor actual del input
    const tasaCambio= tasa_cambio.value;

    // Validar si la longitud es mayor a la permitida
    if (tasaCambio.length > 20) {
        tasa_cambio.value = tasaCambio.slice(0, 20);
    }

        // Validar si contiene caracteres no numéricos
    if (!/^\d+$/.test(tasaCambio)) {
        tasa_cambio.value = tasaCambio.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    }
});


// Obtener el elemento del input
const tasaventa = document.getElementById('tasaventa');

// Agregar un event listener para el evento 'input'
tasaventa.addEventListener('input', () => {
    // Obtener el valor actual del input
    const tasaVenta= tasaventa.value;

    // Validar si la longitud es mayor a la permitida
    if (tasaVenta.length > 20) {
        tasaventa.value = tasaVenta.slice(0, 20);
    }

        // Validar si contiene caracteres no numéricos
    if (!/^\d+$/.test(tasaVenta)) {
        tasaventa.value = tasaVenta.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    }
});


// Obtener el elemento del input
const cant_comprado = document.getElementById('cant_comprado');

// Agregar un event listener para el evento 'input'
cant_comprado.addEventListener('input', () => {
    // Obtener el valor actual del input
    const cantComprado= cant_comprado.value;

    // Validar si la longitud es mayor a la permitida
    if (cantComprado.length > 20) {
        cant_comprado.value = cantComprado.slice(0, 20);
    }

        // Validar si contiene caracteres no numéricos
    if (!/^\d+$/.test(cantComprado)) {
        cant_comprado.value = cantComprado.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    }
});


// Obtener el elemento del input
const cant_bs_comprado = document.getElementById('cant_bs_comprado');

// Agregar un event listener para el evento 'input'
cant_bs_comprado.addEventListener('input', () => {
    // Obtener el valor actual del input
    const cantbsComprado= cant_bs_comprado.value;

    // Validar si la longitud es mayor a la permitida
    if (cantbsComprado.length > 20) {
        cant_bs_comprado.value = cantbsComprado.slice(0, 20);
    }

        // Validar si contiene caracteres no numéricos
    if (!/^\d+$/.test(cantbsComprado)) {
        cant_bs_comprado.value = cantbsComprado.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    }
});

 }

  

 function listar(){ 

        var tabla;
        tabla = $('#datatable').dataTable({
                language: {
                processing:     "Tratamiento en curso...",
                search:         "Buscar:" ,
                lengthMenu:    "Filtro de _MENU_ registros",
                info:           "Mostrando de _START_ al _END_ de un total de _TOTAL_ ",
                infoEmpty:      "No existen registros",
                infoFiltered:   "(filtrado de _MAX_ registros en total)",
                infoPostFix:    "",
                loadingRecords: "Cargando elementos...",
                zeroRecords:    "No se encontraron los datos de tu busquda..",
                emptyTable:     "No hay ningun registro en la tabla",
                paginate: {
                    first:      "Primero",
                    previous:   "Anterior",
                    next:       "Siguiente",
                    last:       "Ultimo"
                },
                aria: {
                    sortAscending:  ": Active para odernar en modo ascendente",
                    sortDescending: ": Active para ordenar en modo descendente  ",
                }
            },
            buttons: [
                //'copyHtml5',
                'excelHtml5',
                'pdf'
                ],

            "ajax": {


                url: '../ajax/diferencia_cambiaria.php?op=buscar&r=' + new Date().getTime(),
                type: "POST",
                dataType: "json",
                    error: function (xhr, status, error) {
       //console.log("Error en la llamada AJAX:", status); // Estado de la llamada
       //console.log("Detalles del error:", error); // Detalles del error
       //console.log("Respuesta del servidor:", xhr.responseText); // Respuesta del servidor
       //alert("Error: " + xhr.responseText);
   }
   
    
            },
            "autoWidth": false,//hacer datatable responsive
            "responsive": true,//hacer datatable responsive
            "bDestroy": true,
            "iDisplayLength": 10, //Paginación
            "order": [
                [0, "asc"]
            ] //Ordenar (columna,orden)
        });
      
    }



      function eliminar(id_diferencia) {
    Swal.fire({
        title: '¡Atención!',
        text: '¿Realmente está seguro de eliminar este registro?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: '<i class="fa fa-arrow-circle-left"></i> Cancelar',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger'
        }
    }).then((result1) => {
        if (result1.value) {
            $.post("../ajax/diferencia_cambiaria.php?op=eliminar&r=" + new Date().getTime(), {
                id_diferencia: id_diferencia
                
            }).done(function(data) {
                if (data === "No se pudo eliminar") {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al eliminar historial',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Resultado',
                        text: data,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1300 // Tiempo antes de cerrar automáticamente
                    }).then(() => {
                        location.reload(); // Recargar la página
                    });
                }
            });
        } else {
            // else de result1
        }
    });
}

  
init();