import '../src/css/styles.css';
import ImageApiSrvice from './js/api-service';
import imgCardTpl from './tamplate/img-card.hbs';
import LoadMoreBtn from './js/components/load-more-btn'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './js/get-refs';

const imageApiService = new ImageApiSrvice();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hiddden: true
})

const refs = getRefs();

refs.searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onFatchData);


async function onSearchFormSubmit(event) {
  event.preventDefault();

  imageApiService.input = event.currentTarget.elements.searchQuery.value.trim();
  event.currentTarget.reset();
  if (!imageApiService.input) {
    clearGalleryContainer();
    return Notify.failure("Please enter a valid string!")
  }

  loadMoreBtn.show();
  const dataAcquisition = await imageApiService.fetchImageFromDb();
  console.log(dataAcquisition);

  if (dataAcquisition.hits.length === 0) {
    imageApiService.resetPage();
    clearGalleryContainer();
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } else {
    imageApiService.resetPage();
    clearGalleryContainer();
    renderImgCard(dataAcquisition);
    loadMoreBtn.enable();
  }
}

async function onFatchData(data) {
  loadMoreBtn.disable()
  imageApiService.decrementPage()

  const additionalData = await imageApiService.fetchImageFromDb()
  renderImgCard(additionalData);
  loadMoreBtn.enable()
  if(additionalData.hits.length === 0 || !imageApiService.input) {
    loadMoreBtn.hide();
    imageApiService.resetPage();
    return Notify.failure("We're sorry, but you've reached the end of search results.")
  }
  imageApiService.resetPage();
}

function renderImgCard(data) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(data))
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}




// const fn = async function() {

// }

// const arr = async () => {}

// const x = {
//   async getName () {}
// }

// class X {
//   async getName () {

//   }
// }
