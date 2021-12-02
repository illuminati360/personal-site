import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faPatreon } from '@fortawesome/free-brands-svg-icons/faPatreon';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';

// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'http://discordapp.com/users/508212993574567958',
    label: 'Discord',
    icon: faDiscord,
  },
  {
    link: 'https://www.facebook.com/johnson.yue.9231',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    link: 'https://www.patreon.com/luminosity_atlvr',
    label: 'Patreon',
    icon: faPatreon,
  },
  {
    link: 'mailto:johnsonyuehit@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
];

export default data;
