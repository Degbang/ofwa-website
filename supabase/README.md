# OFWA admin setup

The public site reads Events, Gallery and Hubs from Supabase when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set, and serves its built-in content when they are not. Staff edit the content at `/admin`.

1. Create a project at supabase.com. Note the project URL and the anon public key (Settings, API).
2. In the SQL editor run `migrations/0001_content_admin.sql`, then `seed.sql` to load today's content.
3. Authentication, Providers, Email: keep email on. Authentication, Sign In / Up: turn **off** "Allow new users to sign up" so access stays invitation only.
4. Add each staff member twice: in Authentication, Users, "Invite user" (or "Add user" with a password), and in the SQL editor:
   `insert into public.admins (email, note) values ('name@example.org', 'Role');`
   Signing in is not enough on its own; only emails in `public.admins` can edit.
5. Authentication, URL Configuration: add the site URL and `https://<site>/admin` to the redirect list so email links work.
6. Set the two env vars locally in `.env` and in the Vercel project, then redeploy.

Photos uploaded in the admin go to the public `gallery` storage bucket. Removing a photo in the admin removes it from the site but not from storage.
