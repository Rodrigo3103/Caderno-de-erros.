// ==========================================
// CADERNO DE ERROS - CONCURSOS PÚBLICOS
// ==========================================

class CadernoDeErros {
    constructor() {
        this.errors = [];
        this.currentRevisaoIndex = 0;
        this.revisaoList = [];
        this.init();
    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    init() {
        this.loadErrors();
        this.setupEventListeners();
        this.updateUI();
        this.checkOnlineStatus();
        this.loadTheme();
    }

    // ==========================================
    // GERENCIAMENTO DE DADOS
    // ==========================================

    loadErrors() {
        const saved = localStorage.getItem('cadernoErros');
        if (saved) {
            this.errors = JSON.parse(saved);
        }
    }

    saveErrors() {
        localStorage.setItem('cadernoErros', JSON.stringify(this.errors));
        this.updateUI();
    }

    addError(errorData) {
        const error = {
            id: Date.now().toString(),
            ...errorData,
            dataRegistro: new Date().toISOString(),
            revisoes: 0,
            ultimaRevisao: null
        };
        this.errors.unshift(error);
        this.saveErrors();
        return error;
    }

    updateError(id, updatedData) {
        const index = this.errors.findIndex(e => e.id === id);
        if (index !== -1) {
            this.errors[index] = { ...this.errors[index], ...updatedData };
            this.saveErrors();
        }
    }

    deleteError(id) {
        if (confirm('Tem certeza que deseja excluir este erro?')) {
            this.errors = this.errors.filter(e => e.id !== id);
            this.saveErrors();
            this.showNotification('Erro excluído com sucesso!', 'success');
        }
    }

    incrementRevisao(id) {
        const error = this.errors.find(e => e.id === id);
        if (error) {
            error.revisoes = (error.revisoes || 0) + 1;
            error.ultimaRevisao = new Date().toISOString();
            this.saveErrors();
        }
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    setupEventListeners() {
        // Formulário de cadastro
        document.getElementById('errorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });

        // Navegação entre abas
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Tema
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Estatísticas
        document.getElementById('statsBtn').addEventListener('click', () => this.showStats());
        document.getElementById('closeStatsModal').addEventListener('click', () => this.closeModal('statsModal'));

        // Modal de detalhes
        document.getElementById('closeDetailsModal').addEventListener('click', () => this.closeModal('detailsModal'));

        // Fechar modais ao clicar fora
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Filtros e busca
        document.getElementById('searchInput').addEventListener('input', () => this.filterErrors());
        document.getElementById('filterDisciplina').addEventListener('change', () => this.filterErrors());
        document.getElementById('filterBanca').addEventListener('change', () => this.filterErrors());
        document.getElementById('filterDificuldade').addEventListener('change', () => this.filterErrors());
        document.getElementById('sortBy').addEventListener('change', () => this.filterErrors());

        // Revisão
        document.getElementById('showAnswerBtn')?.addEventListener('click', () => this.showAnswer());
        document.getElementById('nextErrorBtn')?.addEventListener('click', () => this.nextError());
        document.getElementById('shuffleBtn')?.addEventListener('click', () => this.shuffleRevisao());

        // Status online/offline
        window.addEventListener('online', () => this.checkOnlineStatus());
        window.addEventListener('offline', () => this.checkOnlineStatus());
    }

    // ==========================================
    // FORMULÁRIO
    // ==========================================

    handleFormSubmit(e) {
        const formData = {
            disciplina: document.getElementById('disciplina').value.trim(),
            banca: document.getElementById('banca').value.trim(),
            concurso: document.getElementById('concurso').value.trim(),
            assunto: document.getElementById('assunto').value.trim(),
            questao: document.getElementById('questao').value.trim(),
            minhaResposta: document.getElementById('minhaResposta').value.trim(),
            respostaCorreta: document.getElementById('respostaCorreta').value.trim(),
            explicacao: document.getElementById('explicacao').value.trim(),
            dificuldade: document.getElementById('dificuldade').value,
            tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t)
        };

        this.addError(formData);
        e.target.reset();
        this.showNotification('✅ Erro cadastrado com sucesso!', 'success');
        
        // Atualizar datalists
        this.updateDataLists();
    }

    updateDataLists() {
        // Disciplinas
        const disciplinas = [...new Set(this.errors.map(e => e.disciplina))];
        const disciplinasList = document.getElementById('disciplinasList');
        disciplinasList.innerHTML = disciplinas.map(d => `<option value="${d}">`).join('');

        // Bancas
        const bancas = [...new Set(this.errors.map(e => e.banca).filter(b => b))];
        const bancasList = document.getElementById('bancasList');
        bancasList.innerHTML = bancas.map(b => `<option value="${b}">`).join('');
    }

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================

    switchTab(tabName) {
        // Atualizar abas
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Atualizar conteúdo
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Ações específicas por aba
        if (tabName === 'lista') {
            this.filterErrors();
        } else if (tabName === 'revisao') {
            this.initRevisao();
        }
    }

    // ==========================================
    // LISTA DE ERROS
    // ==========================================

    filterErrors() {
        const search = document.getElementById('searchInput').value.toLowerCase();
        const filterDisciplina = document.getElementById('filterDisciplina').value;
        const filterBanca = document.getElementById('filterBanca').value;
        const filterDificuldade = document.getElementById('filterDificuldade').value;
        const sortBy = document.getElementById('sortBy').value;

        let filtered = this.errors.filter(error => {
            const matchSearch = !search || 
                error.disciplina.toLowerCase().includes(search) ||
                error.assunto.toLowerCase().includes(search) ||
                error.questao.toLowerCase().includes(search) ||
                (error.banca && error.banca.toLowerCase().includes(search)) ||
                (error.concurso && error.concurso.toLowerCase().includes(search));

            const matchDisciplina = !filterDisciplina || error.disciplina === filterDisciplina;
            const matchBanca = !filterBanca || error.banca === filterBanca;
            const matchDificuldade = !filterDificuldade || error.dificuldade === filterDificuldade;

            return matchSearch && matchDisciplina && matchBanca && matchDificuldade;
        });

        // Ordenação
        filtered = this.sortErrors(filtered, sortBy);

        this.renderErrorsList(filtered);
        this.updateFilterOptions();
    }

    sortErrors(errors, sortBy) {
        const sorted = [...errors];
        
        switch (sortBy) {
            case 'recent':
                return sorted; // Já está ordenado por mais recente
            case 'oldest':
                return sorted.reverse();
            case 'disciplina':
                return sorted.sort((a, b) => a.disciplina.localeCompare(b.disciplina));
            case 'dificuldade':
                const dificuldadeOrder = { 'facil': 1, 'medio': 2, 'dificil': 3 };
                return sorted.sort((a, b) => dificuldadeOrder[b.dificuldade] - dificuldadeOrder[a.dificuldade]);
            default:
                return sorted;
        }
    }

    renderErrorsList(errors) {
        const container = document.getElementById('errorsList');
        document.getElementById('errorCount').textContent = errors.length;

        if (errors.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>Nenhum erro encontrado</h3>
                    <p>Tente ajustar os filtros de busca</p>
                </div>
            `;
            return;
        }

        container.innerHTML = errors.map(error => this.createErrorCard(error)).join('');

        // Adicionar event listeners aos cards
        container.querySelectorAll('.error-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    this.showErrorDetails(card.dataset.id);
                }
            });
        });

        // Botões de ação
        container.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteError(btn.dataset.id);
            });
        });
    }

    createErrorCard(error) {
        const date = new Date(error.dataRegistro);
        const dateStr = date.toLocaleDateString('pt-BR');
        const dificuldadeEmoji = {
            'facil': '😊',
            'medio': '😐',
            'dificil': '😰'
        };

        return `
            <div class="error-card" data-id="${error.id}">
                <div class="error-header">
                    <div class="error-title">
                        <h3>${error.disciplina} - ${error.assunto}</h3>
                        <div class="error-meta">
                            ${error.banca ? `${error.banca} • ` : ''}
                            ${error.concurso ? `${error.concurso} • ` : ''}
                            ${dateStr}
                            ${error.revisoes > 0 ? ` • Revisado ${error.revisoes}x` : ''}
                        </div>
                    </div>
                    <div class="error-actions">
                        <button class="btn-danger" data-id="${error.id}" title="Excluir">🗑️</button>
                    </div>
                </div>
                <div class="error-content">
                    <p class="error-preview">${error.questao}</p>
                </div>
                <div class="error-footer">
                    <span class="badge-dificuldade">${dificuldadeEmoji[error.dificuldade]}</span>
                    ${error.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }

    updateFilterOptions() {
        // Atualizar opções de disciplina
        const disciplinas = [...new Set(this.errors.map(e => e.disciplina))].sort();
        const filterDisciplina = document.getElementById('filterDisciplina');
        const currentDisciplina = filterDisciplina.value;
        filterDisciplina.innerHTML = '<option value="">Todas as Disciplinas</option>' +
            disciplinas.map(d => `<option value="${d}">${d}</option>`).join('');
        filterDisciplina.value = currentDisciplina;

        // Atualizar opções de banca
        const bancas = [...new Set(this.errors.map(e => e.banca).filter(b => b))].sort();
        const filterBanca = document.getElementById('filterBanca');
        const currentBanca = filterBanca.value;
        filterBanca.innerHTML = '<option value="">Todas as Bancas</option>' +
            bancas.map(b => `<option value="${b}">${b}</option>`).join('');
        filterBanca.value = currentBanca;
    }

    showErrorDetails(id) {
        const error = this.errors.find(e => e.id === id);
        if (!error) return;

        const date = new Date(error.dataRegistro);
        const dateStr = date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const dificuldadeLabel = {
            'facil': '😊 Fácil',
            'medio': '😐 Médio',
            'dificil': '😰 Difícil'
        };

        const content = `
            <div class="error-details">
                <div class="error-meta mb-1">
                    <span class="badge-primary">${error.disciplina}</span>
                    <span class="badge">${error.assunto}</span>
                    ${error.banca ? `<span class="badge">${error.banca}</span>` : ''}
                    ${error.concurso ? `<span class="badge">${error.concurso}</span>` : ''}
                    <span class="badge">${dificuldadeLabel[error.dificuldade]}</span>
                </div>

                <div class="stats-section">
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        📅 Registrado em ${dateStr}
                        ${error.revisoes > 0 ? `<br>🔄 Revisado ${error.revisoes} vez${error.revisoes > 1 ? 'es' : ''}` : ''}
                    </p>
                </div>

                <div class="stats-section">
                    <h3>📝 Questão</h3>
                    <div class="revisao-questao">${error.questao}</div>
                </div>

                <div class="stats-section">
                    <h3>Respostas</h3>
                    ${error.minhaResposta ? `<p class="resposta-errada">❌ Minha resposta: ${error.minhaResposta}</p>` : ''}
                    <p class="resposta-certa">✅ Resposta correta: ${error.respostaCorreta}</p>
                </div>

                <div class="stats-section">
                    <h3>💡 Explicação e Aprendizado</h3>
                    <div class="revisao-explicacao">${error.explicacao}</div>
                </div>

                ${error.tags.length > 0 ? `
                    <div class="stats-section">
                        <h3>🏷️ Tags</h3>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${error.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="form-actions">
                    <button class="btn-danger" onclick="app.deleteError('${error.id}'); app.closeModal('detailsModal');">
                        🗑️ Excluir Erro
                    </button>
                </div>
            </div>
        `;

        document.getElementById('detailsContent').innerHTML = content;
        document.getElementById('detailsModal').classList.remove('hidden');
    }

    // ==========================================
    // REVISÃO
    // ==========================================

    initRevisao() {
        const container = document.getElementById('revisaoContainer');
        const card = document.getElementById('revisaoCard');

        if (this.errors.length === 0) {
            container.classList.remove('hidden');
            card.classList.add('hidden');
            return;
        }

        container.classList.add('hidden');
        card.classList.remove('hidden');

        this.revisaoList = [...this.errors];
        this.shuffleArray(this.revisaoList);
        this.currentRevisaoIndex = 0;
        this.showRevisaoCard();
    }

    showRevisaoCard() {
        if (this.revisaoList.length === 0) return;

        const error = this.revisaoList[this.currentRevisaoIndex];
        
        document.getElementById('revisaoIndex').textContent = this.currentRevisaoIndex + 1;
        document.getElementById('revisaoTotal').textContent = this.revisaoList.length;
        document.getElementById('revisaoDisciplina').textContent = error.disciplina;
        document.getElementById('revisaoAssunto').textContent = error.assunto;
        
        const dificuldadeEmoji = {
            'facil': '😊',
            'medio': '😐',
            'dificil': '😰'
        };
        document.getElementById('revisaoDificuldade').textContent = dificuldadeEmoji[error.dificuldade];
        
        document.getElementById('revisaoQuestao').textContent = error.questao;
        document.getElementById('revisaoMinhaResposta').textContent = error.minhaResposta || 'Não registrada';
        document.getElementById('revisaoRespostaCorreta').textContent = error.respostaCorreta;
        document.getElementById('revisaoExplicacao').textContent = error.explicacao;

        // Resetar visualização
        document.getElementById('revisaoRespostaDiv').classList.add('hidden');
        document.getElementById('showAnswerBtn').classList.remove('hidden');
        document.getElementById('nextErrorBtn').classList.add('hidden');
    }

    showAnswer() {
        const error = this.revisaoList[this.currentRevisaoIndex];
        this.incrementRevisao(error.id);

        document.getElementById('revisaoRespostaDiv').classList.remove('hidden');
        document.getElementById('showAnswerBtn').classList.add('hidden');
        document.getElementById('nextErrorBtn').classList.remove('hidden');
    }

    nextError() {
        this.currentRevisaoIndex = (this.currentRevisaoIndex + 1) % this.revisaoList.length;
        this.showRevisaoCard();
    }

    shuffleRevisao() {
        this.shuffleArray(this.revisaoList);
        this.currentRevisaoIndex = 0;
        this.showRevisaoCard();
        this.showNotification('🔀 Lista embaralhada!', 'info');
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // ==========================================
    // ESTATÍSTICAS
    // ==========================================

    showStats() {
        if (this.errors.length === 0) {
            this.showNotification('📊 Cadastre alguns erros primeiro para ver estatísticas', 'info');
            return;
        }

        const stats = this.calculateStats();
        const content = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${stats.total}</div>
                    <div class="stat-label">Total de Erros</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.disciplinas}</div>
                    <div class="stat-label">Disciplinas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.totalRevisoes}</div>
                    <div class="stat-label">Total de Revisões</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.bancas}</div>
                    <div class="stat-label">Bancas</div>
                </div>
            </div>

            <div class="stats-section">
                <h3>📚 Erros por Disciplina</h3>
                <div class="stats-list">
                    ${stats.porDisciplina.map(item => `
                        <div class="stats-item">
                            <span class="stats-item-label">${item.disciplina}</span>
                            <span class="stats-item-value">${item.count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${stats.porBanca.length > 0 ? `
                <div class="stats-section">
                    <h3>🏢 Erros por Banca</h3>
                    <div class="stats-list">
                        ${stats.porBanca.map(item => `
                            <div class="stats-item">
                                <span class="stats-item-label">${item.banca}</span>
                                <span class="stats-item-value">${item.count}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="stats-section">
                <h3>📊 Dificuldade</h3>
                <div class="stats-list">
                    <div class="stats-item">
                        <span class="stats-item-label">😊 Fácil</span>
                        <span class="stats-item-value">${stats.porDificuldade.facil}</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-item-label">😐 Médio</span>
                        <span class="stats-item-value">${stats.porDificuldade.medio}</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-item-label">😰 Difícil</span>
                        <span class="stats-item-value">${stats.porDificuldade.dificil}</span>
                    </div>
                </div>
            </div>

            ${stats.maisRevisados.length > 0 ? `
                <div class="stats-section">
                    <h3>🔄 Mais Revisados</h3>
                    <div class="stats-list">
                        ${stats.maisRevisados.slice(0, 5).map(error => `
                            <div class="stats-item">
                                <span class="stats-item-label">${error.disciplina} - ${error.assunto}</span>
                                <span class="stats-item-value">${error.revisoes}x</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        document.getElementById('statsContent').innerHTML = content;
        document.getElementById('statsModal').classList.remove('hidden');
    }

    calculateStats() {
        const stats = {
            total: this.errors.length,
            disciplinas: new Set(this.errors.map(e => e.disciplina)).size,
            bancas: new Set(this.errors.map(e => e.banca).filter(b => b)).size,
            totalRevisoes: this.errors.reduce((sum, e) => sum + (e.revisoes || 0), 0),
            porDisciplina: [],
            porBanca: [],
            porDificuldade: {
                facil: 0,
                medio: 0,
                dificil: 0
            },
            maisRevisados: []
        };

        // Por disciplina
        const disciplinaCount = {};
        this.errors.forEach(e => {
            disciplinaCount[e.disciplina] = (disciplinaCount[e.disciplina] || 0) + 1;
        });
        stats.porDisciplina = Object.entries(disciplinaCount)
            .map(([disciplina, count]) => ({ disciplina, count }))
            .sort((a, b) => b.count - a.count);

        // Por banca
        const bancaCount = {};
        this.errors.forEach(e => {
            if (e.banca) {
                bancaCount[e.banca] = (bancaCount[e.banca] || 0) + 1;
            }
        });
        stats.porBanca = Object.entries(bancaCount)
            .map(([banca, count]) => ({ banca, count }))
            .sort((a, b) => b.count - a.count);

        // Por dificuldade
        this.errors.forEach(e => {
            stats.porDificuldade[e.dificuldade]++;
        });

        // Mais revisados
        stats.maisRevisados = this.errors
            .filter(e => e.revisoes > 0)
            .sort((a, b) => b.revisoes - a.revisoes);

        return stats;
    }

    // ==========================================
    // TEMA
    // ==========================================

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeButton(theme);
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeButton(newTheme);
    }

    updateThemeButton(theme) {
        const button = document.getElementById('themeToggle');
        button.textContent = theme === 'light' ? '🌙' : '☀️';
        button.title = theme === 'light' ? 'Tema escuro' : 'Tema claro';
    }

    // ==========================================
    // UTILITÁRIOS
    // ==========================================

    updateUI() {
        this.updateDataLists();
        this.updateFilterOptions();
        if (document.getElementById('lista').classList.contains('active')) {
            this.filterErrors();
        }
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--secondary)' : type === 'error' ? 'var(--danger)' : 'var(--info)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: 0 4px 6px var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    checkOnlineStatus() {
        const indicator = document.getElementById('offlineIndicator');
        if (navigator.onLine) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden');
        }
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new CadernoDeErros();
});

// Adicionar animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
