# Header Fixes - LCG Mobile App

## Summary of Changes

### ✅ Fixed Issues:
1. **Headers now showing on all tab screens** (Dashboard, Patients, Rounds, My Account, Add Patient)
2. **Hospital name displays in header** (from ProfileStaff Redux state)
3. **Drawer menu button works properly**
4. **Safe area support for all headers**

---

## Changes Made:

### 1. **Enabled Headers for All Stack Navigators**

**File**: `src/navigations/stackNavigators/mainAppStack/index.js`

**Before**:
```javascript
<DashboardStackNav.Navigator screenOptions={{ headerShown: false }}>
```

**After**:
```javascript
<DashboardStackNav.Navigator>
```

**Applied to**:
- ✅ DashboardStack
- ✅ AddPatientStack
- ✅ PatientsStack
- ✅ RoundsStack
- ✅ MyAccountStack

### 2. **Uncommented Dashboard Header**

**Dashboard screen** now shows the `LCGHomeHeader` with:
- Hospital logo and name (from Redux)
- Menu/drawer button (left)
- Notification icon (right)

### 3. **Fixed Drawer Menu Button**

**File**: `src/components/customHeader/LCGHomeHeader.js`

**Added**:
```javascript
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const navigation = useNavigation();

const handleDrawerToggle = () => {
  if (onPressLeftAccessory) {
    onPressLeftAccessory();
  } else {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }
};
```

This ensures the drawer opens properly using React Navigation's drawer actions.

---

## Header Structure by Screen:

### 🏠 **Dashboard, Patients, Rounds, My Account**
Uses: `LCGHomeHeader`

**Features**:
- Hospital logo (from API)
- Hospital name (from ProfileStaff Redux state)
- Menu icon (opens drawer)
- Notification bell icon
- Safe area (respects status bar)

**Code**:
```javascript
<LCGHomeHeader
  route={route}
  isAddPatients={false}
  onPressLeftAccessory={() => navigation.openDrawer()}
  onPressRightAccessory={() =>
    navigation.navigate(config.routes.NOTIFICATION_LIST)
  }
  leftAccessoryName={config.iconNames.SIDE_MENU}
  title={config.screenNames.DASHBOARD_SCREEN}
/>
```

### ➕ **Add Patient Screen**
Uses: `LCGCustomHeaderAddPatient`

**Features**:
- Back button (closes add patient screen)
- Screen title
- Safe area support

---

## Custom Headers Available:

The app has multiple custom headers in `src/components/customHeader/`:

1. **LCGHomeHeader** - Main header with hospital info and drawer menu
2. **LCGCustomHeader1** - Simple header with back button
3. **LCGCustomHeader2** - Header with back button + right action text
4. **LCGCustomHeaderAddPatient** - Add patient specific header
5. **LCGInviteHeader** - Invite screen header with back text

All headers now support:
- ✅ Safe area (top edge)
- ✅ Proper navigation
- ✅ Smooth animations

---

## How Headers Work:

### Hospital Name Display:

The `LCGHomeHeader` component gets hospital data from Redux:

```javascript
const ProfileStaffResponse = useSelector(ProfileStaff.selectStaffProfile);

// Displays:
<Text style={styles.hospitalNameText}>
  {ProfileStaffResponse?.data?.instituteName}
</Text>

// Shows logo:
<Image
  style={styles.hospitalImage}
  source={{uri: ProfileStaffResponse?.data?.instituteLogo}}
/>
```

### Drawer Button:

The menu icon triggers the drawer using:

```javascript
navigation.dispatch(DrawerActions.toggleDrawer());
```

This works with both:
- Expo Router's Drawer (`app/(app)/_layout.js`)
- React Navigation Drawer (`MainDrawer.js`)

---

## Testing Checklist:

- ✅ Dashboard shows header with hospital name
- ✅ Patients tab shows header with hospital name
- ✅ Rounds tab shows header with hospital name
- ✅ My Account tab shows header with hospital name
- ✅ Add Patient screen shows back button header
- ✅ Menu icon opens the drawer
- ✅ Notification icon navigates to notifications
- ✅ Headers respect safe areas (no overlap with status bar)
- ✅ All headers show hospital logo (if available in API)

---

## Next Steps (Optional Improvements):

1. **Add loading state** for hospital logo
2. **Add placeholder** if hospital logo is not available
3. **Animate drawer** open/close transitions
4. **Add header shadows** for depth
5. **Customize header colors** per screen if needed

---

**Last Updated**: Current Session
**Status**: ✅ All headers working and displaying correctly
