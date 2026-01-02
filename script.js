// Configuração - URL do webhook n8n
// Detecta automaticamente se está no GitHub Pages ou local
let N8N_WEBHOOK_URL;

// Verifica se há uma meta tag configurada
const metaTag = document.querySelector('meta[name="n8n-webhook-url"]');
if (metaTag && metaTag.content) {
    N8N_WEBHOOK_URL = metaTag.content;
} else if (window.N8N_WEBHOOK_URL) {
    // Verifica se há variável global configurada
    N8N_WEBHOOK_URL = window.N8N_WEBHOOK_URL;
} else {
    // Detecta se está no GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
        // Para GitHub Pages, use a URL do n8n cloud
        // URL baseada no instanceId do n8n: 38686966-5bcc-490b-a9f3-e27b043b1eed
        N8N_WEBHOOK_URL = 'https://38686966-5bcc-490b-a9f3-e27b043b1eed.app.n8n.cloud/webhook/photo-editor';
    } else {
        // Para desenvolvimento local
        N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/photo-editor';
    }
}

// Elementos DOM
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const removeImage = document.getElementById('removeImage');
const promptInput = document.getElementById('promptInput');
const processBtn = document.getElementById('processBtn');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');
const errorMessage = document.getElementById('errorMessage');

let selectedFile = null;

// Event listeners para upload
uploadArea.addEventListener('click', () => imageInput.click());
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
imageInput.addEventListener('change', handleFileSelect);
removeImage.addEventListener('click', removeSelectedImage);

// Event listeners para processamento
promptInput.addEventListener('input', updateProcessButton);
processBtn.addEventListener('click', processImage);

function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showError('Por favor, selecione um arquivo de imagem válido.');
        return;
    }

    selectedFile = file;
    
    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewSection.style.display = 'block';
        uploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
    
    updateProcessButton();
    hideError();
}

function removeSelectedImage() {
    selectedFile = null;
    previewImage.src = '';
    previewSection.style.display = 'none';
    uploadArea.style.display = 'block';
    imageInput.value = '';
    updateProcessButton();
    hideError();
    hideResult();
}

function updateProcessButton() {
    const hasImage = selectedFile !== null;
    const hasPrompt = promptInput.value.trim().length > 0;
    processBtn.disabled = !(hasImage && hasPrompt);
}

async function processImage() {
    if (!selectedFile || !promptInput.value.trim()) {
        showError('Por favor, selecione uma imagem e insira um prompt.');
        return;
    }

    // Mostrar loading
    setLoading(true);
    hideError();
    hideResult();

    try {
        // Converter imagem para base64
        const base64Image = await fileToBase64(selectedFile);
        
        // Preparar dados para envio
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('prompt', promptInput.value.trim());
        formData.append('imageBase64', base64Image);

        // Enviar para n8n
        // Nota: Se houver erro de CORS, pode ser necessário configurar CORS no n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            credentials: 'omit'
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        
        // Mostrar resultado
        showResult(result);
        
    } catch (error) {
        console.error('Erro ao processar imagem:', error);
        
        // Mensagem de erro mais específica para CORS
        let errorMessage = error.message;
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            errorMessage = 'Erro de CORS: O n8n precisa estar configurado para permitir requisições do GitHub Pages. Verifique as configurações de CORS no n8n.';
        }
        
        showError(`Erro ao processar imagem: ${errorMessage}. Verifique se o n8n está rodando e o webhook está configurado corretamente.`);
    } finally {
        setLoading(false);
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // Remover o prefixo data:image/...;base64,
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function setLoading(loading) {
    if (loading) {
        processBtn.disabled = true;
        document.querySelector('.btn-text').style.display = 'none';
        document.querySelector('.btn-loader').style.display = 'flex';
    } else {
        updateProcessButton();
        document.querySelector('.btn-text').style.display = 'block';
        document.querySelector('.btn-loader').style.display = 'none';
    }
}

function showResult(result) {
    // O resultado pode vir em diferentes formatos dependendo da resposta do n8n
    let resultText = '';
    
    // O n8n retorna o resultado no formato { result: "...", success: true }
    if (result && result.result) {
        resultText = result.result;
    } else if (typeof result === 'string') {
        resultText = result;
    } else if (result.text || result.content || result.message) {
        resultText = result.text || result.content || result.message;
    } else if (result.choices && result.choices[0] && result.choices[0].message) {
        resultText = result.choices[0].message.content;
    } else {
        resultText = JSON.stringify(result, null, 2);
    }
    
    resultContent.textContent = resultText;
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResult() {
    resultSection.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideError() {
    errorMessage.style.display = 'none';
}
