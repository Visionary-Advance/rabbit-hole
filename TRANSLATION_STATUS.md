# Translation Implementation Status

## ✅ Completed Components

### 1. **Header** (`Components/Header.jsx`)
- Menu, About Us, Cart, Contact Us buttons
- All using translation keys

### 2. **Hero Section** (`app/[locale]/page.js`)
- Title lines (Eugene's, Bubble Tea, Spot)
- Subtitle
- Order Online & View Menu buttons

### 3. **AboutUs** (`Components/AboutUs.jsx`)
- Title: "Brewed with Heart. Served with Joy."
- Two paragraphs of description

### 4. **Trust** (`Components/Trust.jsx`)
- Main title
- Experience section (title, value, description)
- Served section (title, value, description)
- Items section (title, value, description)

### 5. **Language Switcher** (`Components/LanguageSwitcher.jsx`)
- EN / 中文 discrete text design

### 6. **StructuredData** (`Components/StructuredData.jsx`)
- Restaurant name
- Description
- Cuisine type

---

## ⏳ Remaining Components to Update

The translation JSON files are ready with all translations. You just need to add `useTranslation()` hook and replace hardcoded text with `{t('key')}`.

### Contact Component (`Components/Contact.jsx`)

**Add at top:**
```javascript
'use client'
import { useTranslation } from '@/app/i18n/client';

export default function Contact(){
  const { t } = useTranslation();
```

**Replace:**
- Line 24: `Find or Message Us` → `{t('contact.title')}`
- Line 27: `Something for everyone...` → `{t('contact.subtitle')}`
- Line 43: `Phone` → `{t('contact.phone')}`
- Line 68: `Email` → `{t('contact.email')}`
- Line 91: `Location` → `{t('contact.location')}`
- Line 106: `Opening Hours` → `{t('contact.opening_hours')}`
- Line 109: `Monday - Friday: 7:00 AM - 8:00 PM` → `{t('contact.hours_detail')}`

### FAQ Component (`Components/FAQ.jsx`)

**Add at top:**
```javascript
const { t } = useTranslation();
```

**Replace the faqItems array:**
```javascript
const faqItems = t('faq.items', { returnObjects: true });
```

**Replace:**
- Line 122: `Frequently Asked Questions` → `{t('faq.title')}`

### CTA Component (`Components/CTA.jsx`)

**Find the text content section and replace with:**
```javascript
<h2>{t('cta.title')}</h2>
<p>{t('cta.subtitle')}</p>
<button>{t('cta.button')}</button>
```

### Footer Component (`Components/Footer.jsx`)

**Add at top:**
```javascript
'use client'
import { useTranslation } from '@/app/i18n/client';

export default function Footer(){
  const { t } = useTranslation();
```

**Replace:**
- Line 25: Description text → `{t('footer.description')}`
- Line 56: `Quick Link` → `{t('footer.quick_links')}`
- Line 58: `Home` → `{t('footer.home')}`
- Line 59: `Menu` → `{t('footer.menu')}`
- Line 60: `About us` → `{t('footer.about_us')}`
- Contact section similar pattern
- Newsletter section
- Copyright → `{t('footer.copyright')}`

### Menu Component (`Components/Menu.jsx`)

**Add at top:**
```javascript
const { t } = useTranslation();
```

**Replace:**
- "All Tea" → `{t('menu.all_tea')}`
- "Load More" button → `{t('menu.load_more')}`
- "Search menu..." placeholder → `{t('menu.search_placeholder')}`

### Cart Component (`Components/Cart.jsx`)

**Add at top:**
```javascript
const { t } = useTranslation();
```

**Replace:**
- "Shopping Cart" → `{t('cart.title')}`
- "Your cart is empty" → `{t('cart.empty')}`
- "Subtotal" → `{t('cart.subtotal')}`
- "Checkout" → `{t('cart.checkout')}`
- "Continue Shopping" → `{t('cart.continue_shopping')}`
- "Remove" → `{t('cart.remove')}`
- "Quantity" → `{t('cart.quantity')}`

### ContactForm Component (`Components/ContactForm.jsx`)

**Add translations for form fields:**
- "Send us a message" → `{t('contact.form.title')}`
- Name placeholder → `{t('contact.form.name_placeholder')}`
- Email placeholder → `{t('contact.form.email_placeholder')}`
- Message placeholder → `{t('contact.form.message_placeholder')}`
- Submit button → `{t('contact.form.send_button')}`

---

## Translation File Reference

Both `app/i18n/locales/en/translation.json` and `app/i18n/locales/zh/translation.json` contain complete translations for:

- `nav.*` - Navigation items
- `hero.*` - Hero section
- `trust.*` - Trust/stats section
- `menu.*` - Menu section
- `about.*` - About Us section
- `contact.*` - Contact section + form
- `faq.items[]` - FAQ questions and answers (array)
- `cta.*` - Call to action section
- `footer.*` - Footer content
- `cart.*` - Cart component
- `common.*` - Common UI elements

---

## Quick Implementation Pattern

For ANY component that needs translation:

1. **Add 'use client' directive** (if not already there):
   ```javascript
   'use client'
   ```

2. **Import useTranslation**:
   ```javascript
   import { useTranslation } from '@/app/i18n/client';
   ```

3. **Call the hook in component**:
   ```javascript
   export default function MyComponent(){
     const { t } = useTranslation();
   ```

4. **Replace hardcoded text**:
   ```javascript
   // Before
   <h1>Welcome</h1>

   // After
   <h1>{t('section.welcome')}</h1>
   ```

---

## Testing Translations

1. **English version**: Visit `http://localhost:3000/`
   - Should show all English text

2. **Mandarin version**: Visit `http://localhost:3000/zh`
   - Should show all Mandarin text
   - Menu items stay in English (as designed)

3. **Language Switcher**:
   - Click **EN** / 中文 in header
   - Should navigate between `/` and `/zh`
   - Content should update

---

## Notes

- **Menu items**: Keep product names in English (from Square API)
- **Checkout**: Keep entirely in English (no translation)
- **Contact info**: Phone, email, address stay the same (no translation needed for actual contact details)
- **Values**: Numbers like "8 Years", "21k" should stay as-is, only translate the description text

---

## Status Summary

**✅ Fully Translated:**
- Header
- Hero
- AboutUs
- Trust
- StructuredData
- Language Switcher

**⏳ Needs Implementation (JSON ready):**
- Contact
- FAQ
- CTA
- Footer
- Menu (title/UI only)
- Cart
- ContactForm

**Total Progress: ~40% Complete**

All translation strings are ready in the JSON files. Just need to add the `useTranslation()` hook and replace hardcoded text with translation keys!
