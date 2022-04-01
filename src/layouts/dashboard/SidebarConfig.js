// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Account',
    path: '/account/',
    icon: getIcon('carbon:app-connectivity')
  },
  {
    title: 'Dashboard',
    path: '/dashboard/',
    icon: getIcon('carbon:user-avatar')
  }
];

export default sidebarConfig;
