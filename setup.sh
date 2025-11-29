#!/bin/bash
# Setup script for API (Linux/Mac)

echo "Starting API setup..."

# 1. Install dependencies
echo "Installing dependencies..."
npm install

# 2. Create .env from .env.example
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env created! Fill in your Supabase credentials."
else
    echo "✓ .env file already exists"
fi

# 3. List folder structure
echo ""
echo "Project structure:"
ls -la src/

echo ""
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Fill in .env with your Supabase credentials"
echo "2. Run: npm run dev"
echo "3. Test: GET http://localhost:3001/health"
echo ""
echo "For more details, see README.md"
