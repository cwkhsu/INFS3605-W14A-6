# INFS3605-W14A-6
**INFS3605 Information Systems Innovation &amp; Transformation Capstone Project : W14A-6**

Jenny Dang - Scrum Master

Michelle Nguyen - Product Owner

Felicity Chen - UI/UX Lead

Jessica Lam - Developer

Karen Hsu - Developer

Sarah Xie - Developer


# CafeCast
## Transforming Cafe Operations Through AI
INFS3605 | GROUP ASSIGNMENT | GROUP 6

CafeCast helps small cafe owners make smarter purchasing decisions by turning sales, inventory and external demand into actionable stock order recommendations.

## Problem Statement
The problem is that cafe operators order perishable inventory based on habit rather than actual demand patterns, because there's no quick way to know how much demand will differ from a “normal” day.

It affects independent cafe owners' and staff’s daily ordering and preparation, especially on days where demand fluctuates due to unexpected factors (weather, seasonal changes and events).
This needs to change by implementing a faster and more reliable way to understand how current demand and supply conditions should influence each order.

Because without clear insight, there are risks of over-ordering, stock shortages and food waste. In turn, this can affect profitability, pricing and consumer satisfaction, impacting the cafe's performance; which is detrimental in a competitive industry

## Objectives
Connect POS sales and inventory data in one system to streamline operations
Implement a forecasting system for owners to predict events that may impact sales
Minimise waste levels from perishable stock being underutilised

# Our Solution: CafeCast
Low-Code App: CaféCast (Founder’s Second Brain)
| |Decision|Reason|
|---|---|---|
|**Forecast**|Combine sales, stock and external demand factors.|Fragmented information is a current barrier to accurate stock ordering.|
|**Recommend**|Recommend quantities and decisions instead of simply displaying data.|Local cafe owners rely on experience, intuition and manual processes to estimate orders.|
|**Approve**|Keep owner in control of orders|Purchasing decisions have high stake in cafe operations. Requiring owner approval keeps the final decision with the cafe operator.|

# Solution Workflow and Agent’s Role
## 1. Collect Data
Connect cafe data from POS (e.g. Square, Lightning) or spreadsheets. Enter recipes and initial inventory for setup. External information such as weather, location, holidays and events are retrieved through 3rd party sources.

## 2. Generate intelligent forecasts
### Rule-based
Based on historical sales, weekday patterns, weather and events, demand will be calculated.
### Gemini AI
Based on owner input, the demand forecast can be adjusted for more accurate results.

## 3. Hand the decisions over to the agent
The CafeCast agent will read the forecast and make decisions on what to do with expiring goods or if stock needs to be ordered to fulfil demand. Delivery schedules and pack sizes are checked and supplier-grouped draft orders are generated.

## 4. Owner approves the decisions
The owner can approve the orders or automation can be setup. Through a webhook, CafeCast can directly submit the order to the supplier.

# Tools - How We Built It
## App Foundations
Demo deployment - GitHub Pages
|HTML|CSS|JavaScript|
|---|---|---|
|Dashboard sections|Warm, cafe-inspired look|Daily updated plan|
|Stock and waste managament views|Sidebar navigation layout|Calculation of forecasts|
|Input fields|Mobile and desktop layout|Integration with Supabase and Gemini|

## Data Connections
|Data|Source|
|---|---|
|Cafe Data|Cafe’s POS system APIs - connect live sales, menus<br>CSV/Excel files - weekly sales report, parsed by SheetJS|
|Data Storage|Supabase - account data and device sync<br>Local storage - for uploaded data|
|External Data - APIs|Open-Meteo - weather<br>Nager - holidays<br>Google Maps Platform - location|
|AI Connection|Gemini Flash Lite - allows owners to add context to shape forecasts|
|System Communication|Webhooks - communicate with external email platforms|

## Deploying for cafe use
Our demo is currently deployed on GitHub pages but for real-life use case, we need to use platforms that allow us to publish the CafeCast web platform for commercial use. Some options include: Vercel (pro), Netlify (pro) and Cloudflare.

# Agentic Feature | A day with CafeCast
Predict demand → Check what’s at risk → Time the next step · on launch & in background
| |Trigger|CafeCast|Owner|
|---|---|---|---|
|**Before opening**|Owner opens the morning brief|Uses sales, weather, holidays & events to brief demand and priorities|Checks the brief and plans the day|
|**Before supplier cut-off**|Expected demand > available stock|Uses stock cover & cut-offs to draft orders and show what’s at risk|Reviews quantities, approves in one tap|
|**At closing**|Cafe’s closing time|Uses stock & expiry dates to flag perishables for the waste check|Checks flagged items, records actual waste|

## Owner sets the autonomy
Approve each order, or Autopilot for routine orders within a spending limit
### Proactive & hands-free
Cut-off & expiry alerts, ask “What do I need to order?” or say “Approve orders”

# Use Case #1: Demand Forecasting
As a cafe owner, I want to know how busy today will be and why, so that I can plan stock and prepare ahead based on real demand instead of habit while I set up.
1. Pulls sales & live data for plan
2. Hears the forecast & reasons
3. Add an extra note (manual/voice)
4. Forecast is updated
5. Recommended decisions update

With CafeCast: a daily plan built on real demand that users can check and adjust, hands-free

# Use Case #2: Inventory Management & Replenishment
As a cafe owner, I want all my supplier orders to be in one place, so I can order the right amount without wasting time manually preparing orders by hand.
1. CafeCast drafts order
2. Checks reasons & calculations
3. Reviews & edits orders
4. Approves; PO is emailed
5. Delivery is received

With CafeCast: ordering decisions drafted automatically, owner reviews and approves

# Use Case #3: Waste Prevention & Logging
As a cafe owner, I want to see which perishables will go to waste before they’re used and log waste quickly, so I spend and waste less
1. Checks the expiry watchlist
2. Menu specials recommendations
3. At close, check flagged items
4. Logs whats binned & why
5. See saving and impact

With CafeCast: risks flagged early, waste logged in minutes, and saves in monetary value

# User Testing Plan
Moderated user testing sessions assessed whether café owners could benefit from CafeCast and use it without help, using realistic demo data.
- 5 participants: Cafe owners and managers who regularly place stock orders. Recruited through personal connections, with various levels of technical expertise.
- 30-min session: 3-min brief, 20-min on three tasks, 7-min debrief and interview. One facilitator and no hints provided, audio recorded with consent.
- Live prototype in Sandbox environment: Little Fern Café demo dataset with Square sandbox sales. Coffee beans have low inventory, bread expires tomorrow and local event logged tomorrow.

## 3 Tasks
Spot what items require attention (i.e. low stock, near expiry)
Approve today’s stock order and contact suppliers
Close the day by logging waste and its associated cost

# Key learnings
## User centred design drives adoption
Continuous owner engagement validated real pain points and shaped a practical solution.

## AI capabilities + human judgement works best
AI provides valuable forecasting and computing capabilities but owner control is essential for building trust.

## Iterative delivery drives better outcomes
Agile delivery and cross functional collaboration nurtures creativity and innovation.
The value of AI isn't simply in predicting demand, but in making complex information accessible, actionable and trustworthy for everyday business owners.

# What's next for CafeCast?
1. **Pilot:** Validate with independent cafes
2. **Refine:** Improve forecast accuracy and usability
3. **Scale:** Explore initiatives to drive adoption


