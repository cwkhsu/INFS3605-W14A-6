# CafeCast Intelligence

## Who uses it
Independent café owners and managers who are responsible for daily ordering, prep planning, and minimizing perishable food waste.

## What they can do
- View an automated daily demand forecast and expected revenue calibrated by POS sales history, weekday patterns, live weather, and upcoming local events.
- Add custom owner context/notes to dynamically adjust demand predictions using Gemini.
- Review, adjust, and approve automated draft supplier orders for perishable stock grouped by supplier with transparent calculations.
-  Approve suggested menu specials with gross-margin floors to proactively sell stock forecast to expire unused.
-   Complete a quick, exception-based end-of-shift waste check that auto-logs discarded perishables and updates inventory.

## Data

## Data
[table]: id, created_at

ingredients: id, name, unit, cost, supplier, email, reorder, lead, shelf, perishable, batches, created_at
menu: id, name, price, recipe, src, no_perishables, created_at
sales: id, menu_id, qty, ts, rev, src, created_at
orders: id, supplier, email, lines, total, status, delivery, recv_ts, ts, created_at
waste: id, ingredient_id, name, unit, qty, reason, cost, ts, auto, created_at
events: id, date, name, uplift, auto, cal, ai, src, created_at
promos: id, menu_id, price, reason, active, ts, created_at
settings: id, cafe_name, place, lat, lon, state, buffer, cover, mode, webhook, holiday_uplift, tm_key, gemini_key, gemini_model, show_all, stock_count_ts, last_import, last_scan, last_scan_ts, scan_note, created_at

## Out of scope for now
- Real-time direct Square API automated webhooks (simulated via CSV/XLSX export imports).
- Automated direct email dispatch or supplier portal integration (handled via `mailto:` pre-filled client links).
-  Complete kitchen inventory tracking for non-perishable/dry goods.
-  Automated POS menu price updates for approved specials.
