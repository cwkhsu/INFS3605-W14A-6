CafeCast: AI Prompts Log

This file records the AI prompts our team used to build CafeCast, one for each change to the app, in the order they were made.


1. First working build: automated ordering and the home page from the wireframe

i want to take decision making out of the cafe owner. they can just approve the ordering of stock and it will go through. generate the code for that and the steps to deploy it in github

i want to implement the feature of where inventory management is automated and takes deicsion making from the owner - they can order based on items with low stock levle and forecasted demand

design the ui to make the home page have the sections like this
include/edit one of the pages to include a feature of something like this

make it fit the proportions of the full screen - it is only covering 3/4 of my screen at the moment - make it compatible and fitting with all types of screens


2. Annotated design changes and a separate Little Fern Café dataset

there are some annotations made to the current design, can you please help with extracting them and making those changes and also help with step by step guides to making a working html link for github.

is there a way i can also use this demo data, keep it separate from the original previous demo created
Cafe_Inventory_Demo_Data.xlsx


3. Clearer order flow and recommendations

the order recommendations are hard to read and we found you can approve the same item twice. can you fix the order flow:
- replace the recommendation card with an "actions for the owner" panel -> status boxes (items to order, suppliers, items at expiry risk) then a short list of item, qty and a one line reason. keep the full maths underneath in smaller text
- show how much history the forecast used e.g. "analysed X trading days from Y days of pos history, today's weather and N local events"
- don't suggest something that's already on an open order or was received in the last 12 hours (unless it's actually run out)
- stop double approving -> lock the button while it's approving and skip lines already ordered
- after approving tell the owner what happened and take them to orders, and after receiving say how many items updated and what's left to review
- make little fern cafe the default dataset
- stack everything into one column on small screens


4. Daily plan dashboard and menu specials

i want to redesign the today tab into a daily plan the owner can read in under 2 minutes before opening:
- a hero box at the top -> "prepare for X% more/less than normal", expected revenue and key stats
- "three decisions for today" ranked: review supplier orders, run a special to use at-risk stock, do the waste check. one button each
- "why today differs" with each signal (weekday, weather, holiday, events, owner notes) and its % effect. let the owner add their own signal (name, today/tomorrow, demand %)
- an expiry risk watchlist with quantity and $ value
- stock-powered menu specials -> suggest discounted specials for menu items that use at-risk stock but never below a margin floor, show the ingredient value it saves, approve/pause
- forecast confidence based on how much data we have, and operations readiness for which data sources are connected
- simplify the waste check to start / nothing discarded / confirm & save
use a warmer cafe colour palette (cream + deep green) and keep it mobile friendly


5. Gemini owner-context agent

the owner knows things the sales history can't, e.g. a catering order tomorrow or roadworks out the front. can you add an "ask the cafecast ai agent" box using the gemini api:
- owner types what's changing in plain english
- send gemini a small json snapshot of the cafe (name, location, date, days of history, weather, existing events, current forecast adjustment, supplier drafts, top 5 expiry risks)
- gemini turns it into ONE demand signal and returns json only: title, today/tomorrow, demand change %, summary, next step, confidence. tell it not to calculate orders or make things up -> our rules engine does the maths
- add the result as an ai event so the forecast, risks and orders all recalculate, and show the interpretation with its confidence
- gemini key + model dropdown in setup, loading state and readable errors if there's no key or it fails


6. AI demand forecast as the daily-plan hero
move the gemini feature into the hero box at the top of today and make it the actual demand forecast, not just a note reader:
- it should forecast today's total demand vs a normal day using pos history, weekday pattern, weather, events and the owner's note (note is optional now)
- add historical daily average, today's pos sales so far and the weekday % to the snapshot
- don't double count -> take out the weekday and weather effect and existing events before saving the ai signal
- button says "generate ai forecast" then "forecasting…" while it runs
- remove the separate ai card. side by side on desktop, stacked on mobile


7. Update Gemini models

our new gemini api keys are on the newer models. can you change the default to gemini-3.8-flash with gemini-3.5-flash-lite as the other option in setup, and update it everywhere the default is set so older saved data still works.


8. Proof of value, voice and tutor feedback

with this app, i need to incorporate proof of value

i.e. how will this improve revenue - what is the commercial impact of some of these tools, (not just revenuw but other metrics, e.g. time saved etc), as well as how do we make it voice enabled as well, for the following notes of improvement feedback:

Improvements:

Voice enabled?

How do we integrate our app into the lifestyle of cafe owners?

Consider if it should be more mobile/web app based ?? user testing considerations

Need to validate our app dimensions with our core problem owner.

How often will this application be used by the owner?

How do we make our app trusted by business owners and improve explainability?

How are aspects such as weather demand fluctuations calculated? How do we translate this information so that it is visible for the owner?

Clearly communicate how calculations and decisions are made.

Is it too much information? What amount of information is the right amount of information? Can we abstract the data which makes it more simple for the owner to interact with?

How much is enough and how should we present this information?

How much of the agentic feature is dependent on the owner? How do we hand over more work to the agent? Find opportunities to reduce friction and time.

TRIM IT!

How impacts business e.g. revenue impact?

Consider if they don't take the recommendation, what is the impact of that?


9. Owner input in the top box, real APIs, date fix, mobile view and dropdowns

i want to make revisions to the html.

move the agentic owner input into the top bar like it was in the previous iteration so users can immedieatly add their change and generate a forecast in the first dashboard box

Are invoices, orders part of agentic workflow or is it triggered by decision-making agents rn -> please explain this

Fix on the day/dates setting? Cuz homepage seems to be mixing up tuesday/wednesday for the event and weather apis --> explain why this is the case and fix it.

can you please also make sure it uses real life apis instead of the dataset forecast this may be connected to the problem above.

i also want to make this more readable in mobile view. - can you give us a toggle that modifies the view for this so i can review it and check for the demo

I have further feedback:

Draft order page is long, maybe drop downs for each order?

Drop down tabs or secondary pages for setup page

Separate pages examples:

menu recipes >

stock items >

sending orders to suppliers >

Etc.

Do we need a notification menu?


10. Logins and a readable Ask CafeCast with read aloud

for the current code app, would you be able to add these features:

i want to add a login sectors -> please provide a default login i can use to use for the demo datasset that we have been usinig, but i also want to be able to have logins for other demos and use cases and users.

for example i want to be able to set up from scratch with a login that can connect to their own specific cafe data setup. this should have the same functionalities however.

i.e. Login: one specific login is with the demodataset we have Used for the demo & use cases
Another login is with connecting to their own specific cafe data, setup etc.

additionally, For the feature: ask Cafecast, the CafeCast response is very hard to read. Can you make it more readable with paragraphs that are split into the different decisions so it is easier to read at a glance. Also add a read outloud feature when the response is given alongside the text response.


11. Working app for Nick: Supabase, no demo wording, suburb fix

for our prototype this is feedback and fixes i want to make:

Change the "Hi user…" → for our specific target user

For the demo being stored, i want it to be our user Nick instead

Change the motto subheading to something more aligned to … i dont want decisions, not dashboards
Relate it more to a vision/goal → aim to make decisions, reduce waste, ease decision making

Remove the auto demo login - have it just in the data base saved instead?

Too demo like - need it to be more app like and store those logins and data separately
Have an example username and password that is connected to the demo dataset - i dont want it to be named demo,

Can you give me a guide on how i can connect this to something like a supabase for that as well which can be stored and connected to it → this isn't just a general proof of concept, this is supposed to be a working app, but i have a working login i can use for a demo

Currently it says its only saved into the browser, but i want to be able to save it to a database

I also don't want any decisions relating to a demo to be stated within the ux.

E.g. in the current profile setup: it states: About logins in this prototype - Logins and café data are stored in this browser (localStorage), so they work on GitHub Pages with no server. Another computer won't see them. In production, sign-in and data would move to a hosted backend such as Supabase so owners can log in from any device.

I want it to be fully working production instead

Cafe set up: the suburbs are wrong

E.g. if i answer burwood it looks up burwood, victoria but i want burwood sydney etc. can you make the suburb lookup better → is it possible to connect to google maps api?

E.g. strathfield is in queensland → why is none of this to do with new south wales?
Only if i do something like eastwood, then its correct.


12. Supabase database setup script

can you give me the sql i need to paste into supabase to set up the database for this.
- one cafes table: owner, cafe name, which dataset (my own / little fern), all the cafe data as json, last updated
- each owner should only be able to see and change their own cafe (row level security)
- link nick's account to the little fern data, and make it so i can run it again to reset little fern back to the original
- comment each step so i know what order to do things in (create nick's user first, then run the last part)


13. Connect the Supabase project

i added my supabase project url and publishable key into the settings but sign in isn't working. i copied the url with /rest/v1/ on the end -> can you fix it and make it so it doesn't break if someone pastes the longer url again

does my current index.html still need a gemini api key inputted into the code as well or not?


14. Keep the Gemini key off the page with an Edge Function

if the gemini key is in index.html anyone can see it since the repo and site are public. can you move it to supabase instead so it stays on the server:
- give me a supabase edge function (gemini-forecast) that only works for signed in cafecast users, reads the key from supabase secrets, and calls gemini
- try gemini 3.8 flash first then fall back to 3.5 flash-lite if it's busy, but stop straight away if the key is wrong
- error messages should tell me exactly what to fix in supabase (e.g. add GEMINI_API_KEY, deploy the function)
- update index.html to call the function when signed in, and make test connections check it
- leave the gemini key in the code empty and explain where it lives now


15. GitHub and Supabase setup guide

can you also explain how i can set up my github with these instructions. i havent been using supabase and things like that but how would i need to relate it to that for the setup.


16. Stop the browser autofilling API key fields

when i sign in, chrome / my password manager fills the ticketmaster and gemini key boxes in setup with my cafecast email and password and then the apis fail. can you fix it:
- stop the browser and password managers autofilling those boxes
- check that what's pasted actually looks like a key (gemini keys start with AIza or AQ.) and if not, clear it and say what to paste instead
- clear any wrong values that already got saved
- hide the gemini key box when signed in with supabase since the key is on the server now

can you add the api gemini key so i don't have to add it manually each time i log in,
i also want it to automatically set it to ModelGemini 3.8 FlashGemini 3.5 Flash-Lite otherwise the agentic feature will not work
this is what i currently have for my index, which includes my supabase keys

my login also doesn't work right now
Invalid path specified in request URL
