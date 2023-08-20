const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Si requieres más información, espere y le contestaremos a la brevedad.']);

const flowferia = addKeyword(['feria']).addAnswer(
    [
        '🚀 A continuación te presentamos enlaces importantes:',
        '[*Asesoría en oficina previa cita*] https://feriadevivienda.com.mx/inmobiliarias/feriadevivienda3/',
        '[*Listado de valuadores*] https://feriadevivienda.com.mx/valuadores/',
        '[*Tiktok con información importante*] https://www.tiktok.com/@feriadevivienda',
        '[*También puedes solicitar información sobre crédito Mejoravit, construcción en terreno propio y MejoraSI*]',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
);

const flowCatalogo = addKeyword(['casa']).addAnswer(
    ['🤪 A continuación tendrás acceso a nuestro catálogo', 'https://feriadevivienda.com.mx/catalogo-de-vivienda-2/', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
);

const flowAsesor = addKeyword(['asesor']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*Ingresa a*] https://feriadevivienda.com.mx/agentes/daniel-espindola-2/',
        '[*Para solicitar información y agendar una cita*]',
        '[*Tiktok con información importante*] https://www.tiktok.com/@feriadevivienda',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
);

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontrarás un ejemplo rápido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
);

const flowPrincipal = addKeyword(['hola', 'informes', 'solicito', 'quiero'])
    .addAnswer('🙌 Hola, bienvenido a *FeriaSaurio*, el chatbot de feriadevivienda.com.mx')
    .addAnswer(
        [
            'A continuación te comparto el menú de opciones:',
            '👉 *feria* para conocer nuestros servicios',
            '👉 *asesor* para atención personalizada',
            '👉 *casa* para conocer el catálogo de vivienda',
        ],
        null,
        null,
        [flowferia, flowAsesor, flowTuto, flowCatalogo]
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowSecundario, flowferia, flowAsesor, flowTuto, flowCatalogo]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();

