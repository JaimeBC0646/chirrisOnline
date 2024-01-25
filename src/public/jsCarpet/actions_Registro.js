/*-----| FUNCIONES PARA VALIDACION DEL REGISTRO |-----*/


/*VALIDACION: Confirmar contraseña */
function validatePasswords(pass1, pass2) {
    var pass1 = document.getElementById("txtPassword");
    var pass2 = document.getElementById("txtConfirmPassword");
    // Verificamos si las constraseñas NO coinciden 
    if (pass1.value =='' && pass2.value=='') {
        // Mensaje de contraseñas distitntas
        document.getElementById("warningPass").setAttribute("hidden");

        // Desabilitamos el botón de login
        document.getElementById("btnRegistro").disabled = false;

        return false;
    }
    else if (pass1.value != pass2.value) {
        // Mensaje de contraseñas distitntas
        document.getElementById("warningPass").removeAttribute("hidden");

        // Desabilitamos el botón de login
        document.getElementById("btnRegistro").disabled = true;
        return false;
    }
    else
    {
        // Oculatamos el label y desabilitamos el botón de login
        var passLabel = document.getElementById("warningPass");
        passLabel.setAttribute('hidden',true);

        document.getElementById("btnRegistro").disabled = false;

        // Si las contraseñas coinciden ocultamos el mensaje de error
        return true;
    }
 
}




/*VALIDACION COMPLETA: Funcion que obtiene los datos y llama a otras funciones*/
function validateRegistration(){
    var name = document.getElementById("txtNombre");
    var app = document.getElementById("txtApepat");
    var apm = document.getElementById("txtApemat");
    var email = document.getElementById("txtCorreo");
    var tel = document.getElementById("txtTelefono");
    var user = document.getElementById("txtUsuario");
    var pass1 = document.getElementById("txtPassword");
    var pass2 = document.getElementById("txtConfirmPassword");
    var sexo = document.getElementById("rdbSexo");

    if(validatePasswords(pass1,pass2)){
        return true
    }
    return false

}

/*VALIDACION: Campos vacios */
function validateInputs(){
    //name,app,apm,email,tel,user,pass1,pass2,question,resp
    var name = document.getElementById("txtNombre");
    var app = document.getElementById("txtApepat");
    var apm = document.getElementById("txtApemat");
    var email = document.getElementById("txtCorreo");
    var tel = document.getElementById("txtTelefono");
    var user = document.getElementById("txtUsuario");
    var pass1 = document.getElementById("txtPassword");
    var pass2 = document.getElementById("txtConfirmPassword");
    var sexo = document.getElementById("rdbSexo");

    if ((name.value=='' && app.value=='' && apm.value=='' && email.value=='' && tel.value=='' && user.value=='' && pass1.value=='' && pass2.value=='' && sexo.value=='')){
        // Mensaje de Campos vacios o incompletos    
        document.getElementById("msgVoidInputs").classList.add("mostrar");
        document.getElementById("msgVoidInputs2").classList.remove("mostrar");
        return false;
    }
    else if(name.value=='' || app.value=='' || apm.value=='' || email.value=='' || tel.value=='' || user.value=='' || pass1.value=='' || pass2.value=='' || question.value=='0' || resp.value==''){
        // Remover el mensaje de validacion de campos
        document.getElementById("msgVoidInputs").classList.remove("mostrar");
        document.getElementById("msgVoidInputs2").classList.add("mostrar");
        return false;
    }
    document.getElementById("msgVoidInpputs").classList.remove("mostrar");
    document.getElementById("msgVoidInuts2").classList.remove("mostrar");
    return true;
}

function validateUser(){
    
}





/*VALIDACION: Confirmar contraseña */
function validateEmail(email){
    var email = document.getElementById('txtcorreo');
    /*var validEmail= /^[a-zA-Z0-9.!#$%&'+/=?^_`*+@[a-zA-Z0-9]+(?:.[a-zA-Z0-9-]+)*$/;*/
    var validEmail= /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(email.value.match(validEmail)){
        document.getElementById("msgEmailError").classList.add("mostrar");
        return true;
    }
    else{
        document.getElementById("msgEmailError").classList.remove("mostrar");
        return false;
    }
}