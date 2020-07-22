// import Swiper from "swiper";
// import "swiper/swiper-bundle.min.css";
import Swiper from "Swiper";
import "normalize.css";
import "../scss/index.scss";
import "../scss/swiper-bundle.min.css";

let swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination'
  },
});
