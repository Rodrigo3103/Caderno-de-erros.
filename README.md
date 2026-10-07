# 📚 Caderno de Erros - Concursos Públicos

> Aplicativo Progressive Web App (PWA) para registrar, organizar e revisar erros de questões de concursos públicos. Funciona 100% offline!

## ✨ Funcionalidades

### 📝 Cadastro de Erros
- Registre detalhes completos de cada questão que errou
- Campos para disciplina, banca, concurso, assunto
- Cole o enunciado completo da questão
- Compare sua resposta com a resposta correta
- Adicione explicações e comentários sobre o que aprendeu
- Classifique por nível de dificuldade (fácil, médio, difícil)
- Adicione tags personalizadas para facilitar a busca

### 📋 Lista de Erros
- Visualize todos os erros cadastrados em cards organizados
- **Busca inteligente**: pesquise por qualquer campo
- **Filtros avançados**: 
  - Por disciplina
  - Por banca examinadora
  - Por nível de dificuldade
- **Ordenação**: 
  - Mais recentes primeiro
  - Mais antigos primeiro
  - Por disciplina (alfabética)
  - Por dificuldade
- Veja quantas vezes já revisou cada erro
- Clique em qualquer erro para ver detalhes completos

### 🔄 Modo Revisão
- Revise seus erros de forma aleatória
- Teste-se antes de ver a resposta
- Acompanhe seu progresso (1/10, 2/10, etc.)
- Embaralhe a ordem para treinar de forma variada
- O app registra automaticamente cada revisão

### 📊 Estatísticas
- Total de erros cadastrados
- Número de disciplinas estudadas
- Total de revisões realizadas
- Número de bancas diferentes
- **Top erros por disciplina**: veja onde você mais erra
- **Top erros por banca**: identifique padrões
- **Distribuição por dificuldade**: entenda seus pontos fracos
- **Mais revisados**: acompanhe quais temas você mais pratica

### 🎨 Personalização
- **Tema claro e escuro**: alterne entre os dois temas
- Design moderno e responsivo
- Funciona perfeitamente em desktop, tablet e celular

### 🔒 Privacidade Total
- **Todos os dados ficam no seu dispositivo**
- Nenhuma informação é enviada para servidores externos
- Seus erros são só seus!

## 🚀 Como Usar

### Abrir o Aplicativo

#### Opção 1: Navegador (Mais Simples)
1. Abra o arquivo `index.html` no seu navegador
2. Pronto! O app já está funcionando

#### Opção 2: Servidor Local (Recomendado para PWA)
Para aproveitar todas as funcionalidades PWA, você precisa servir via HTTP/HTTPS:

**Com Python 3:**
```bash
# Navegue até a pasta do projeto
cd "f:\Concursos Públicos\Caderno de erros"

# Inicie o servidor
python -m http.server 8000
```

**Com Node.js (npx):**
```bash
# Navegue até a pasta do projeto
cd "f:\Concursos Públicos\Caderno de erros"

# Inicie o servidor
npx serve
```

**Com PHP:**
```bash
# Navegue até a pasta do projeto
cd "f:\Concursos Públicos\Caderno de erros"

# Inicie o servidor
php -S localhost:8000
```

**Com extensão do VS Code:**
- Instale a extensão "Live Server"
- Clique com botão direito no `index.html`
- Selecione "Open with Live Server"

Depois acesse: `http://localhost:8000`

### 📱 Instalar como Aplicativo (PWA)

Quando você acessar via servidor HTTP/HTTPS, verá um botão **"📱 Instalar App"** no canto inferior esquerdo.

**No Desktop (Chrome, Edge, Brave):**
1. Clique no ícone de instalação na barra de endereços (➕)
2. Ou clique no botão "Instalar App" que aparece na página
3. Confirme a instalação
4. O app aparecerá como um programa instalado!

**No Android:**
1. Abra no Chrome
2. Toque no menu (⋮)
3. Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"
4. Confirme

**No iOS (iPhone/iPad):**
1. Abra no Safari
2. Toque no botão de compartilhar (⬆️)
3. Selecione "Adicionar à Tela de Início"
4. Confirme

### 📖 Usando as Funcionalidades

#### Cadastrar um Erro
1. Clique na aba **"➕ Novo Erro"**
2. Preencha os campos (os marcados com * são obrigatórios):
   - **Disciplina**: Ex: Direito Constitucional
   - **Banca**: Ex: CESPE/CEBRASPE (opcional)
   - **Concurso**: Ex: TRT 2023 (opcional)
   - **Assunto**: Ex: Direitos Fundamentais
   - **Questão**: Cole o enunciado completo
   - **Minha Resposta**: O que você marcou (opcional)
   - **Resposta Correta**: A resposta certa
   - **Explicação**: Por que errou? O que aprendeu?
   - **Dificuldade**: Fácil, Médio ou Difícil
   - **Tags**: Palavras-chave separadas por vírgula
3. Clique em **"💾 Salvar Erro"**

#### Consultar Erros
1. Clique na aba **"📋 Meus Erros"**
2. Use a caixa de busca para encontrar algo específico
3. Use os filtros para refinar a busca
4. Clique em qualquer card para ver todos os detalhes

#### Revisar
1. Clique na aba **"🔄 Revisão"**
2. Leia a questão e tente responder mentalmente
3. Clique em **"👁️ Mostrar Resposta"** quando estiver pronto
4. Veja sua resposta errada, a resposta correta e a explicação
5. Clique em **"➡️ Próximo Erro"** para continuar
6. Use **"🔀 Embaralhar"** para mudar a ordem

#### Ver Estatísticas
1. Clique no botão **"📊 Estatísticas"** no topo
2. Veja seus números, disciplinas com mais erros, bancas, etc.
3. Use essas informações para direcionar seus estudos

#### Alternar Tema
- Clique no botão **🌙** (ou ☀️) no canto superior direito
- O app lembrará sua preferência

## 💾 Backup dos Dados

### Exportar (Manual)
Os dados ficam salvos no navegador (localStorage). Para fazer backup:

1. Abra o Console do Navegador:
   - Chrome/Edge: `F12` → Aba "Console"
   - Firefox: `F12` → Aba "Console"

2. Digite e pressione Enter:
```javascript
copy(localStorage.getItem('cadernoErros'))
```

3. Cole o conteúdo em um arquivo `.txt` e salve

### Importar (Manual)
1. Abra o Console do Navegador
2. Digite (substituindo SEUS_DADOS pelo conteúdo copiado):
```javascript
localStorage.setItem('cadernoErros', 'SEUS_DADOS')
```
3. Recarregue a página (`F5`)

### Backup Automático
**Dica:** Acesse sempre no mesmo navegador para manter seus dados. Se instalar como PWA, os dados ficam ainda mais seguros!

## 🌐 Funcionamento Offline

✅ O app funciona 100% offline depois da primeira visita!

Quando você acessa pela primeira vez (via servidor HTTP/HTTPS), o Service Worker baixa e guarda todos os arquivos necessários. Depois disso:

- ✅ Funciona sem internet
- ✅ Salva normalmente offline
- ✅ Todas as funcionalidades disponíveis
- ✅ Dados seguros no seu dispositivo

Um indicador **"📡 Modo Offline"** aparece quando você está sem internet.

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Google Chrome 67+ (Desktop e Android)
- ✅ Microsoft Edge 79+
- ✅ Firefox 63+
- ✅ Safari 11.1+ (macOS e iOS)
- ✅ Samsung Internet 8.2+
- ✅ Opera 54+

### Sistemas Operacionais
- ✅ Windows 10/11
- ✅ macOS 10.13+
- ✅ Linux (todas as distribuições modernas)
- ✅ Android 5.0+
- ✅ iOS 11.3+

### Funcionalidades PWA
| Funcionalidade | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| Instalação | ✅ | ✅ | ⚠️ | ✅* |
| Offline | ✅ | ✅ | ✅ | ✅ |
| Ícone na Home | ✅ | ✅ | ⚠️ | ✅ |
| Modo Standalone | ✅ | ✅ | ⚠️ | ✅ |

*Safari tem suporte parcial a PWAs

## 🗂️ Estrutura de Arquivos

```
Caderno de erros/
│
├── index.html              # Estrutura da aplicação
├── styles.css              # Estilos e design responsivo
├── app.js                  # Lógica principal da aplicação
├── service-worker.js       # Funcionalidade offline (PWA)
├── sw-register.js          # Registro do Service Worker
├── manifest.json           # Configuração PWA
└── README.md               # Este arquivo
```

## 🎯 Dicas de Uso

### Para Máxima Eficiência

1. **Cadastre imediatamente após errar**: A explicação fica fresca na memória
2. **Seja específico na explicação**: Quanto mais detalhes, melhor
3. **Use tags consistentes**: Facilita encontrar erros similares depois
4. **Revise regularmente**: Use o modo revisão pelo menos 2-3x por semana
5. **Analise as estatísticas**: Identifique padrões nos seus erros
6. **Instale como app**: Fica mais rápido e conveniente
7. **Faça backup periodicamente**: Especialmente antes de formatar ou trocar de navegador

### Sugestões de Tags

- `jurisprudencia` - Para questões baseadas em decisões judiciais
- `recente` - Para mudanças legislativas ou jurisprudenciais recentes
- `pegadinha` - Para questões que induzem ao erro
- `decoreba` - Para questões que exigem memorização
- `interpretacao` - Para questões que exigem análise
- `calculo` - Para questões matemáticas
- `literal` - Para questões que cobram texto literal da lei

### Organização de Disciplinas

Use nomenclatura consistente para facilitar filtros:
- ✅ "Direito Constitucional"
- ✅ "Português"
- ✅ "Raciocínio Lógico"
- ❌ "Dir. Const." (evite abreviações inconsistentes)

## ❓ Solução de Problemas

### O app não está salvando os dados
- Verifique se o navegador permite cookies e armazenamento local
- Não use modo anônimo/privado
- Limpe o cache e recarregue

### O botão "Instalar App" não aparece
- Certifique-se de estar acessando via HTTP/HTTPS (não file://)
- Use um servidor local (veja instruções acima)
- Alguns navegadores não suportam instalação (Firefox desktop)

### Perdi meus dados
- Se não fez backup, os dados podem estar perdidos
- Verifique se está usando o mesmo navegador e perfil
- Em PWA instalado, os dados ficam mais protegidos

### O app não funciona offline
- Acesse pelo menos uma vez online (via servidor HTTP/HTTPS)
- Aguarde o Service Worker ser registrado (mensagem no console)
- Recarregue a página após a primeira visita

### Temas não estão alternando
- Limpe o cache do navegador
- Verifique o console para erros JavaScript

## 🔄 Atualizações Futuras (Possíveis)

- [ ] Exportar para PDF ou Excel
- [ ] Importar questões de arquivos
- [ ] Gráficos de evolução ao longo do tempo
- [ ] Sistema de revisão espaçada inteligente
- [ ] Sincronização entre dispositivos (opcional)
- [ ] Modo competição com cronômetro
- [ ] Compartilhar erros com colegas

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins pessoais e educacionais.

## 💪 Sobre

Desenvolvido para ajudar concurseiros a transformarem erros em aprendizado e conquistas em aprovação!

**Versão:** 1.0.0  
**Atualizado em:** 2024

---

## 🆘 Suporte

Problemas ou sugestões? 

1. Verifique a seção "Solução de Problemas" acima
2. Confira se está usando a versão mais recente
3. Teste em outro navegador

---

## 🎓 Bons Estudos!

> "Cada erro é uma oportunidade de aprendizado. Não desperdice nenhuma!"

**Dica final:** Consistência é a chave. Use o app diariamente, mesmo que por 10-15 minutos. A repetição espaçada é comprovadamente eficaz para memorização de longo prazo.

**Boa sorte na sua jornada rumo à aprovação! 🚀**
