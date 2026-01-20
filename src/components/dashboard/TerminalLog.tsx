'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Cpu, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LogEntry {
    type: 'info' | 'success' | 'warning' | 'error' | 'security' | 'processing';
    message: string;
    timestamp: string;
}

interface TerminalLogProps {
    logs: LogEntry[];
    className?: string;
}

export function TerminalLog({ logs, className }: TerminalLogProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const getIcon = (type: LogEntry['type']) => {
        switch (type) {
            case 'security': return <Lock className="w-3 h-3 text-accent-primary" />;
            case 'processing': return <Cpu className="w-3 h-3 text-accent-secondary animate-pulse" />;
            case 'error': return <ShieldAlert className="w-3 h-3 text-red-500" />;
            default: return null;
        }
    };

    const getTypeStyle = (type: LogEntry['type']) => {
        switch (type) {
            case 'success': return 'text-accent-primary';
            case 'warning': return 'text-yellow-500';
            case 'error': return 'text-red-500';
            case 'security': return 'text-accent-primary font-bold';
            case 'processing': return 'text-accent-secondary';
            default: return 'text-text-muted';
        }
    };

    return (
        <div className={cn(
            "bg-black/80 rounded-lg border border-border/50 font-mono text-xs overflow-hidden flex flex-col",
            className
        )}>
            <div className="bg-bg-tertiary px-3 py-2 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-3 h-3 text-text-muted" />
                    <span className="text-text-muted uppercase tracking-widest font-bold">Protocol Terminal</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>
            <div
                ref={scrollRef}
                className="p-4 space-y-2 overflow-y-auto flex-1 scrollbar-hide"
                style={{ height: '300px' }}
            >
                {logs.length === 0 ? (
                    <div className="text-text-muted/30 italic">Awaiting protocol signals...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="flex gap-3 animate-fade-in">
                            <span className="text-text-muted/40 whitespace-nowrap">[{log.timestamp}]</span>
                            <div className="flex items-center gap-2">
                                {getIcon(log.type)}
                                <span className={cn(getTypeStyle(log.type))}>
                                    {log.message}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
