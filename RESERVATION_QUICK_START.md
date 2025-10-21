# Reservation Management - Quick Start 🚀

## What It Does
Manages 10 apartment rooms with photos, details, and availability status. Automatically syncs with Tenant Management to prevent double booking.

## Key Features
1. **10 Room Cards** - Visual grid layout
2. **Edit Photos** - Upload custom room images
3. **Edit Details** - Modify room information
4. **Status Badges** - Occupied (Red) or Available (Green)
5. **View Details** - See full room information
6. **Prevents Double Booking** - Syncs with tenant data

## How To Use

### View All Rooms
```
1. Click "📅 Reservation" in sidebar
2. See grid of 10 rooms (Room 01 - Room 10)
3. Check status: Green = Available, Red = Occupied
```

### Edit Room Photo & Details
```
1. Click "Edit" button on any room
2. Modal opens with edit form
3. Upload new photo (optional)
4. Edit inclusions, address, price
5. Click "Save Change"
6. Room updates instantly
```

### View Room Details
```
1. Click "View" on available room
2. See large photo and full details
3. Click ✏️ icon to edit
4. Click "Proceed" to continue booking
5. Click "Back to Rooms" to return
```

## Room Status Logic

### 🟢 Available
- No tenant assigned
- Can be viewed and reserved
- Shows "View" button

### 🔴 Occupied
- Tenant assigned in Tenant Management
- Cannot be reserved
- Only shows "Edit" button

## Data Flow

```
Tenant Management → API → Reservation System
    ↓
  Add tenant to "Room 05"
    ↓
  Room 05 status = "Occupied"
    ↓
  Delete tenant from "Room 05"
    ↓
  Room 05 status = "Available"
```

## Default Room Data
- **Number**: Room 01 to Room 10
- **Inclusions**: Kitchen, Bed Frame, Comfort Room
- **Address**: Washington Village, Maa
- **Others**: Water is divided depending on bill, 13 kWh
- **Price**: ₱ 6,000

## Tips
✅ **Photo Format**: Upload JPG, PNG, or GIF  
✅ **Room Numbers**: Keep format consistent (Room XX)  
✅ **Price**: Enter numbers only (no ₱ symbol)  
✅ **Status**: Updates automatically from tenants  
✅ **Data Persistence**: Saves to browser localStorage  

## Navigation
- **From Dashboard**: Click Reservation in sidebar
- **From Tenant Management**: Click Reservation in sidebar
- **From Room Details**: Click "Back to Rooms"

## Editing Workflow

### Quick Edit (From Grid)
```
Grid View → Edit Button → Modal → Save → Done
```

### Detail Edit (From Details View)
```
Grid → View → Details Page → ✏️ Icon → Modal → Save → Updated
```

## Common Actions

### Update Room Photo
```
1. Click "Edit"
2. Click "Room Photo" input
3. Select image file
4. Auto-saves when selected
5. Click "Save Change"
```

### Change Room Price
```
1. Click "Edit"
2. Find "Price" field
3. Enter new amount
4. Click "Save Change"
```

### Modify Inclusions
```
1. Click "Edit"
2. Update "Inclusions" field
3. Example: "Kitchen, AC, WiFi, Bed Frame"
4. Click "Save Change"
```

## Troubleshooting

**Room status wrong?**
- Check tenant is assigned to correct room number
- Room number in tenant must match exactly (e.g., "Room 05")

**Photo not showing?**
- Try smaller file size (< 5MB)
- Use common formats (JPG, PNG)

**Changes not saving?**
- Fill all required fields
- Check browser console for errors

## Integration with Tenant Management

### When you add a tenant:
1. Go to Tenant Management
2. Add new tenant
3. Assign to "Room 05"
4. Go to Reservation Management
5. Room 05 now shows "Occupied"

### When you remove a tenant:
1. Go to Tenant Management
2. Delete tenant from "Room 05"
3. Go to Reservation Management
4. Room 05 now shows "Available"

## URL
```
http://localhost/SammiesAptt/
(Click Reservation in sidebar)
```

## Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage enabled

## Summary
The Reservation Management System gives you a complete visual interface to manage your apartment rooms, track availability, and prevent double bookings automatically! 📅✨

Need help? Check RESERVATION_MANAGEMENT_GUIDE.md for detailed documentation.
