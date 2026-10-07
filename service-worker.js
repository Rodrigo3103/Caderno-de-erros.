// ==========================================
// SERVICE WORKER - CADERNO DE ERROS PWA
// ==========================================

const CACHE_NAME = 'caderno-erros-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json'
];

// ==========================================
// INSTALAÇÃO
// ==========================================

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Cache aberto');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[Service Worker] Todos os arquivos em cache');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Erro ao fazer cache:', error);
            })
    );
});

// ==========================================
// ATIVAÇÃO
// ==========================================

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Remover caches antigos
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Ativado');
                return self.clients.claim();
            })
    );
});

// ==========================================
// BUSCA (FETCH)
// ==========================================

self.addEventListener('fetch', (event) => {
    // Ignorar requisições que não sejam GET
    if (event.request.method !== 'GET') {
        return;
    }

    // Ignorar requisições de chrome-extension e outros protocolos
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Se encontrou no cache, retorna
                if (cachedResponse) {
                    console.log('[Service Worker] Servindo do cache:', event.request.url);
                    return cachedResponse;
                }

                // Senão, busca da rede
                return fetch(event.request)
                    .then((response) => {
                        // Verifica se a resposta é válida
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clona a resposta
                        const responseToCache = response.clone();

                        // Adiciona ao cache para uso futuro
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Erro ao buscar:', event.request.url, error);
                        
                        // Se falhar, tenta retornar o index.html do cache (para navegação)
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        
                        // Retorna erro
                        return new Response('Offline - Conteúdo não disponível', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// ==========================================
// MENSAGENS
// ==========================================

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => cache.addAll(event.data.urls))
        );
    }
});

// ==========================================
// SINCRONIZAÇÃO EM BACKGROUND (Futuro)
// ==========================================

self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
    
    if (event.tag === 'sync-errors') {
        event.waitUntil(syncErrors());
    }
});

async function syncErrors() {
    // Placeholder para sincronização futura com servidor
    console.log('[Service Worker] Sincronizando erros...');
    // Implementar lógica de sincronização aqui quando houver backend
}

// ==========================================
// NOTIFICAÇÕES PUSH (Futuro)
// ==========================================

self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push recebido:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'Lembre-se de revisar seus erros!',
        icon: './icon-192.png',
        badge: './icon-72.png',
        vibrate: [200, 100, 200],
        tag: 'caderno-erros-notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('Caderno de Erros', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notificação clicada:', event);
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('./')
    );
});

console.log('[Service Worker] Carregado');
