import { library } from '@fortawesome/fontawesome-svg-core'

// Import dari PRO packages
import { 
  faHome as faHomeLight,
  faBook as faBookLight,
} from '@fortawesome/pro-light-svg-icons'

import {
  faCode as faCodeRegular,
  faSidebar as faSidebarRegular,
  faFile as faFileRegular,
  faBookOpen as faBookOpenRegular,
  faBug as faBugRegular,
  faLightbulb as faLightbulbRegular,
  faHand as faHandRegular,
  faQuestion as faQuestionRegular,
  faMessage as faMessageRegular,
  faSearch as faSearchRegular,
  faRefresh as faRefreshRegular,
  faSparkle as faSparkleRegular,
  faChevronDown as faChevronDownRegular,
  faArrowRight as faArrowRightRegular,
  faCube as faCubeRegular,
  faCalendar as faCalendarRegular,
  faXmark as faXmarkRegular,
  faArrowLeft as faArrowLeftRegular,
} from '@fortawesome/pro-regular-svg-icons'

import { 
  faHome as faHomeSolid,
  faHeart as faHeartSolid,
  faHand as faHandSolid,
  faCode as faCodeSolid,
  faQuestion as faQuestionSolid,
  faMessage as faMessageSolid,
  faGripLinesVertical as faGripLinesVerticalSolid,
  faInfoCircle as faInfoCircleSolid,
} from '@fortawesome/pro-solid-svg-icons'

import { 
  faHome as faHomeDuotone,
} from '@fortawesome/pro-duotone-svg-icons'

// Brand icons (always free)
import { 
  faGithub, 
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

// Add to library
library.add(
  // Light
  faHomeLight,
  faBookLight,

  // Regular
  faCodeRegular,
  faSidebarRegular,
  faFileRegular,
  faBookOpenRegular,
  faBugRegular,
  faLightbulbRegular,
  faHandRegular,
  faQuestionRegular,
  faMessageRegular,
  faSearchRegular,
  faRefreshRegular,
  faSparkleRegular,
  faChevronDownRegular,
  faArrowRightRegular,
  faCubeRegular,
  faCalendarRegular,
  faXmarkRegular,
  faArrowLeftRegular,
  
  // Solid
  faHomeSolid,
  faHeartSolid,
  faHandSolid,
  faCodeSolid,
  faQuestionSolid,
  faMessageSolid,
  faGripLinesVerticalSolid,
  faInfoCircleSolid,
  
  // Duotone
  faHomeDuotone,
  
  // Brands
  faGithub,
  faTwitter,
  faInstagram
)