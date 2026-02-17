# ========================================
# Dockerfile لـ Next.js (front-tiwtter)
# ========================================

# 1️⃣ استخدم صورة Node خفيفة
FROM node:20

# 2️⃣ أنشئ مجلد العمل داخل الكونتينر
WORKDIR /app

# 3️⃣ انسخ ملفات package.json و package-lock.json أولًا لتسريع البناء
COPY package*.json ./

# 4️⃣ ثبت كل التبعيات
RUN npm install

# 5️⃣ انسخ باقي ملفات المشروع
COPY . .

# 6️⃣ افتح البورت 3000
EXPOSE 3000

# 7️⃣ شغل الأمر الصحيح (الموجود في package.json)
CMD ["npm", "run", "dev"]
