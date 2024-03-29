'use strict';

const tourSteps = new Map([
    ['settings', {
        title: 'Основна інформація',
        user: true,
        content: ``,
    }],
    ['location_on', {
        title: 'Локації',
        content: ``,
        user: false,
    }],
    ['groups', {
        title: 'Працівники',
        content: ``,
        user: false,
    }],
    ['person_search', {
        title: 'Пошук ',
        content: ``,
        user: true,
    }],
    ['forum', {
        title: 'Запити до співпраці',
        content: ``,
        user: true,
    }],
    ['person', {
        title: 'Профіль',
        content: ``,
        user: true,
    }]
])


export { tourSteps };