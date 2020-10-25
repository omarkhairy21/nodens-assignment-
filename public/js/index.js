const signUpBtn = document.querySelector('.ui.primary.button');
$('.ui.basic.modal').modal()
signUpBtn.addEventListener('click', 
  () => {
    console.log("Clicked")
    $('.ui.basic.modal').modal('show')
  }
)
