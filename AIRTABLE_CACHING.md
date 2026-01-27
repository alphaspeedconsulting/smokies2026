# Airtable API Caching Implementation

## Overview

To reduce Airtable API calls and stay within the Free plan limits, we've implemented a **24-hour browser-side cache** for all Airtable data.

## How It Works

### Cache Duration
- **24 hours** (86,400,000 milliseconds)
- Data is cached in browser `localStorage`
- Cache automatically expires after 24 hours
- Expired cache entries are cleaned up on page load

### Cache Behavior

1. **First Load**: Fetches data from Airtable API and caches it
2. **Subsequent Loads**: Uses cached data if less than 24 hours old
3. **After 24 Hours**: Automatically fetches fresh data and updates cache
4. **After Create/Update**: Cache is invalidated for the affected table, ensuring fresh data on next load

### Cache Storage

- Cache keys: `airtable_cache_{BASE_ID}_{TABLE_NAME}_{PARAMS}`
- Stored in browser `localStorage`
- Automatically cleaned up when expired

## Benefits

✅ **Reduced API Calls**: 
- Instead of 7 API calls per page load, you'll only make API calls:
  - Once per table every 24 hours
  - When cache is manually cleared
  - After creating/updating records (cache invalidated)

✅ **Faster Page Loads**: Cached data loads instantly from localStorage

✅ **Automatic Management**: Expired cache entries are automatically cleaned up

## Manual Cache Management

### Force Refresh All Data
Open browser console (F12) and run:
```javascript
refreshAirtableData()
```
This will bypass cache and fetch fresh data from Airtable for all tables.

### Clear All Cache
```javascript
clearAirtableCache()
```
This removes all cached Airtable data. Next page load will fetch fresh data.

### View Cache Information
```javascript
getCacheInfo()
```
Shows a table of all cached entries with their age and expiration times.

## Cache Invalidation

Cache is automatically invalidated when:
- Records are created via `createAirtableRecord()`
- Records are updated via `updateAirtableRecord()`

This ensures that after creating/updating records, the next data load will fetch fresh data from Airtable.

## Technical Details

### Cache Structure
```javascript
{
  data: { /* Airtable API response */ },
  timestamp: 1234567890123 // Unix timestamp in milliseconds
}
```

### Cache Key Format
```
airtable_cache_{BASE_ID}_{TABLE_NAME}_{SORTED_PARAMS}
```

### Cache Functions

- `getCachedData(tableName, params)` - Retrieve cached data if valid
- `setCachedData(tableName, params, data)` - Store data in cache
- `clearExpiredCache()` - Remove expired cache entries
- `clearAllCache()` - Remove all cache entries
- `invalidateTableCache(tableName)` - Remove all cache for a specific table

## Expected API Call Reduction

**Before Caching:**
- 7 API calls per page load
- 7 API calls per page refresh
- 7 API calls per navigation
- **Total**: ~21+ calls per user session

**After Caching (24-hour cache):**
- 7 API calls on first visit (cached)
- 0 API calls on subsequent visits within 24 hours
- 0 API calls on page refreshes within 24 hours
- **Total**: ~7 calls per user per 24 hours

**Estimated Reduction**: ~70-90% reduction in API calls for typical usage patterns.

## Notes

- Cache is stored per browser (localStorage is browser-specific)
- Cache persists across page refreshes and browser sessions
- If localStorage is full, expired entries are automatically cleared
- Cache duration can be adjusted by changing `CACHE_DURATION` constant (currently 24 hours)

## Troubleshooting

### Data Not Updating
If you've updated Airtable but don't see changes:
1. Wait for cache to expire (24 hours), OR
2. Run `refreshAirtableData()` in browser console, OR
3. Run `clearAirtableCache()` and refresh the page

### Cache Not Working
Check browser console for errors. Common issues:
- localStorage disabled in browser
- localStorage quota exceeded (cache will auto-clean expired entries)
- Browser in private/incognito mode (cache may not persist)
