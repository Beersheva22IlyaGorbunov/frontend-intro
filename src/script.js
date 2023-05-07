const HIDDEN = 'hidden'
const POINT = 'point'

const thumbnails = document.querySelectorAll('.thumbnails-anchor')
const detailImg = document.querySelector('.details-img')
const detailTitle = document.querySelector('.details-title')
const detailSection = document.querySelector('.details-section')

const handleItemClick = (item) => {
  const url = item.dataset.detailsImage
  const title = item.dataset.detailsText
  setDetailImg(url, title)
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => handleItemClick(thumbnails[index]))
})

const setDetailImg = (url, title) => {
  detailImg.src = url
  detailTitle.innerHTML = title
  showDetails()
}

const showDetails = () => {
  detailSection.classList.remove(HIDDEN)
  detailSection.classList.add(POINT)
  // setTimeout(() => {
    detailSection.classList.remove(POINT)
  // }, 0)
}

const hideDetails = () => {
  detailSection.classList.add(HIDDEN)
}
