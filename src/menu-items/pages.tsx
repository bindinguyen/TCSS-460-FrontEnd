// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcon from '@mui/icons-material/Add';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { FormatListBulletedIcon, MessageOutlined, EmailIcon, SendIcon, SearchIcon, LibraryBooksIcon, AddIcon };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'messages',
      title: <FormattedMessage id="messages" />,
      type: 'collapse',
      icon: icons.MessageOutlined,
      children: [
        {
          id: 'send-message',
          title: <FormattedMessage id="send-message" />,
          type: 'item',
          url: '/messages/send',
          icon: icons.SendIcon
        },
        {
          id: 'view-messages',
          title: <FormattedMessage id="view-messages" />,
          type: 'item',
          url: '/messages/list',
          icon: icons.EmailIcon
        }
      ]
    },
    {
      id: 'books',
      title: <FormattedMessage id="books" />,
      type: 'collapse',
      icon: icons.LibraryBooksIcon,
      children: [
        {
          id: 'view-books',
          title: <FormattedMessage id="view-books" />,
          type: 'item',
          url: '/viewbooks',
          icon: icons.FormatListBulletedIcon
        },
        {
          id: 'add-book',
          title: <FormattedMessage id="add-books" />,
          type: 'item',
          url: '/addbook',
          icon: icons.AddIcon
        },
        {
          id: 'search-books',
          title: <FormattedMessage id="search-books" />,
          type: 'item',
          url: '/searchbooks',
          icon: icons.SearchIcon
        }
      ]
    }
  ]
};

export default pages;
