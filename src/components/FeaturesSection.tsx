export default function FeaturesSection() {
    const features = [
        {
            icon: 'key',
            title: 'PIN-Based Encryption',
            description: 'Advanced mathematical encryption using PIN multipliers and offset algorithms for maximum security.'
        },
        {
            icon: 'globe',
            title: 'Global Support',
            description: 'Supports 195+ ISO country codes for worldwide deployment and international compatibility.'
        },
        {
            icon: 'compress-alt',
            title: 'Compact Format',
            description: 'Converts complex personal data into efficient hexadecimal strings for optimized storage.'
        },
        {
            icon: 'sync-alt',
            title: 'Bidirectional Processing',
            description: 'Complete reversible encoding/decoding system with full data integrity verification.'
        }
    ];

    return (
        <section id="features" className="py-20">
            <div className="text-center mb-16 px-4">
                <h2 className="section-title">Key Features</h2>
                <p className="text-lg text-text-secondary max-w-xl mx-auto">
                    Discover what makes our API stand out from the rest
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card group">
                        <i className={`fas fa-${feature.icon} text-4xl mb-4 bg-accent-gradient bg-clip-text text-transparent`}></i>
                        <h3 className="text-xl font-bold mb-4 font-mono">{feature.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
