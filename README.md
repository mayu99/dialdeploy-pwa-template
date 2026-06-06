# DialDeploy Next.js PWA Template

This is the Next.js 14 template for DialDeploy mobile PWAs. It uses Tailwind CSS, TypeScript, and features simple offline service worker registration.

## Deployment Target
Deploy to Vercel and configure `NEXT_PUBLIC_API_URL` to point to the deployed InsForge backend API.

## Customization Guide for Replicas Agent
The Replicas agent is authorized to modify ONLY these files:

1. `config/brand.ts`
   - Re-declare `APP_NAME`, `PRIMARY_COLOR` (hex code), and `HEADER_TITLE`.
2. `types/Item.ts`
   - Rewrite the main entity interface structure (renaming the entity, altering fields, etc.).
3. `lib/api.ts`
   - Update fetch request routing pathways (i.e. changing `/items` endpoints to the new entity name routes).
4. `app/manifest.json`
   - Update `name`, `short_name`, and `theme_color`.
5. `app/page.tsx` and `app/add/page.tsx`
   - Change descriptive labels/placeholders, inputs, and list fields to match the custom entity structure without altering UI layout structure.

Do NOT alter:
- Navigation structure, layout tags, or service worker setups.
