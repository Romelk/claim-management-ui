module.exports = {
    theme: {
        // your existing theme settings
    },
    plugins: [],
    corePlugins: {
        // your existing core plugins
    },
    // Add this to extend the base styles
    extend: {
        base: {
            'html': {
                fontSmoothing: 'antialiased',
            },
        },
    },
}