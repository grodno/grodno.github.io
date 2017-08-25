import { createWidgetType, registerWidgetType } from '../lib/ui.js';
import Top from './Top.html';
import Footer from './Footer.html';
import AdsList from './AdsList.js';
import { NewsList, NewsListItem } from './NewsList.js';
import AdsBoards from './AdsBoards.js';
import UserInfo from './UserInfo.js';
import Tags from './Tags.js';

registerWidgetType(AdsList, AdsBoards, UserInfo, NewsList, NewsListItem, Tags);
createWidgetType('Top', Top);
createWidgetType('Footer', Footer);
