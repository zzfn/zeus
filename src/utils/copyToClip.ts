export function copyToClip(content: string) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(content);
  } else {
    const ipt = document.createElement('input');
    ipt.setAttribute('value', content);
    document.body.appendChild(ipt);
    ipt.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(ipt);
    return successful;
  }
}
