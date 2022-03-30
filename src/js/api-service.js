const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25737167-0db4b813879a604136ea7d639';

export default class ImageApiService {
  constructor() {
    this.inputValue = '';
    this.page = 1;
  }

  async fetchImageFromDb() {
    console.log(this);
    const url = `${BASE_URL}?key=${KEY}&q=${this.inputValue}&lang=en&per_page=40&page=${this.page}&
    image_type="photo&orientation=horizontal&safesearch=true"`;
    
    try {
      const response = await axios.get(url);
      const data = await response.data;

      return data;
    }catch (error) {
      console.log(error);
    }     
  }

  decrementPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 1;
  }

  get input() {
    return this.inputValue;
  }

  set input(newInput) {
    this.inputValue = newInput;
  }
}

