# 🔐 GitHub Secrets Setup Checklist

## Firebase Credentials Needed

Get these values from Firebase Console:
https://console.firebase.google.com/ → Your Project → Settings (⚙️) → Your apps → Config

## ✅ Secrets to Add

Navigate to: https://github.com/burakintisah/burakintisah.github.io/settings/secrets/actions

Add these 7 secrets one by one:

### 1. VITE_FIREBASE_API_KEY
- **Name**: `VITE_FIREBASE_API_KEY`
- **Value**: Your API Key (starts with AIza...)
- [ ] Added

### 2. VITE_FIREBASE_AUTH_DOMAIN
- **Name**: `VITE_FIREBASE_AUTH_DOMAIN`
- **Value**: Your Auth Domain (ends with .firebaseapp.com)
- [ ] Added

### 3. VITE_FIREBASE_PROJECT_ID
- **Name**: `VITE_FIREBASE_PROJECT_ID`
- **Value**: Your Project ID
- [ ] Added

### 4. VITE_FIREBASE_STORAGE_BUCKET
- **Name**: `VITE_FIREBASE_STORAGE_BUCKET`
- **Value**: Your Storage Bucket (ends with .appspot.com)
- [ ] Added

### 5. VITE_FIREBASE_MESSAGING_SENDER_ID
- **Name**: `VITE_FIREBASE_MESSAGING_SENDER_ID`
- **Value**: Your Messaging Sender ID (numbers only)
- [ ] Added

### 6. VITE_FIREBASE_APP_ID
- **Name**: `VITE_FIREBASE_APP_ID`
- **Value**: Your App ID (format: 1:...:web:...)
- [ ] Added

### 7. VITE_FIREBASE_MEASUREMENT_ID
- **Name**: `VITE_FIREBASE_MEASUREMENT_ID`
- **Value**: Your Measurement ID (starts with G-)
- [ ] Added

## 🎯 How to Add Each Secret

For each secret above:

1. Click **"New repository secret"**
2. Enter the **Name** exactly as shown (copy-paste recommended)
3. Enter the **Value** from your Firebase config
4. Click **"Add secret"**
5. Repeat for all 7 secrets

## ✅ Verification

After adding all secrets, you should see 7 secrets listed:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

## 🚨 Important Notes

- ⚠️ **Never commit these values to git**
- ✅ Secrets are encrypted and only accessible to GitHub Actions
- ✅ You can update them anytime
- ✅ They won't be visible after saving (security feature)

## 📸 Example Screenshot Guide

Your Firebase config looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXX",           // → VITE_FIREBASE_API_KEY
  authDomain: "myproject.firebaseapp.com",    // → VITE_FIREBASE_AUTH_DOMAIN
  projectId: "myproject-12345",               // → VITE_FIREBASE_PROJECT_ID
  storageBucket: "myproject.appspot.com",     // → VITE_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789012",          // → VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123:web:abc123",                  // → VITE_FIREBASE_APP_ID
  measurementId: "G-XXXXXXXXXX"               // → VITE_FIREBASE_MEASUREMENT_ID
};
```

---

✅ After adding all secrets, return to the terminal and confirm!
