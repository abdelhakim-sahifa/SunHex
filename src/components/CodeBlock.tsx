'use client';

import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  // Enhanced syntax highlighting with website colors
  const highlightCode = (code: string) => {
    let highlighted = code;

    // Keywords
    const keywords = ['const', 'let', 'var', 'async', 'await', 'function', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'new', 'class', 'import', 'export', 'from', 'default', 'method', 'POST', 'GET'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      highlighted = highlighted.replace(regex, '<span class="syntax-keyword">$1</span>');
    });

    // Strings (double quotes)
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="syntax-string">"$1"</span>');
    // Strings (single quotes)
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="syntax-string">\'$1\'</span>');
    // Template literals
    highlighted = highlighted.replace(/`([^`]*)`/g, '<span class="syntax-template">`$1`</span>');

    // Comments
    highlighted = highlighted.replace(/\/\/(.*?)$/gm, '<span class="syntax-comment">//$1</span>');
    highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (match) => `<span class="syntax-comment">${match}</span>`);

    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>');

    // Functions (word followed by parenthesis)
    highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="syntax-function">$1</span>(');

    // Properties (after dot)
    highlighted = highlighted.replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '.<span class="syntax-property">$1</span>');

    // Special values
    highlighted = highlighted.replace(/\b(true|false|null|undefined)\b/g, '<span class="syntax-value">$1</span>');

    return highlighted;
  };

  return (
    <div className="code-block-wrapper">
      <pre className="code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
      <style jsx>{`
        .code-block-wrapper {
          background: var(--code-bg);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .code-block {
          margin: 0;
          padding: 1rem;
          overflow-x: auto;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          line-height: 1.7;
          color: var(--text-primary);
          white-space: pre;
          word-wrap: normal;
        }
        .code-block::-webkit-scrollbar {
          height: 0px;
          display: none;
        }
        .code-block code {
          font-family: inherit;
          display: inline-block;
          min-width: 100%;
        }
        :global(.syntax-keyword) {
          color: #00FFB3;
          font-weight: 600;
        }
        :global(.syntax-string) {
          color: #FFB800;
        }
        :global(.syntax-template) {
          color: #FFD700;
        }
        :global(.syntax-comment) {
          color: #6A9955;
          font-style: italic;
          opacity: 0.8;
        }
        :global(.syntax-number) {
          color: #00D9FF;
        }
        :global(.syntax-function) {
          color: #00FFB3;
          font-weight: 500;
        }
        :global(.syntax-property) {
          color: #8BE9FD;
        }
        :global(.syntax-value) {
          color: #FF79C6;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
