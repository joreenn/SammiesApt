# ✅ Enhanced Validation Rules - Complete Guide

## 📋 Validation Rules Implemented

### 1️⃣ **Name Validation**

#### Rules:
- ✅ **Required**: Cannot be empty
- ✅ **Letters Only**: Must contain only letters, spaces, dots (.), hyphens (-), and apostrophes (')
- ✅ **No Pure Numbers**: Cannot be just numbers (e.g., "123" is invalid)
- ✅ **Max Length**: 255 characters

#### Valid Examples:
- ✅ "Juan Dela Cruz"
- ✅ "Maria O'Connor"
- ✅ "Jose-Miguel Santos"
- ✅ "Dr. John Smith Jr."

#### Invalid Examples:
- ❌ "123456" (pure numbers)
- ❌ "Juan@2024" (contains @)
- ❌ "John_Doe" (contains underscore)
- ❌ "User#123" (contains #)

---

### 2️⃣ **Room Number Validation**

#### Rules:
- ✅ **Required**: Cannot be empty
- ✅ **Alphanumeric Only**: Letters and numbers only (A-Z, 0-9)
- ✅ **No Symbols**: No special characters, hyphens, or negative signs
- ✅ **Unique**: Each room number must be unique (no duplicates)
- ✅ **Case Insensitive**: "A1" and "a1" are treated as the same
- ✅ **Max Length**: 50 characters

#### Valid Examples:
- ✅ "101"
- ✅ "A1"
- ✅ "B202"
- ✅ "ROOM305"
- ✅ "2F3"

#### Invalid Examples:
- ❌ "-001" (negative sign)
- ❌ "A-1" (contains hyphen)
- ❌ "101B-2" (contains hyphen)
- ❌ "Room #5" (contains # and space)
- ❌ "A.1" (contains dot)
- ❌ Duplicate room numbers (if "101" exists, can't add another "101")

---

### 3️⃣ **Contact Number Validation** (Philippine Format)

#### Rules:
- ✅ **Required**: Cannot be empty
- ✅ **Philippine Format**: Must follow PH mobile format
- ✅ **Two Formats Accepted**:
  - Format 1: `09XXXXXXXXX` (11 digits starting with 09)
  - Format 2: `+639XXXXXXXXX` (13 characters starting with +639)
- ✅ **Only Digits**: No spaces, hyphens, or other symbols (except + at start)

#### Valid Examples:
- ✅ "09123456789"
- ✅ "09987654321"
- ✅ "+639123456789"
- ✅ "+639987654321"

#### Invalid Examples:
- ❌ "12345678901" (doesn't start with 09)
- ❌ "091234567" (too short)
- ❌ "0912345678901" (too long)
- ❌ "09-123-456-789" (contains hyphens)
- ❌ "09 123 456 789" (contains spaces)
- ❌ "(+63) 912-3456-789" (contains symbols)
- ❌ "9123456789" (missing leading 0)
- ❌ "8123456789" (doesn't start with 09)

---

### 4️⃣ **Email Validation**

#### Rules:
- ✅ **Required**: Cannot be empty
- ✅ **Valid Format**: Must be a valid email address
- ✅ **Unique**: Each email must be unique per tenant

#### Valid Examples:
- ✅ "juan@gmail.com"
- ✅ "user.name@example.com"
- ✅ "john_doe123@company.co.uk"

#### Invalid Examples:
- ❌ "notanemail" (no @ symbol)
- ❌ "@example.com" (no local part)
- ❌ "user@" (no domain)
- ❌ Duplicate emails

---

### 5️⃣ **Gender Validation**

#### Rules:
- ✅ **Required**: Must select one
- ✅ **Options**: Only "Male" or "Female"

---

### 6️⃣ **Avatar Validation**

#### Rules:
- ✅ **Optional**: Not required
- ✅ **File Types**: JPEG, PNG, GIF, WebP, AVIF
- ✅ **Max Size**: 5MB (5,120 KB)

#### Valid Files:
- ✅ image.jpg
- ✅ photo.png
- ✅ avatar.gif
- ✅ picture.webp
- ✅ modern.avif

#### Invalid Files:
- ❌ Files larger than 5MB
- ❌ document.pdf
- ❌ video.mp4
- ❌ file.txt

---

## 🎯 How Validation Works

### Frontend Validation (React)
1. **Client-side checks** happen when you click "Add" or "Save"
2. **Real-time feedback** shows errors immediately
3. **Prevents unnecessary API calls** if data is invalid
4. **User-friendly** with clear error messages

### Backend Validation (Laravel)
1. **Server-side checks** happen when data reaches the API
2. **Security layer** - cannot be bypassed by users
3. **Database protection** - prevents invalid data from being saved
4. **Returns detailed errors** for each field

---

## 🔄 Validation Flow

```
User fills form
      ↓
Frontend Validation (JavaScript)
      ↓
   Valid? ─── No ──→ Show error messages
      ↓
     Yes
      ↓
Send to Backend API
      ↓
Backend Validation (Laravel)
      ↓
   Valid? ─── No ──→ Return 422 error with details
      ↓
     Yes
      ↓
Check Uniqueness (Room, Email)
      ↓
  Unique? ─── No ──→ Return "already taken" error
      ↓
     Yes
      ↓
Save to Database
      ↓
Return Success (201 Created)
```

---

## 🧪 Testing Scenarios

### Test 1: Name Validation
```
Try: "123456"
Expected: ❌ "Name cannot be pure numbers."

Try: "Juan@2024"
Expected: ❌ "Name must contain only letters, spaces, dots, hyphens, and apostrophes."

Try: "Juan Dela Cruz"
Expected: ✅ Success
```

### Test 2: Room Validation
```
Try: "-001"
Expected: ❌ "Room number must contain only letters and numbers."

Try: "101"
Expected: ✅ Success

Try: "101" (when 101 already exists)
Expected: ❌ "This room number is already taken."
```

### Test 3: Contact Validation
```
Try: "12345678901"
Expected: ❌ "Contact must be a valid Philippine number."

Try: "09-123-456-789"
Expected: ❌ "Contact must be a valid Philippine number."

Try: "09123456789"
Expected: ✅ Success

Try: "+639123456789"
Expected: ✅ Success
```

---

## 🔧 Error Messages Reference

### Name Errors:
- `Name is required.`
- `Name cannot be pure numbers.`
- `Name must contain only letters, spaces, dots, hyphens, and apostrophes.`

### Room Errors:
- `Room is required.`
- `Room number must contain only letters and numbers (no symbols or negative signs).`
- `This room number is already taken.`

### Contact Errors:
- `Contact is required.`
- `Contact must be a valid Philippine number (e.g., 09123456789 or +639123456789).`

### Email Errors:
- `Email is required.`
- `Please enter a valid email address.`
- `The email has already been taken.`

### Avatar Errors:
- `Avatar must be less than 5MB.`
- `The avatar field must be a file of type: jpeg, png, jpg, gif, webp, avif.`

---

## 📝 Quick Reference Chart

| Field   | Min | Max | Format | Symbols | Unique | Required |
|---------|-----|-----|--------|---------|--------|----------|
| Name    | 1   | 255 | Letters, spaces, .-' | No | No | Yes |
| Room    | 1   | 50  | Alphanumeric | No | Yes | Yes |
| Contact | 11  | 13  | 09XXXXXXXXX or +639XXXXXXXXX | No | No | Yes |
| Email   | -   | -   | email@domain.com | Yes | Yes | Yes |
| Gender  | -   | -   | Male/Female | No | No | Yes |
| Avatar  | -   | 5MB | Image files | N/A | No | No |

---

## 🚀 Usage Examples

### ✅ Complete Valid Entry:
```
Name: Juan Dela Cruz
Room: 101
Contact: 09123456789
Email: juan@gmail.com
Gender: Male
Avatar: photo.jpg (2MB)
```

### ❌ Invalid Entry Examples:

#### Example 1: Invalid Name
```
Name: 12345
Room: 101
Contact: 09123456789
Error: "Name cannot be pure numbers."
```

#### Example 2: Invalid Room
```
Name: Juan Dela Cruz
Room: -001
Contact: 09123456789
Error: "Room number must contain only letters and numbers."
```

#### Example 3: Invalid Contact
```
Name: Juan Dela Cruz
Room: 101
Contact: 12345678901
Error: "Contact must be a valid Philippine number."
```

#### Example 4: Duplicate Room
```
Name: Maria Santos
Room: 101 (already exists)
Contact: 09987654321
Error: "This room number is already taken."
```

---

## 💡 Tips for Users

1. **Name**: Use natural names with proper spelling
2. **Room**: Keep it simple - just letters and numbers
3. **Contact**: Always start with 09 for Philippine numbers
4. **Email**: Use a valid email format with @ and domain
5. **Avatar**: Keep images under 5MB for faster uploads

---

**Status**: ✅ **FULLY IMPLEMENTED** - All validation rules active and working!
