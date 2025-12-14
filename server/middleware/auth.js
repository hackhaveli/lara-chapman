// Simple authentication middleware
// In production, you should use a more robust solution like JWT or OAuth

const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'No authorization header provided'
        });
    }

    // Basic Auth: "Basic base64(username:password)"
    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
        return res.status(401).json({
            success: false,
            message: 'Invalid authorization format'
        });
    }

    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');

    // Check against environment variables
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'larachapman2024';

    if (username === adminUsername && password === adminPassword) {
        req.isAdmin = true;
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
};

// Verify login endpoint
const verifyLogin = (req, res) => {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'larachapman2024';

    if (username === adminUsername && password === adminPassword) {
        // Create a simple token (in production, use JWT)
        const token = Buffer.from(`${username}:${password}`).toString('base64');
        res.json({
            success: true,
            token,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
};

module.exports = { adminAuth, verifyLogin };
