'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-bg-secondary border border-border hover:border-accent-primary transition-colors"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent-primary" />
          ) : (
            <Copy className="w-4 h-4 text-text-secondary" />
          )}
        </button>
      </div>

      <div className="p-4">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
