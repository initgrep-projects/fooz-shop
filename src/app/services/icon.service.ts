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
  faTimes,
  faCircle,
  faPlus,
  faMinus,
  faBars,
  faExclamationCircle,
  faWindowMaximize,
  faStore,
  faInfoCircle,
  faHeadset,
  faTruck,
  faSpinner,
  faLongArrowAltRight,
  faTruckLoading,
  faAddressBook
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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
      faTimes,
      faCircle,
      faPlus,
      faMinus,
      faBars,
      faExclamationCircle,
      faGoogle,
      faWindowMaximize,
      faStore,
      faInfoCircle,
      faHeadset,
      faTruck,
      faSpinner,
      faLongArrowAltRight,
      faTruckLoading,
      faAddressBook
    ];
   }

   getImportedIcons(): IconDefinition[] {
     return this.icons;
   }
}
