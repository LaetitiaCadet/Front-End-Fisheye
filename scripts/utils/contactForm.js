const inputFirstName = document.getElementById('first');
const inputLastName = document.getElementById('last');
const inputEmail = document.getElementById('email');
const textArea = document.getElementById('textarea')


function inputValue (dataInput) {
   dataInput.addEventListener('input', function (){
      dataInput.value.trim();
   })

   return dataInput.value
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[A-Za-z_-]{2,30}$/;

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const first = document.getElementById('first');
    modal.style.display = "block";
    first.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function checkEntry(input, regex, errorId, errorMsg) {
    let errorTag = document.getElementById(errorId);
    // trim() permet d'éviter à l'utilisateur d'ajouter des espaces dans le input qui est considéré comme un charactère
    let value = input.value.trim();
    if(regex.test(value)){
      errorTag.textContent = "";
      input.style.borderColor = "green";
      input.style.borderWidth = "2px";
      return true;  
    } else {
      errorTag.textContent = errorMsg; 
      input.style.borderColor = "#FF4E60";
      input.style.borderWidth = "2px";
      errorTag.style.color = "#FF4E60";
      errorTag.style.fontSize = "12px";
      return false;
    }
   
  }


function validate (event){
    event.preventDefault();
    const isFirstNameValid = checkEntry(inputFirstName, nameRegex, 'prenom-error', 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    const isLastNameValid = checkEntry(inputLastName, nameRegex, 'nom-error', 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    const isEmailValid = checkEntry(inputEmail, emailRegex, 'email-error', " l'Email utiliser n'est pas valide.");
    if(isFirstNameValid && isLastNameValid && isEmailValid){
      console.log({
        prenom: inputValue(inputFirstName),
        nom: inputValue(inputLastName),
        email: inputValue(inputEmail),
        message: inputValue(textArea)
      });
      closeModal()
    }
}