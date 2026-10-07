# 📦 Como Importar Dados de Exemplo

Se você quiser testar o app com alguns dados já cadastrados, siga estas instruções:

## Método 1: Console do Navegador (Recomendado)

1. **Abra o aplicativo** no navegador
   - Clique duas vezes em `index.html`, ou
   - Use o servidor local (`iniciar-servidor.bat`)

2. **Abra o Console do Navegador:**
   - Pressione `F12` (ou `Ctrl+Shift+I` no Chrome)
   - Clique na aba **"Console"**

3. **Abra o arquivo `dados-exemplo.json`** em um editor de texto
   - Copie TODO o conteúdo (Ctrl+A, Ctrl+C)

4. **No Console, digite e execute:**
   ```javascript
   localStorage.setItem('cadernoErros', `COLE_AQUI_O_CONTEUDO_DO_ARQUIVO`)
   ```
   
   **Exemplo completo:**
   ```javascript
   localStorage.setItem('cadernoErros', '[{"id":"1697840000000","disciplina":"Direito Constitucional",...}]')
   ```

5. **Recarregue a página** (pressione `F5`)

6. **Pronto!** Você verá 7 erros de exemplo já cadastrados

## Método 2: Funcionalidade Futura de Importação

*Em desenvolvimento: Uma funcionalidade de importação direta pelo app será adicionada em versões futuras.*

## O Que Está Incluído nos Dados de Exemplo?

Os dados de exemplo contêm **7 erros** de diferentes disciplinas:

1. ✅ **Direito Constitucional** (Acerto - para mostrar que você pode registrar acertos também)
   - Gerações de direitos fundamentais
   - 3 revisões

2. ❌ **Português** (Erro)
   - Concordância verbal com verbos impessoais
   - 5 revisões (mais revisado)

3. ❌ **Raciocínio Lógico** (Erro)
   - Sequências numéricas com padrão crescente
   - 2 revisões

4. ❌ **Direito Administrativo** (Erro)
   - Princípios da administração - pegadinha importante
   - 4 revisões

5. ✅ **Informática** (Acerto)
   - Segurança da informação - phishing
   - 1 revisão

6. ❌ **Matemática** (Erro)
   - Porcentagem - pegadinha clássica
   - 3 revisões

7. ❌ **Direito Penal** (Erro)
   - Legítima defesa de terceiro
   - 2 revisões

## Benefícios de Usar Dados de Exemplo

✅ **Visualizar todas as funcionalidades** imediatamente  
✅ **Testar filtros** com múltiplas disciplinas e bancas  
✅ **Ver estatísticas** com dados realistas  
✅ **Experimentar o modo revisão** sem precisar cadastrar primeiro  
✅ **Entender o formato** de cadastro ideal  

## Limpar os Dados de Exemplo

Se quiser remover os dados de exemplo depois:

**Opção 1 - Via Console:**
```javascript
localStorage.removeItem('cadernoErros')
```

**Opção 2 - Via App:**
- Delete cada erro manualmente usando o botão 🗑️

**Opção 3 - Via Navegador:**
- Chrome: F12 → Application → Local Storage → Botão direito → Clear
- Firefox: F12 → Storage → Local Storage → Botão direito → Delete All

## Criar Seus Próprios Dados de Exemplo

Você pode criar seu próprio arquivo JSON com a mesma estrutura:

```json
[
  {
    "id": "TIMESTAMP_UNICO",
    "disciplina": "Nome da Disciplina",
    "banca": "Nome da Banca",
    "concurso": "Concurso Ano",
    "assunto": "Assunto Específico",
    "questao": "Enunciado da questão...",
    "minhaResposta": "Sua resposta",
    "respostaCorreta": "Resposta correta",
    "explicacao": "Por que errou e o que aprendeu...",
    "dificuldade": "facil|medio|dificil",
    "tags": ["tag1", "tag2", "tag3"],
    "dataRegistro": "2024-10-27T10:00:00.000Z",
    "revisoes": 0,
    "ultimaRevisao": null
  }
]
```

### Dicas para criar IDs únicos:

Use o timestamp atual em JavaScript:
```javascript
Date.now().toString()
// Exemplo: "1697900000000"
```

Ou use um gerador online: https://currentmillis.com/

## Exportar Seus Dados Reais

Depois de usar o app por um tempo, você pode exportar seus dados:

1. Abra o Console (F12)
2. Digite:
   ```javascript
   copy(localStorage.getItem('cadernoErros'))
   ```
3. Cole em um arquivo `.json` ou `.txt`
4. Salve como backup!

## Importar Seus Dados em Outro Dispositivo

Use o mesmo método do passo 1, mas com seus dados exportados.

---

**Dica:** Faça backups regulares dos seus dados reais! Especialmente antes de limpar o navegador ou formatar o computador.

## Solução de Problemas

**"Não apareceu nada depois de importar"**
- Verifique se copiou TODO o conteúdo do arquivo
- Certifique-se de que está entre aspas simples ou crases
- Recarregue a página (F5)

**"Deu erro no Console"**
- Verifique se o JSON está válido (sem vírgulas extras, colchetes fechados)
- Use um validador JSON: https://jsonlint.com/

**"Os dados desapareceram"**
- Não use modo anônimo/privado do navegador
- Verifique se o navegador permite localStorage
- Certifique-se de não ter limpado o cache

---

**Divirta-se explorando o app! 📚**
