// Copy BibTeX functionality for research page
document.addEventListener('DOMContentLoaded', function() {
    // Find all details elements that contain BibTeX
    const bibtexDetails = document.querySelectorAll('details');

    bibtexDetails.forEach(detail => {
        const summary = detail.querySelector('summary');
        if (summary && summary.textContent.includes('BibTeX')) {
            // Find the code block within this details element
            const codeBlock = detail.querySelector('pre code');
            if (codeBlock) {
                // Create copy button
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-bibtex-btn';
                copyBtn.textContent = 'Copy';
                copyBtn.setAttribute('aria-label', 'Copy BibTeX to clipboard');

                // Style the button
                copyBtn.style.cssText = `
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.875rem;
                    border: 1px solid var(--border-color, #ddd);
                    background: var(--background, white);
                    color: var(--color, #333);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: inherit;
                `;

                // Add hover effect
                copyBtn.addEventListener('mouseenter', function() {
                    this.style.background = 'var(--accent, #007bff)';
                    this.style.color = 'white';
                    this.style.borderColor = 'var(--accent, #007bff)';
                });

                copyBtn.addEventListener('mouseleave', function() {
                    if (this.textContent !== 'Copied!') {
                        this.style.background = 'var(--background, white)';
                        this.style.color = 'var(--color, #333)';
                        this.style.borderColor = 'var(--border-color, #ddd)';
                    }
                });

                // Add click event
                copyBtn.addEventListener('click', async function(e) {
                    e.stopPropagation(); // Prevent details toggle

                    const bibtexText = codeBlock.textContent;

                    try {
                        await navigator.clipboard.writeText(bibtexText);

                        // Visual feedback
                        copyBtn.textContent = 'Copied!';
                        copyBtn.style.background = '#28a745';
                        copyBtn.style.color = 'white';
                        copyBtn.style.borderColor = '#28a745';

                        // Reset after 2 seconds
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                            copyBtn.style.background = 'var(--background, white)';
                            copyBtn.style.color = 'var(--color, #333)';
                            copyBtn.style.borderColor = 'var(--border-color, #ddd)';
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy BibTeX:', err);
                        copyBtn.textContent = 'Failed';
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                        }, 2000);
                    }
                });

                // Position the pre element relatively
                const pre = detail.querySelector('pre');
                if (pre) {
                    pre.style.position = 'relative';
                    pre.appendChild(copyBtn);
                }
            }
        }
    });
});
