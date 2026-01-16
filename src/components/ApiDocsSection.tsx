export default function ApiDocsSection() {
    return (
        <section id="docs" className="py-20">
            <div className="text-center mb-16 px-4">
                <h2 className="section-title">API Documentation</h2>
                <p className="text-lg text-text-secondary">
                    Explore our comprehensive API endpoints
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
                <div className="endpoint-card">
                    <h3 className="text-lg font-bold mb-4 font-mono text-accent-primary">
                        <code className="bg-bg-tertiary px-3 py-2 rounded text-sm text-accent-primary border border-border">GET /api/health</code>
                    </h3>
                    <p className="text-text-secondary leading-relaxed mt-4">Check API health status</p>
                </div>
                <div className="endpoint-card">
                    <h3 className="text-lg font-bold mb-4 font-mono text-accent-primary">
                        <code className="bg-bg-tertiary px-3 py-2 rounded text-sm text-accent-primary border border-border">GET /api/countries</code>
                    </h3>
                    <p className="text-text-secondary leading-relaxed mt-4">Retrieve list of supported countries</p>
                </div>
                <div className="endpoint-card">
                    <h3 className="text-lg font-bold mb-4 font-mono text-accent-primary">
                        <code className="bg-bg-tertiary px-3 py-2 rounded text-sm text-accent-primary border border-border">POST /api/generate</code>
                    </h3>
                    <p className="text-text-secondary leading-relaxed mt-4">Generate a new SIN code from personal information</p>
                </div>
                <div className="endpoint-card">
                    <h3 className="text-lg font-bold mb-4 font-mono text-accent-primary">
                        <code className="bg-bg-tertiary px-3 py-2 rounded text-sm text-accent-primary border border-border">POST /api/decode</code>
                    </h3>
                    <p className="text-text-secondary leading-relaxed mt-4">Decode a SIN code back to personal information</p>
                </div>
            </div>
        </section>
    );
}
