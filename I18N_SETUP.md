# i18next Internationalization Setup

This project now supports multiple languages using i18next. Currently configured languages:
- English (en) - Default
- Mandarin Chinese (zh)

## Quick Start

### Language Switcher
The language switcher is already added to the Header component. Users can toggle between English and Mandarin by clicking the language buttons.

### How to Use Translations in Components

#### Client Components
For client components, use the `useTranslation` hook from `@/app/i18n/client`:

```jsx
'use client'

import { useTranslation } from '@/app/i18n/client';

export default function MyComponent() {
  const { t, i18n } = useTranslation(i18n?.resolvedLanguage || 'en');

  return (
    <div>
      <h1>{t('section.title')}</h1>
      <p>{t('section.description')}</p>
    </div>
  );
}
```

#### Server Components
For server components, use the async `useTranslation` from `@/app/i18n`:

```jsx
import { useTranslation } from '@/app/i18n';

export default async function MyServerComponent() {
  const { t } = await useTranslation('en');

  return (
    <div>
      <h1>{t('section.title')}</h1>
    </div>
  );
}
```

## Translation Files

Translation files are located in `app/i18n/locales/`:
- `app/i18n/locales/en/translation.json` - English translations
- `app/i18n/locales/zh/translation.json` - Mandarin translations

### Adding New Translations

1. Open both translation files
2. Add your new keys in the same structure to both files
3. Example:

**en/translation.json:**
```json
{
  "menu": {
    "title": "Our Menu",
    "categories": {
      "tea": "Tea",
      "smoothies": "Smoothies"
    }
  }
}
```

**zh/translation.json:**
```json
{
  "menu": {
    "title": "我们的菜单",
    "categories": {
      "tea": "茶饮",
      "smoothies": "冰沙"
    }
  }
}
```

3. Use in your component:
```jsx
{t('menu.title')}
{t('menu.categories.tea')}
```

## Language Detection

The app automatically detects the user's preferred language based on:
1. Stored preference in localStorage (if user has selected a language)
2. Browser language settings

## Adding More Languages

To add a new language:

1. Update `app/i18n/settings.js`:
```javascript
export const languages = ['en', 'zh', 'es'] // Add 'es' for Spanish
```

2. Create a new translation file:
```
app/i18n/locales/es/translation.json
```

3. Copy the structure from `en/translation.json` and translate all values

4. Update `LanguageSwitcher.jsx` to include the new language:
```javascript
const languageNames = {
  en: 'English',
  zh: '中文',
  es: 'Español'
}
```

## Components Already Translated

The following components have been updated to support i18next:
- ✅ Header (navigation, cart, contact button)
- ✅ Hero section (main page)
- ✅ Language Switcher

## Components To Translate

The following components still need translation keys added:
- [ ] Menu component
- [ ] Cart component
- [ ] Footer component
- [ ] AboutUs component
- [ ] Contact component
- [ ] FAQ component
- [ ] Reviews component
- [ ] Trust component
- [ ] CTA component

To translate these components:
1. Add the text keys to both translation files
2. Import and use `useTranslation` in the component
3. Replace hardcoded text with `{t('key.path')}`

## Testing

To test the translations:
1. Start the development server: `npm run dev`
2. Open the site in your browser
3. Click the language switcher buttons in the header
4. Verify that text changes between English and Mandarin

## SEO Considerations

For SEO, you may want to:
1. Update the `lang` attribute in `layout.js` dynamically based on selected language
2. Add alternate language meta tags for each language version
3. Consider creating language-specific URLs (e.g., `/en`, `/zh`)

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Next.js i18n Guide](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
