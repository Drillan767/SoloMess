import React from 'react';
import Homeindex from '../home/home';
import Contact from '../home/contact';
import Articles from '../home/articles';
import Article from '../home/article';
import Portfolios from '../home/portfolio_index';
import Portfolio from '../home/portfolio_show';
import HomeAdmin from '../admin/home/index';
import ArticlesIndex from '../admin/articles/index';
import ArticleShow from '../admin/articles/show';
import ArticleNew from '../admin/articles/new';
import ArticleEdit from '../admin/articles/edit';

export const elementForActionName = {
    'index': Homeindex,
    'contact': Contact,
    'articles_index': Articles,
    'article_show': Article,
    'portfolio_index': Portfolios,
    'portfolio_show': Portfolio
};

export const adminElements = {
    'home_admin': {
        object: HomeAdmin,
        title: 'Dashboard'
    },
    'articles_index': {
        object: ArticlesIndex,
        title: 'Articles'
    },
    'articles_show': {
        object: ArticleShow,
        title: 'Articles'
    },
    'articles_new': {
        object: ArticleNew,
        title: 'New article'
    },
    'articles_edit': {
        object: ArticleEdit,
        title: 'Editing Article'
    }


};