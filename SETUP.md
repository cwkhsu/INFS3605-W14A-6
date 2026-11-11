# CafeCast setup

CafeCast is one web page (`index.html`) hosted on GitHub Pages. Supabase stores accounts and café data, so an owner can sign in from any device.

```
Browser (GitHub Pages: index.html)  ──sign in / save café──▶  Supabase (Auth + "cafes" table)
```

You need a free GitHub account and a free Supabase account. Setup takes about 20 minutes.

---

## 1. Create the Supabase project

1. Go to **supabase.com** and sign in with GitHub.
2. Click **New project**. Name it `cafecast`, set a database password and save it somewhere safe, then choose the **Sydney** region.
3. Wait about 2 minutes for the project to finish setting up.

## 2. Create the database table

1. In the left menu, open **SQL Editor** and click **New query**.
2. Paste in everything from `supabase-setup.sql`, then click **Run**. It creates the `cafes` table and the security rules that let each owner see only their own café.
   - The last statement in the file connects Nick to the Little Fern data. It does nothing until Nick exists, so run it again after step 3.

## 3. Add Nick's account (the Little Fern Café data)

1. Go to **Authentication › Users** and click **Add user**, then **Create new user**.
2. Enter:
   - Email: `nick@littlefern.com.au`
   - Password: `LittleFern#2026`
   - Tick **Auto Confirm User**.
3. Back in the **SQL Editor**, run the final `insert into public.cafes …` statement from `supabase-setup.sql` again.

When Nick signs in, CafeCast loads Little Fern Café's stock, menu, suppliers and 6 weeks of sales, then saves it all to his account. To restore Little Fern to its original data at any time, run that statement again.

## 4. Sign-in settings

1. Go to **Authentication › URL Configuration** and set:
   - **Site URL:** your GitHub Pages address, for example `https://yourname.github.io/cafecast/`
   - **Redirect URLs:** add the same address.
   
   Email confirmation links and password-reset links will then open CafeCast.
2. Go to **Authentication › Sign In / Providers › Email** and pick one:
   - Leave **Confirm email** on (recommended): new owners click a link in their inbox before their first sign-in.
   - Turn it off: new owners go straight into setup. Supabase's built-in email service sends only a few emails an hour, so you may prefer this for testing.

## 5. Connect CafeCast to Supabase

1. In Supabase, go to **Project Settings › API** (it may be listed as **Data API** or **API Keys**) and copy:
   - the **Project URL**, for example `https://abcdxyz.supabase.co`
   - the **anon / public** key, a long string starting `eyJ…`, or a key starting `sb_publishable_…`
2. Open `index.html` and find `APP SETTINGS` near the top of the script. Paste in your values:

   ```js
   const CONFIG=Object.assign({
     supabaseUrl:'https://abcdxyz.supabase.co',
     supabaseAnonKey:'eyJhbGciOi...',
     googleMapsKey:'',
     geminiKey:''          // leave empty: the Gemini key lives in Supabase (see "AI forecast")
   },window.CAFECAST_CONFIG||{});
   ```

The anon key is designed to be visible in a web page. Your data is protected by the row-level security rules from step 2. **Never** paste the `service_role` or secret key into `index.html`.

If you leave these settings empty, CafeCast still runs, but accounts and data are saved on that device only. Nick's login works in that mode too.

## 6. Publish on GitHub Pages

**If your repository already exists:**
1. Open it on github.com and click **Add file › Upload files**.
2. Drag in `index.html`, `SETUP.md`, `supabase-setup.sql` and `gemini-forecast.ts`, then click **Commit changes**.

**If you're starting fresh:**
1. Create a new public repository, upload the same files, then go to **Settings › Pages**.
2. Under **Source**, choose **Deploy from a branch**, then **main** and **/ (root)**, and click **Save**.

The site will be at `https://<your-username>.github.io/<repo-name>/`. Updates take about a minute to appear; hard-refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac).

## 7. Check it works

1. Open your Pages address and sign in as `nick@littlefern.com.au` / `LittleFern#2026`.
2. Change something, for example approve an order. Then go to **Setup › Account**. "Your data" should say **Saved to your account · (time)**.
3. In Supabase, open **Table Editor › cafes**. Nick's row now has its `data` filled in.
4. Sign in on your phone with the same login. You'll see the same café.
5. On the sign-in page, click **Create account** to make a new café. It starts with the 5-step setup.

---

## Optional: Google Maps suburb search

CafeCast's built-in suburb search is free. It lists every matching suburb and shows NSW first, or the state or postcode you type, for example "Burwood 2134". Adding Google gives Google Places suggestions instead:

1. In **console.cloud.google.com**, create a project and attach a billing account. Google gives a monthly free allowance, which a café app stays well under.
2. Under **APIs & Services › Library**, enable **Maps JavaScript API** and **Places API (New)**.
3. Under **APIs & Services › Credentials**, click **Create credentials › API key**. Then restrict it:
   - **Application restrictions:** Websites, adding `https://<your-username>.github.io/*`
   - **API restrictions:** the two APIs above
4. Paste the key into `googleMapsKey` in `index.html`.

If Google fails for any reason, CafeCast falls back to the built-in search automatically.

## AI forecast (Gemini), kept secure on the server

The Gemini key is **not** in `index.html`. It lives in a small Supabase Edge Function called `gemini-forecast`. CafeCast sends the forecast request there, and the function adds the key and calls Gemini. Only signed-in CafeCast users can use it. It tries Gemini 3.8 Flash first, then Gemini 3.5 Flash-Lite.

**A. Add the key as a secret**
1. In Supabase, open **Edge Functions** in the left menu, then **Secrets**. On some versions it's under **Project Settings › Edge Functions**.
2. Click **Add new secret**:
   - Name: `GEMINI_API_KEY`
   - Value: your key from **aistudio.google.com › API keys**
3. Click **Save**.

**B. Deploy the function**
1. In **Edge Functions**, click **Deploy a new function**, then **Via Editor**.
2. Name it exactly `gemini-forecast`.
3. Delete the example code. Paste in everything from `gemini-forecast.ts`, then click **Deploy function**.
4. Open the function's **Details** (or **Settings**) and turn **off** "Verify JWT" (it may be called "Enforce JWT verification"). Click **Save**. The function checks the user's sign-in itself, and turning this off avoids sign-in token format problems.

**C. Check it**
1. Sign in to CafeCast and go to **Setup › Data sources**. Click **Test connections**. The AI forecast row should say **Connected**.
2. On **Today**, type something in "What's different today?" and click **Generate AI forecast**.

If something fails, the message under the button says what to fix. For example: "add GEMINI_API_KEY…" means step A is missing, and "deploy the gemini-forecast function" means step B is missing. In Supabase, **Edge Functions › gemini-forecast › Logs** shows each request.

**Changing the key later:** edit `GEMINI_API_KEY` in Secrets. No change to `index.html` is needed.

## Optional: other cafés with sample data

To give another account the Little Fern data (for example, for a second café owner), create the user in step 3 with their own email. Then run the same `insert` statement with their email.

## Troubleshooting

| What you see | Fix |
|---|---|
| "That email and password don't match" for Nick | Check the user exists under Authentication › Users and that **Auto Confirm User** was ticked. |
| Nick signs in to an empty setup wizard instead of Little Fern | The `insert` in step 3 was run before the user existed. Run it again, then sign out and back in. |
| Account shows "Not saved yet" | Check the SQL in step 2 ran without errors, and that the URL and anon key in `index.html` are correct. |
| Confirmation or reset email opens the wrong page | Set the Site URL and Redirect URLs in step 4. |
| AI forecast says the service isn't set up, or Test connections fails for AI forecast | Follow the "AI forecast" section: check the secret name is exactly `GEMINI_API_KEY`, the function is named `gemini-forecast`, and Verify JWT is off. |
| Nothing loads on the sign-in page | Open CafeCast from its https:// address, not as a file on your computer. |
