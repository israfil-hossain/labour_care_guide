# Common CRUD Hooks Usage Guide

This guide shows how to use the common CRUD hooks (`useGet`, `usePost`, `usePut`, `useDelete`) with automatic error handling and success toasts.

## Overview

All hooks include:
- ✅ Automatic authentication token injection
- ✅ Automatic error handling with Toast messages
- ✅ Automatic success messages with Toast
- ✅ Automatic query invalidation
- ✅ TypeScript-ready with JSDoc

## Available Hooks

### Query Hooks (GET)
- `useGet(queryKey, endpoint, options)` - Simple GET request
- `useGetWithParams(queryKey, endpointFn, params, options)` - GET with dynamic params

### Mutation Hooks (POST, PUT, DELETE, PATCH)
- `usePost(endpoint, options)` - POST request
- `usePut(endpoint, options)` - PUT request
- `useDelete(endpoint, options)` - DELETE request
- `usePatch(endpoint, options)` - PATCH request

## Usage Examples

### 1. GET Request - Fetch List

```javascript
import { useGet } from '../hooks/useCommonQuery';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function WardsList() {
  const { data, isLoading, error, refetch } = useGet(
    'wards',                    // Query key
    API_ENDPOINTS.WARDS,        // Endpoint
    {
      showErrorToast: true,     // Show error toast (default: true)
      requiresAuth: true,       // Requires auth token (default: true)
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <FlatList
      data={data?.data?.docs}
      onRefresh={refetch}
      refreshing={isLoading}
    />
  );
}
```

### 2. GET Request - Fetch Single Item

```javascript
import { useGet } from '../hooks/useCommonQuery';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function WardDetail({ wardId }) {
  const { data, isLoading } = useGet(
    ['ward', wardId],                    // Query key with parameter
    API_ENDPOINTS.WARD_BY_ID(wardId),   // Endpoint
    {
      enabled: !!wardId,                 // Only fetch if wardId exists
    }
  );

  return <WardDetails ward={data?.data} />;
}
```

### 3. GET Request - Search/Filter

```javascript
import { useGet } from '../hooks/useCommonQuery';
import { API_ENDPOINTS, buildQueryString } from '../apiconfig/endpoints';

function SearchWards() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading } = useGet(
    ['wards', 'search', searchQuery],
    `${API_ENDPOINTS.WARDS}${buildQueryString({ search: searchQuery })}`,
    {
      enabled: !!searchQuery,            // Only search if query exists
      staleTime: 30000,                  // Cache for 30 seconds
    }
  );

  return (
    <>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <ResultsList data={data?.data?.docs} loading={isLoading} />
    </>
  );
}
```

### 4. POST Request - Create

```javascript
import { usePost } from '../hooks/useCommonMutation';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function CreateWardForm() {
  const createWard = usePost(API_ENDPOINTS.WARDS, {
    successMessage: 'Ward created successfully!',
    errorMessage: 'Failed to create ward',
    showSuccessToast: true,
    showErrorToast: true,
    invalidateQueries: ['wards'],        // Refetch wards list
  });

  const handleSubmit = async (formData) => {
    try {
      await createWard.mutateAsync({
        name: formData.name,
        capacity: formData.capacity,
      });
      // Navigate or reset form
      navigation.goBack();
    } catch (error) {
      // Error already shown via toast
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" />
      <Input name="capacity" />
      <Button
        onPress={handleSubmit}
        loading={createWard.isPending}
      >
        Create Ward
      </Button>
    </Form>
  );
}
```

### 5. PUT Request - Update

```javascript
import { usePut } from '../hooks/useCommonMutation';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function EditWardForm({ wardId }) {
  const updateWard = usePut(
    (data) => API_ENDPOINTS.WARD_BY_ID(data.id),  // Dynamic endpoint
    {
      successMessage: 'Ward updated successfully!',
      invalidateQueries: [
        ['ward', wardId],    // Invalidate single ward
        'wards',             // Invalidate wards list
      ],
    }
  );

  const handleUpdate = async (formData) => {
    await updateWard.mutateAsync({
      id: wardId,
      ...formData,
    });
  };

  return (
    <Form onSubmit={handleUpdate}>
      <Input name="name" />
      <Button
        onPress={handleUpdate}
        loading={updateWard.isPending}
      >
        Update
      </Button>
    </Form>
  );
}
```

### 6. DELETE Request

```javascript
import { useDelete } from '../hooks/useCommonMutation';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function DeleteWardButton({ wardId }) {
  const deleteWard = useDelete(
    (id) => API_ENDPOINTS.WARD_BY_ID(id),  // Dynamic endpoint
    {
      successMessage: 'Ward deleted successfully!',
      invalidateQueries: ['wards'],
      onSuccess: () => {
        navigation.goBack();
      },
    }
  );

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this ward?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteWard.mutate(wardId),
        },
      ]
    );
  };

  return (
    <Button
      onPress={handleDelete}
      loading={deleteWard.isPending}
      variant="danger"
    >
      Delete
    </Button>
  );
}
```

### 7. POST with FormData (File Upload)

```javascript
import { usePost } from '../hooks/useCommonMutation';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function UploadImageForm() {
  const uploadImage = usePost(API_ENDPOINTS.UPLOAD, {
    successMessage: 'Image uploaded successfully!',
    isFormData: true,  // Important for file uploads!
    invalidateQueries: ['images'],
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      const formData = new FormData();
      formData.append('file', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      await uploadImage.mutateAsync(formData);
    }
  };

  return (
    <Button onPress={handleImagePick} loading={uploadImage.isPending}>
      Upload Image
    </Button>
  );
}
```

### 8. Custom Success/Error Callbacks

```javascript
import { usePost } from '../hooks/useCommonMutation';
import { API_ENDPOINTS } from '../apiconfig/endpoints';

function LoginForm() {
  const login = usePost(API_ENDPOINTS.LOGIN, {
    showSuccessToast: false,  // Don't show default toast
    onSuccess: (data) => {
      // Custom logic after success
      console.log('Login successful:', data);
      navigation.replace('/(app)');
    },
    onError: (error) => {
      // Custom error handling
      if (error.status === 401) {
        Alert.alert('Invalid Credentials', 'Please check your email and password');
      }
    },
  });

  return (
    <Form onSubmit={(data) => login.mutate(data)}>
      {/* Form fields */}
    </Form>
  );
}
```

### 9. Multiple Query Invalidation

```javascript
import { usePost } from '../hooks/useCommonMutation';

function TransferPatient() {
  const transfer = usePost(API_ENDPOINTS.TRANSFER_PATIENT, {
    successMessage: 'Patient transferred successfully!',
    invalidateQueries: [
      'patients',              // Invalidate all patients
      'wards',                 // Invalidate all wards
      ['ward', sourceWardId],  // Invalidate specific ward
      ['ward', targetWardId],  // Invalidate specific ward
    ],
  });

  // ...
}
```

### 10. Disable Auto Toasts

```javascript
import { useGet } from '../hooks/useCommonQuery';

function BackgroundSync() {
  const { data } = useGet(
    'background-data',
    API_ENDPOINTS.SYNC,
    {
      showErrorToast: false,  // Don't show error toast
      refetchInterval: 30000, // Fetch every 30s
    }
  );

  // Silent background sync
}
```

## Hook Options Reference

### Query Options (useGet)
```javascript
{
  showErrorToast: true,        // Show error toast notification
  requiresAuth: true,          // Include auth token in request
  enabled: true,               // Enable/disable query
  staleTime: 5 * 60 * 1000,   // How long data is considered fresh
  cacheTime: 10 * 60 * 1000,  // How long to keep in cache
  refetchOnMount: true,        // Refetch when component mounts
  refetchOnWindowFocus: false, // Refetch when window regains focus
  retry: 2,                    // Number of retry attempts
  // ... all React Query options
}
```

### Mutation Options (usePost, usePut, useDelete)
```javascript
{
  successMessage: 'Success!',     // Custom success message
  errorMessage: 'Error!',         // Custom error message
  showSuccessToast: true,         // Show success toast
  showErrorToast: true,           // Show error toast
  requiresAuth: true,             // Include auth token
  isFormData: false,              // For file uploads
  invalidateQueries: ['key'],     // Queries to refetch on success
  onSuccess: (data) => {},        // Custom success callback
  onError: (error) => {},         // Custom error callback
  // ... all React Query mutation options
}
```

## Benefits

1. **Less Boilerplate** - One line vs 50+ lines
2. **Consistent Error Handling** - All errors shown the same way
3. **Automatic Cache Management** - Smart refetching
4. **Better UX** - Toast messages for all operations
5. **Type Safe** - JSDoc for autocomplete
6. **Easy Testing** - Mock hooks instead of API calls

## Migration Example

### Before (Redux):
```javascript
// 50+ lines of code
const dispatch = useDispatch();
const wardList = useSelector(selectWardsList);
const isLoading = useSelector(selectIsLoading);

useEffect(() => {
  dispatch({ type: 'WARD_LIST', payload: {} });
}, []);

// Saga, reducer, selectors... 200+ lines total
```

### After (Common Hooks):
```javascript
// 1 line of code!
const { data, isLoading } = useGet('wards', API_ENDPOINTS.WARDS);

// That's it! ✨
```
