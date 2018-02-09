import React from 'react';
import Homeindex from '../home/home';
import Contact from '../home/contact';
import Articles from '../home/articles';
import Article from '../home/article';
import Portfolios from '../home/portfolio_index';
import Portfolio from '../home/portfolio_show';
import SessionNew from '../admin/sessions/new';
import HomeAdmin from '../admin/home/index';

export const elementForActionName = {
    'index': Homeindex,
    'contact': Contact,
    'articles_index': Articles,
    'article_show': Article,
    'portfolio_index': Portfolios,
    'portfolio_show': Portfolio
};

export const adminElementsForActionName = {
    'sessions_new': SessionNew,
    'home_admin': HomeAdmin,
};