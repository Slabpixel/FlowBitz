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
} from '@fortawesome/pro-regular-svg-icons'

import { 
  faHome as faHomeSolid,
  faHeart as faHeartSolid,
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
  
  // Solid
  faHomeSolid,
  faHeartSolid,
  
  // Duotone
  faHomeDuotone,
  
  // Brands
  faGithub,
  faTwitter,
  faInstagram
)