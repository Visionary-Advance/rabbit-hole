# i18n Troubleshooting Guide

## Issue: Can't Switch to Mandarin

### Steps to Diagnose:

1. **Open Browser DevTools Console** (F12)
   - Look for i18next debug messages (debug mode is enabled)
   - Click the language switcher buttons
   - You should see console logs: "Changing language to: zh" or "Changing language to: en"
   - Check for any error messages

2. **Check localStorage**
   - In DevTools Console, run: `localStorage.getItem('i18nextLng')`
   - It should return `"en"` or `"zh"`
   - After clicking "中文", run the command again - it should return `"zh"`

3. **Check current language**
   - In DevTools Console, run: `window.i18next?.language`
   - This shows the active language

### Common Issues and Solutions:

#### Issue 1: Language changes but text doesn't update
**Symptoms:** Console shows language changed, localStorage updated, but text stays in English

**Solution:** Clear browser cache and hard refresh (Ctrl + Shift + R)

```bash
# Or restart the dev server
npm run dev
```

#### Issue 2: Translation keys showing instead of text
**Symptoms:** You see "hero.title_line1" instead of "Eugene's"

**Solution:** Translation files might not be loading. Check:
- Files exist at `app/i18n/locales/en/translation.json` and `app/i18n/locales/zh/translation.json`
- JSON files are valid (no syntax errors)

Test by running in DevTools Console:
```javascript
fetch('/api/test')  // Should show 404, just checking network
```

#### Issue 3: Language switcher buttons not highlighted correctly
**Symptoms:** The green background doesn't show on the active language

**Solution:** The state might not be updating. Check console for "Language changed to:" messages.

#### Issue 4: React Hydration Errors
**Symptoms:** Console shows "Text content did not match" warnings

**Solution:** This is expected on first load due to SSR/client mismatch. It should resolve after language loads.

### Manual Test:

1. Open browser console
2. Run these commands one by one:

```javascript
// Check if i18next is loaded
console.log('i18next loaded:', typeof window.i18next)

// Check current language
console.log('Current language:', window.i18next?.language)

// List available resources
console.log('Resources:', window.i18next?.options?.resources)

// Try manual language change
window.i18next?.changeLanguage('zh').then(() => {
  console.log('Changed to:', window.i18next.language)
})

// Check a translation
window.i18next?.t('hero.title_line1')  // Should return "尤金市的" for zh
```

### Force Language Change:

If you want to force the language to Mandarin, run in console:
```javascript
localStorage.setItem('i18nextLng', 'zh')
location.reload()
```

Or force to English:
```javascript
localStorage.setItem('i18nextLng', 'en')
location.reload()
```

### Debugging Checklist:

- [ ] Dev server is running (`npm run dev`)
- [ ] Page loaded without errors (check Console)
- [ ] Translation files exist and have valid JSON
- [ ] i18next is initialized (check Console for debug messages)
- [ ] Clicking language buttons triggers console logs
- [ ] localStorage is being updated
- [ ] Browser cache cleared / hard refresh performed

### Advanced Debugging:

If still not working, check the Network tab:
1. Open DevTools > Network tab
2. Filter by "translation"
3. Click the 中文 button
4. You should see a request to load `zh/translation.json`
5. Check if it returns 200 OK or an error

### Still Not Working?

Check the component usage:

1. **Verify Header component** (`Components/Header.jsx:8`):
   ```jsx
   const { t } = useTranslation();
   ```

2. **Verify page.js** (`app/page.js:20`):
   ```jsx
   const { t } = useTranslation();
   ```

3. **Verify text is using translation keys**:
   ```jsx
   {t('hero.title_line1')}  // Good
   "Eugene's"  // Bad - hardcoded
   ```

### Disable Debug Mode

Once everything is working, disable debug mode in `app/i18n/settings.js`:
```javascript
export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    debug: false,  // Change to false
    // ... rest of config
  }
}
```

### Contact Support

If issues persist:
1. Share browser console output (screenshot)
2. Share Network tab output
3. Confirm which browser/version you're using
4. Try in a different browser (Chrome vs Firefox)
