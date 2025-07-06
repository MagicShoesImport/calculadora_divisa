<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diferencia Cambiaria</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #fff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: rgba(36, 52, 67, 0.9);
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        }

        .card {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-header {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        input, select {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            background-color: rgba(0, 0, 0, 0.2);
            color: white;
            font-size: 1rem;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
        }

        button {
            padding: 12px 18px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }

        .btn-primary {
            background-color: #4a90e2;
            color: white;
        }

        .btn-primary:hover {
            background-color: #357abd;
        }

        .btn-danger {
            background-color: #e74c3c;
            color: white;
        }

        .btn-danger:hover {
            background-color: #c0392b;
        }

        .btn-success {
            background-color: #2ecc71;
            color: white;
        }

        .btn-success:hover {
            background-color: #27ae60;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
        }

        .form-group {
            flex: 1;
            min-width: 200px;
            padding: 0 15px;
            margin-bottom: 25px;
        }

        hr {
            border: none;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
            margin: 30px 0;
        }

        /* Estilos para los inputs con símbolo de moneda */
        .input-container {
            position: relative;
            margin-bottom: 20px;
        }

        .currency-symbol {
            position: absolute;
            left: 12px;
            top: 12px;
            pointer-events: none;
            color: #aaa;
        }

        .input-container input {
            padding-left: 35px;
        }

        /* Estilo para los resultados */
        #resultados {
            width: 100%;
            padding: 15px;
            margin-bottom: 25px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <span>Diferencia Cambiaria</span>
                <button class="btn-danger" onclick="limpiar();">
                    <i class="fa fa-eraser"></i> Limpiar
                </button>
            </div>

            <form role="form" name="formularioREG_EDIT" id="formularioREG_EDIT" method="POST">
                <input type="hidden" name="id_diferencia" id="id_diferencia" readonly>
                
                <div class="row">
                    <div class="form-group">
                        <label>Tasa BCV</label>
                        <div class="input-container">
                            <span class="currency-symbol">Bs.</span>
                            <input type="text" name="tasabcv" id="tasabcv" onpaste="manejarPegado(event)"  onkeypress="return permitirComas(event)">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Banco a retirar</label>
                        <select name="metodo_retiro_bancario" id="metodo_retiro_bancario">
                            <option value="">Seleccione el Metodo de Retiro Bancario</option>
                            <option value="0,0">Banesco</option>
                            <option value="1,25">Bancamiga</option>
                            <option value="1,5">BNC/Bco.Tesoro</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Metodo de Retiro</label>
                        <select name="metodo_retiro" id="metodo_retiro" onchange="mostrarTasaCambio()">
                            <option value="">Seleccione el Metodo de Retiro</option>
                            <option value="3,1">Wally</option>
                            <option value="3,8">Zinli</option>
                            <option value="6,3">Kontigo</option>
                            <option value="3,81">Efectivo</option>
                        </select>
                    </div>
                    
                    <div class="form-group" id="tasaCambioContainer" style="display: none;">
                        <label>Tasa de Cambio</label>
                        <div class="input-container">
                            <span class="currency-symbol">$</span>
                            <input type="text" name="tasa_cambio" id="tasa_cambio" onpaste="manejarPegado(event)" onkeypress="return permitirComas(event)">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Tasa de Venta $</label>
                        <div class="input-container">
                            <span class="currency-symbol">$</span>
                            <input type="text" name="tasaventa" id="tasaventa" onpaste="manejarPegado(event)" onkeypress="return permitirComas(event)">
                        </div>
                    </div>
                    
                    <div class="form-group" style="display: flex; align-items: flex-end;">
                        <button type="button" class="btn-primary" onclick="CalcularDiferencia()">Calcular Diferencia</button>
                    </div>
                </div>
                
                <div id="resultados"></div>
                
                <div class="row">
                    <div class="form-group">
                        <label>% Total de Retiro</label>
                        <input type="text" name="porcentaje_total" id="porcentaje_total" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Tasa Final Compra</label>
                        <input type="text" name="tasa_final_compra" id="tasa_final_compra" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Diferencia en Bs</label>
                        <input type="text" name="diferenciabs" id="diferenciabs" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Brecha Profit en %</label>
                        <input type="text" name="brecha_porcentaje" id="brecha_porcentaje" readonly>
                    </div>
                </div>
                
                <hr>
                
                <div class="row">
                    <div class="form-group">
                        <label>Cant $ Comprados</label>
                        <div class="input-container">
                            <span class="currency-symbol">$</span>
                            <input type="text" name="cant_comprado" id="cant_comprado" onpaste="manejarPegado(event)" onkeypress="return permitirComas(event)">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Cant Bs Invertidos</label>
                        <div class="input-container">
                            <span class="currency-symbol">Bs.</span>
                            <input type="text" name="cant_bs_comprado" id="cant_bs_comprado" onpaste="manejarPegado(event)" onblur="CalcularInvRecibido()" onkeypress="return permitirComas(event)">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>$ Final Recibido</label>
                        <input type="text" name="dolares_final_recibido" id="dolares_final_recibido" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Bs Final Inv en $</label>
                        <input type="text" name="bs_final_inv" id="bs_final_inv" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Brecha % Profit Neto</label>
                        <input type="text" name="resultado1" id="resultado1" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Ganancias en $</label>
                        <input type="text" name="resultado2" id="resultado2" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label>Ganancias en Bs</label>
                        <input type="text" name="resultado3" id="resultado3" readonly>
                    </div>
                    
                    <div class="form-group" style="display: flex; align-items: flex-end;">
                        <button type="button" class="btn-success" onclick="CalcularGanancia()">Calcular Ganancia</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script>
    // Función para permitir comas en los campos numéricos
    function permitirComas(event) {
        const charCode = (event.which) ? event.which : event.keyCode;
        // Permitir números (48-57), coma (44), backspace (8), tab (9), enter (13), izquierda (37), derecha (39)
        if (charCode === 44 || (charCode >= 48 && charCode <= 57) || charCode === 8 || charCode === 9 || charCode === 13 || (charCode >= 37 && charCode <= 39)) {
            return true;
        }
        return false;
    }
    </script>

  
    <script type="text/javascript" src="diferencia_cambiaria.js<?php echo '?r='.date('Y-m-d H:i:s');?>"></script>

    <?php 
    ob_end_flush();
    ?>
</body>
</html>
