#!/bin/bash
# TezCV.uz — Loyihani ishga tushirish skripti

echo "=== TezCV.uz Ishga tushirilmoqda ==="

# Backend
echo ""
echo ">>> Backend (Django) sozlanmoqda..."
cd backend

if [ ! -d "venv" ]; then
    echo "Virtual environment yaratilmoqda..."
    python3 -m venv venv
fi

source venv/bin/activate
echo "Kutubxonalar o'rnatilmoqda..."
pip install -r requirements.txt -q

echo "Migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Backend ishga tushirilmoqda (port 8000)..."
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!
deactivate

# Frontend
echo ""
echo ">>> Frontend (React) sozlanmoqda..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "npm paketlari o'rnatilmoqda..."
    npm install
fi

echo "Frontend ishga tushirilmoqda (port 3000)..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=============================="
echo "TezCV.uz muvaffaqiyatli ishga tushdi!"
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Admin:    http://localhost:8000/admin"
echo ""
echo "To'xtatish uchun: Ctrl+C"
echo "=============================="

# Wait and cleanup
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'TezCV to\'xtatildi.'" EXIT
wait
