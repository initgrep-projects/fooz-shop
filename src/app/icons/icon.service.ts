import { Injectable } from '@angular/core';

import {
  IconDefinition,
  faAtom,
  faBolt,
  faShoppingBag,
  faPhoneAlt,
  faSearch,
  faUserCircle,
  faCircleNotch,
  faBookmark,
  faHeart,
  faStar,
  faArrowCircleDown,
  faArrowAltCircleDown,
  faBoxOpen,
  faMapMarkerAlt,
  faFilter,
  faSort,
  faLevelDownAlt,
  faTape,
  faLayerGroup,
  faShoppingCart,
  faDotCircle,
  faTeethOpen,
  faDoorOpen,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faArrowsAltH,
  faArrowsAltV,
  faStop,
  faStopCircle,
  faChevronRight,
  faCheck,
  faHandPointDown,
  faTimesCircle,
  faCircle,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  icons: IconDefinition[] = [];

  constructor() {
    this.icons = [
      faAtom,
      faBolt,
      faShoppingBag,
      faPhoneAlt,
      faSearch,
      faUserCircle,
      faCircleNotch,
      faBookmark,
      faHeart,
      faStar,
      faArrowCircleDown,
      faArrowAltCircleDown,
      faBoxOpen,
      faMapMarkerAlt,
      faFilter,
      faSort,
      faLevelDownAlt,
      faTape,
      faLayerGroup,
      faShoppingCart,
      faDotCircle,
      faTeethOpen,
      faDoorOpen,
      faLongArrowAltUp,
      faLongArrowAltDown,
      faArrowsAltH,
      faArrowsAltV,
      faLayerGroup,
      faStop,
      faStopCircle,
      faChevronRight,
      faCircleNotch,
      faCheck,
      faHandPointDown,
      faTimesCircle,
      faCircle,
      faPlus,
      faMinus
    ];
   }

   getImportedIcons(): IconDefinition[] {
     return this.icons;
   }
}
