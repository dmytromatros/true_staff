'use strict';

const tourSteps = new Map([
    ['settings', {
        title: 'Основна інформація',
        user: true,
        content: `
        <div>
                                Привіт! Я <b style="font-weight: 800; color: #3adca3">Reputa</b>!
                            </div>
                            <div>
                                Reputa - це платформа, де ти можеш залишити відгук про будь-якого працівника закладу. Ми
                                віримо в силу
                                взаємодії та відкритості.
                            </div>
                            <div>
                                Тут зберігається вся інформація про користувача від моменту реєстрації у системі.
                                Якщо користувач є працівником у компанії, компанія може додати користувача до свого
                                списку працівників
                                на платформі.
                                Таким чином, уся інформація про роботу буде зберігатись у системі Reputa, що дозволить
                                забезпечити
                                більш зручний та ефективний процес взаємодії.
                            </div>

                            <!-- <div>
                                <b>Важливо!</b> Після реєстрації в системі, будь ласка, заповніть свій профіль. Це
                                допоможе
                                іншим користувачам знайти тебе та додати тебе до списку працівників.
                            </div> -->

                            <div>
                                <b style="font-weight: 800;">Основи користування:</b>
                                <div>1. Для відкриття меню натисни на вільне місце.</div>
                                <div>
                                    <img style="
                                                                   width: 80%;
                                    display: block;
                                    margin: auto;
                                    border-radius: 8px;
                                    height: auto;" src="/img/tour/sidebar.png" alt="">
                                </div>
                                <div style="margin-top: 15px;">2. Для повторного відкриття вінка допомги, натисни на
                                    знак
                                    питання у правому нижньому куті.</div>
                                <div>
                                    <img style="                               width: 80%;
                                    display: block;
                                    margin: auto;
                                    border-radius: 8px;
                                    height: auto;" src="/img/tour/help.png" alt="">
                                </div>
                            </div>

                            <div>
                                <b style="font-weight: 800;"> Приєднуйся до нашої спільноти!</b>
                            </div>

        `,
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