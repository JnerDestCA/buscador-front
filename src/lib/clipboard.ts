export async function copyToClipboard(text: string): Promise<{ success: boolean; needsManualCopy: boolean }> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true, needsManualCopy: false };
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return { success: true, needsManualCopy: false };
    }
  } catch (error) {
    return { success: false, needsManualCopy: true };
  }
}

export function showManualCopyDialog(text: string): void {
  // Create a temporary input for manual copy
  const dialog = document.createElement("div");
  dialog.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    width: 90%;
  `;
  
  dialog.innerHTML = `
    <p style="margin: 0 0 10px 0; font-size: 14px; color: #374151;">
      Pulsa Ctrl+C para copiar
    </p>
    <input 
      type="text" 
      value="${text.replace(/"/g, '&quot;')}" 
      style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 12px;"
      readonly
    />
    <button 
      id="close-copy-dialog" 
      style="margin-top: 10px; padding: 6px 12px; background: #059669; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      Cerrar
    </button>
  `;
  
  document.body.appendChild(dialog);
  
  const input = dialog.querySelector("input") as HTMLInputElement;
  input.select();
  input.focus();
  
  dialog.querySelector("#close-copy-dialog")?.addEventListener("click", () => {
    document.body.removeChild(dialog);
  });
  
  // Close on Escape
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      document.body.removeChild(dialog);
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
}
