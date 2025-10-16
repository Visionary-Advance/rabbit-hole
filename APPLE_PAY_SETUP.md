# Apple Pay Setup Guide

## Current Status

Apple Pay is **already integrated** into your checkout page! The payment form includes:
- ✅ Apple Pay button
- ✅ Google Pay button
- ✅ Card payment option
- ✅ Domain verification file

## How Apple Pay Works

When customers visit your checkout page on a supported device (iPhone, iPad, Mac with Safari):
1. The Apple Pay button will automatically appear
2. Customers click the Apple Pay button
3. They authenticate with Face ID, Touch ID, or passcode
4. Payment is processed through Square
5. Order is confirmed

## Requirements for Apple Pay to Work

### 1. HTTPS Domain (Required)
- ✅ Apple Pay only works on HTTPS domains
- ❌ Will NOT work on localhost or HTTP
- Your production domain must use SSL/TLS

### 2. Domain Registration with Square (Required)
You need to register your domain in the Square Developer Dashboard:

**For Production:**
1. Go to https://developer.squareup.com/apps
2. Select your application
3. Switch to **Production** mode
4. Click **Apple Pay** in the left sidebar
5. Click **Add Domain**
6. Enter your domain (e.g., `yourdomain.com`)
7. Square will verify the domain using the verification file

**For Testing/Sandbox:**
1. Follow the same steps but use **Sandbox** mode
2. Use your test domain

### 3. Domain Verification File (Already Setup ✅)
The required verification file is already in place:
- File: `public/.well-known/apple-developer-merchantid-domain-association`
- URL: `https://yourdomain.com/.well-known/apple-developer-merchantid-domain-association`

This file must be accessible and should return a 200 status code.

### 4. Supported Devices
Apple Pay will only show on:
- iPhone or iPad with Safari
- Mac with Safari
- Devices with Apple Pay enabled

## Testing Apple Pay

### Before Production:
1. Register your sandbox domain in Square Dashboard (Sandbox mode)
2. Use Safari on an Apple device
3. Make sure you have at least one card added to Apple Wallet
4. Visit your checkout page over HTTPS

### Common Issues:
- **Button doesn't appear:** Check if you're using Safari on an Apple device over HTTPS
- **Domain verification fails:** Ensure the verification file is accessible at `/.well-known/apple-developer-merchantid-domain-association`
- **Payment fails:** Check Square Dashboard logs and ensure your location ID is correct

## Code Location

The Apple Pay implementation is in:
- `Components/SquarePaymentForm.jsx` (lines 61-92)

The integration:
- Automatically detects if Apple Pay is available
- Initializes the Apple Pay button
- Handles the payment flow
- Falls back gracefully if unavailable

## Next Steps

1. Deploy your site to a production HTTPS domain
2. Register the domain in Square Developer Dashboard (Production mode)
3. Test Apple Pay with a real device
4. Monitor payments in Square Dashboard

## Important Notes

- The domain verification file should be updated periodically
- Square recommends checking for updates regularly
- Don't cache the verification file for long periods
- Apple Pay requires Square production credentials

## Support

If Apple Pay isn't working:
1. Check browser console for errors
2. Verify domain is registered in Square Dashboard
3. Test the verification file URL in a browser
4. Contact Square support for payment issues
