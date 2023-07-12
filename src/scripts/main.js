import '../styles/style.css';
import '../styles/home.css';
import '../styles/privacy-pages.css';
import '../styles/articles.css';

import {
  setCurrentYearLabel,
  populateHiddenInputFields,
  mountOnResizeListener,
  saveCampaignUtmPatameters,
} from './global/globalFunctions';

document.addEventListener('DOMContentLoaded', () => {
  setCurrentYearLabel();
  populateHiddenInputFields();
  mountOnResizeListener();
  saveCampaignUtmPatameters();
});
