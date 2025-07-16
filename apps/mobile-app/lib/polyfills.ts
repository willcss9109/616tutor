// Polyfill for structuredClone (required for Supabase in React Native)
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = function structuredClone(obj: any) {
    // Handle null and undefined
    if (obj === null || obj === undefined) {
      return obj;
    }
    
    // Handle primitive types
    if (typeof obj !== 'object') {
      return obj;
    }
    
    // Handle Date objects
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    
    // Handle Arrays
    if (Array.isArray(obj)) {
      return obj.map(item => structuredClone(item));
    }
    
    // Handle Objects
    if (typeof obj === 'object') {
      const cloned: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = structuredClone(obj[key]);
        }
      }
      return cloned;
    }
    
    return obj;
  };
}