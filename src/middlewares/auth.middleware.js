const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env vars missing: SUPABASE_URL or SUPABASE_ANON_KEY');
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token missing' });

    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });

    req.user = data.user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authMiddleware;
