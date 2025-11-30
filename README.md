# TODO

! => Priority for next development session

## GENERAL

-useMemo?
-Separate _layout useEffect hook by container, don't pull entire DB on change and make initial pull on splash screen for load times
-Improve FlatList performance (<https://reactnative.dev/docs/optimizing-flatlist-configuration>)
-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable certain features. Set up firebase rules accordingly
-Port to web

## INVENTORY SCREEN

-Edit
-Update DB content
-Add Gear: Make ITEM dropdown clear when CATEGORY dropdown updates (key?)
-Filter Gear: Reset button shows up unpredictably

## EVENT SCREEN

-Search/filter
-Edit
!-Display events on calendar (marked dates)
-Overall stats

## EVENT MODAL

-Show individual event modal
-General info at top
-Gear list (as textinput for quantity and dropdown for item, price displayed at side, options to add/delete, don't forget to restrict based on availability)
-Tech list (as dropdown for role in show - can add multiple, and dropdown for tech - make key include name and possible roles, options to add/delete/contact, don't forget to restrict based on availability)
-ROD (options to edit/delete/add - preset options to add like call time/curfew/etc or custom)
-Status timeline with button for next step in process (RESERVED (red): QUOTE -> QUOTED (yellow): EDIT QUOTE OR CONFIRM -> CONFIRMED (green): OUTBOUND -> OUTBOUNDED (white): INBOUND -> INBOUNDED (red): INVOICE -> INVOICED (yellow): MARK PAID -> PAID (green), flags/warnings if missing items on inbound or outbound)

## LABOR SCREEN

-Filter reset: force rerender of location radio
-Edit
-Option to generate 1099
-Outline tech in red if unpaid for anything. Show as numbered bubble much like ServiceTickets on gear card
-Individual calendar for each tech (show confirmed/unconfirmed dates in different colors)

## FINANCE SCREEN

-Color coded continuous log for:
    Income from Events (tap for sub-breakdown)
    Gear Purchases (tap for info)
    Gear Sales (tap for info)
-Show overall stats (% recouped/profit/revenue/show expenses/total purchases spend/average revenue per event/average profit per event (all-time/12mo/YTD radio))
-Search/filter (money in/out, category, amount,date)
