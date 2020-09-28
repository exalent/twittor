//importar archivos extra
importScripts('/sw/06-twittor/js/sw-utils.js');


const CACHE_STATIC = 'static-v1';
const CACHE_DYNAMIC = 'dinamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';

const APP_SHEL = [
    // '/',
    '/sw/06-twittor/index.html',
    '/sw/06-twittor/css/style.css',
    '/sw/06-twittor/img/favicon.ico',
    '/sw/06-twittor/img/avatars/hulk.jpg',
    '/sw/06-twittor/img/avatars/thor.jpg',
    '/sw/06-twittor/img/avatars/spiderman.jpg',
    '/sw/06-twittor/img/avatars/ironman.jpg',
    '/sw/06-twittor/img/avatars/wolverine.jpg',
    '/sw/06-twittor/js/app.js',
];

const APP_SHEL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    '/sw/06-twittor/css/animate.css',
    '/sw/06-twittor/js/libs/jquery.js'
];

self.addEventListener('install', e =>{
    const cacheStatic = caches.open(CACHE_STATIC).then( cache => cache.addAll( APP_SHEL ));
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then( cache => cache.addAll( APP_SHEL_INMUTABLE ));
    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable]) );
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key => {
            if (key !== CACHE_STATIC && key.includes('static')) {
                return caches.delete(key);
            }
            
        });
    });

    e.waitUntil( respuesta );

});

self.addEventListener( 'fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {
                return actualizaCacheDinamico( CACHE_DYNAMIC, e.request, newRes);
            });

        }

    });



    e.respondWith( respuesta );

});
