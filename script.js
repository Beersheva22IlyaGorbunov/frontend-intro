const thumbnails = document.querySelectorAll('.thumbnails-item')

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', (e) => console.log(e))
})