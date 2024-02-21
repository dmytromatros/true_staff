'use strict';

const generateUniqueId = (s) => {
    return s.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return (a & a) + Date.now();
    }, 0);
};

export { generateUniqueId };
