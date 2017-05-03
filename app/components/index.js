import { createWidgetType, registerWidgetType } from '../utils.js';
import Top from './Top.html';
import Footer from './Footer.html';
import AdsList from './AdsList.js';
import AdsBoards from './AdsBoards.js';

registerWidgetType(AdsList, AdsBoards);
createWidgetType('Top', Top);
createWidgetType('Footer', Footer);
