// ==========================================
// REGISTRO DO SERVICE WORKER
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then((registration) => {
                console.log('✅ Service Worker registrado com sucesso:', registration.scope);
                
                // Verificar por atualizações
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 Nova versão do Service Worker encontrada');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Nova versão disponível
                            console.log('📦 Nova versão disponível');
                            
                            // Mostrar notificação ao usuário
                            if (confirm('Nova versão disponível! Deseja atualizar agora?')) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch((error) => {
                console.error('❌ Erro ao registrar Service Worker:', error);
            });

        // Recarregar quando um novo Service Worker tomar controle
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔄 Service Worker atualizado, recarregando...');
            window.location.reload();
        });
    });

    // Verificar se já está instalado
    navigator.serviceWorker.ready.then((registration) => {
        console.log('✅ Service Worker pronto:', registration);
    });
} else {
    console.warn('⚠️ Service Worker não é suportado neste navegador');
}

// ==========================================
// INSTALAÇÃO COMO PWA
// ==========================================

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('💾 Evento de instalação detectado');
    
    // Prevenir o mini-infobar do Chrome em mobile
    e.preventDefault();
    
    // Guardar o evento para usar depois
    deferredPrompt = e;
    
    // Mostrar botão de instalação customizado (opcional)
    showInstallButton();
});

function showInstallButton() {
    // Criar botão de instalação se não existir
    let installButton = document.getElementById('installButton');
    
    if (!installButton) {
        installButton = document.createElement('button');
        installButton.id = 'installButton';
        installButton.className = 'btn-success';
        installButton.innerHTML = '📱 Instalar App';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Mostrar o prompt de instalação
                deferredPrompt.prompt();
                
                // Aguardar a escolha do usuário
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`Resultado da instalação: ${outcome}`);
                
                if (outcome === 'accepted') {
                    console.log('✅ Usuário aceitou instalar o app');
                } else {
                    console.log('❌ Usuário recusou instalar o app');
                }
                
                // Limpar o prompt
                deferredPrompt = null;
                installButton.remove();
            }
        });
        
        document.body.appendChild(installButton);
    }
}

// Detectar quando o app foi instalado
window.addEventListener('appinstalled', () => {
    console.log('✅ App instalado com sucesso!');
    
    // Remover botão de instalação
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.remove();
    }
    
    // Mostrar mensagem de sucesso
    if (window.app && typeof window.app.showNotification === 'function') {
        window.app.showNotification('🎉 App instalado com sucesso!', 'success');
    }
});

// Detectar se está rodando como PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
}

if (isPWA()) {
    console.log('📱 Rodando como PWA instalado');
} else {
    console.log('🌐 Rodando no navegador');
}

// ==========================================
// NOTIFICAÇÕES (Opcional)
// ==========================================

function requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('✅ Permissão para notificações concedida');
            } else {
                console.log('❌ Permissão para notificações negada');
            }
        });
    }
}

// Descomentar para solicitar permissão de notificações automaticamente
// requestNotificationPermission();

// ==========================================
// COMPARTILHAMENTO (Web Share API)
// ==========================================

async function shareApp() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Caderno de Erros - Concursos Públicos',
                text: 'Aplicativo para registrar e revisar erros de questões de concursos',
                url: window.location.href
            });
            console.log('✅ Compartilhado com sucesso');
        } catch (error) {
            console.log('❌ Erro ao compartilhar:', error);
        }
    } else {
        console.log('⚠️ Web Share API não suportada');
    }
}

// Exportar funções úteis
window.pwaHelpers = {
    isPWA,
    shareApp,
    requestNotificationPermission
};

console.log('✅ PWA helpers carregados');
