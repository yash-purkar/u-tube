// app/createEmotionCache.ts
import createCache from '@emotion/cache';

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default createEmotionCache;

// This function can be imported and called in other parts of the application where an Emotion cache is needed.
// By calling createEmotionCache(), you get a configured Emotion cache instance that can be used for managing styles in your application.