export const showMessage = (msg, type = 'info') => {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) {
        console.warn('showMessage: #message-container not found');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `p-3 rounded-lg shadow-md mb-3 flex items-center justify-between animate-fadeIn ${
        type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
        type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
        'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    
    const span = document.createElement('span');
    span.textContent = msg;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'material-icons text-lg ml-4 opacity-75 hover:opacity-100';
    closeBtn.textContent = 'close';
    closeBtn.onclick = () => messageDiv.remove();

    messageDiv.appendChild(span);
    messageDiv.appendChild(closeBtn);

    messageContainer.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
};
