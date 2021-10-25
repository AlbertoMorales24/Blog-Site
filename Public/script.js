(() => {
    'use strict';
  
    
    const forms = document.querySelectorAll('.needs-validation');
  
    
    Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
})();

window.onload = function(){
  const array = document.getElementsByClassName("index");
  for(var j=0;j<array.length;j++){
    array[j].value = j;
    
  }
}


