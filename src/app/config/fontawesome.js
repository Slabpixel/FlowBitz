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
} from '@fortawesome/pro-regular-svg-icons'

import { 
  faHome as faHomeSolid,
} from '@fortawesome/pro-solid-svg-icons'

import { 
  faHome as faHomeDuotone,
} from '@fortawesome/pro-duotone-svg-icons'

// Brand icons (always free)
import { 
  faGithub, 
  faTwitter 
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
  
  // Solid
  faHomeSolid,
  
  // Duotone
  faHomeDuotone,
  
  // Brands
  faGithub,
  faTwitter
)