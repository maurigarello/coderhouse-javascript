
//** cargo localstorage */

function validarFormulario() {
	let data = localStorage.getItem("datosGuardados")
		? JSON.parse(localStorage.getItem("datosGuardados"))
		: [];
	let formData = {
		email: document.getElementById("uEmail").value,
		password: document.getElementById("uPassword").value,
		confirmpassword: document.getElementById("confirmPassword").value,
	};

	data.push(formData);

	if (localStorage) {
		localStorage.setItem("datosGuardados", JSON.stringify(data));
	}
}

//** Verifico coincidencia de password */

function verificarPassword(input) {
	if (input.value != document.getElementById("uPassword").value) {
		input.setCustomValidity("El password no coincide");
	} else {
		input.setCustomValidity("");
	}
}

//** Verifico usuario ya registrado */

function verificarEmail(value) {
	let existemail = JSON.parse(localStorage.getItem("datosGuardados"));

	let emailid = existemail.map((email, i, existemail) => {
		return existemail[i].email;
	});

	let getexistemail = emailid.filter((email) => {
		if (email == value.value) {
			value.setCustomValidity("el usuario ya se encuentra registrado");
		} else {
			value.setCustomValidity("");
		}
	});
}

//** Funcionalidad de mostrar y ocultar */

const form = document.getElementById("formulario_registro");
form.addEventListener("submit", function (e) {
	e.preventDefault();
	form.reset();
	document.getElementById("usuarioRegistrado").style.display = "block";
	document.getElementById("formularioRegistro").style.display = "none";
});

function mostrarOcultar(mostrar, ocultar) { 
	let mostrarElemento = document.getElementById(mostrar);
	let ocultarElemento = document.getElementById(ocultar);
	mostrarElemento.style.display = "block";
	ocultarElemento.style.display = "none";
}

//** Login y acceso a la web */

function loginUser() {
	localStorage.removeItem("mailActual"); 
	let loginEmail = document.getElementById("uemailId").value;
	let loginPass = document.getElementById("ePassword").value;
	let matchEmail = JSON.parse(localStorage.getItem("datosGuardados"));
	let emailArray = [];
	let passArray = [];

	const result = matchEmail.map((email, i, matchEmail) => {
		emailArray.push(matchEmail[i].email);
		passArray.push(matchEmail[i].password);
	});

	if (emailArray.indexOf(loginEmail) > -1 && passArray.indexOf(loginPass) > -1) {
		localStorage.setItem("mailActual", loginEmail);
		Swal.fire({
			icon: 'success',
			title: 'Login Exitoso!',
			showConfirmButton: false,
			timer: 1500
		  });
		  setTimeout(()=> {
			window.location.href = "../index.html";
		  }, "2000");
	} else {
		Swal.fire({
			icon: 'warning',
			title: 'Los datos de usuario son incorrectos, por favor verifique los datos o regístrese',
			showConfirmButton: false,
			timer: 2000
		  });
		  setTimeout(()=> {
			mostrarOcultar("formularioRegistro", "logIn");
		  }, "2000");
	}
}

const loginForm = document.getElementById("logIn");
loginForm.addEventListener("submit", function (e) {
	e.preventDefault();
});