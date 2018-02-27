import React from 'react';
import Settings from '../admin/settings';
import HomeAdmin from '../admin/home/index';
import ArticlesIndex from '../admin/articles/index';
import ArticleShow from '../admin/articles/show';
import ArticleNew from '../admin/articles/new';
import ArticleEdit from '../admin/articles/edit';
import PortfolioIndex from '../admin/portfolio/index';
import PortfolioNew from '../admin/portfolio/new';
import PortfolioShow from '../admin/portfolio/show';
import PortfolioEdit from '../admin/portfolio/edit';

export const adminElements = {
    'home_admin': {
        object: HomeAdmin,
        title: 'Dashboard'
    },
    /*
    'articles_index': {
        object: ArticlesIndex,
        title: 'Articles'
    },
    'articles_show': {
        object: ArticleShow,
        title: 'Article'
    },
    'articles_new': {
        object: ArticleNew,
        title: 'New article'
    },
    'articles_edit': {
        object: ArticleEdit,
        title: 'Editing Article'
    },
    'portfolios_index': {
        object: PortfolioIndex,
        title: 'Portfolio'
    },
    'portfolios_new': {
        object: PortfolioNew,
        title: 'New project'
    },
    'portfolios_show': {
        object: PortfolioShow,
        title: 'Project'
    },
    'portfolios_edit': {
        object: PortfolioEdit,
        title: 'Project'
    },
    */
    'basics_edit': {
        object: Settings,
        title: 'Edit settings'
    }

};