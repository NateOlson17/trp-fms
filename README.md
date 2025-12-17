# TODO

! => Priority for next development session

## GENERAL

-useMemo?
-Separate _layout useEffect hook by container, don't pull entire DB on change and make initial pull for all-access info on splash screen for load times. Store sub objects by key in DB, such as Technician on gig etc, instead of storing full object which can change, look up actual object as needed. Set up 'awaiting' on data pulldown.
-Improve FlatList performance (<https://reactnative.dev/docs/optimizing-flatlist-configuration>)
-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable certain features. Set up firebase rules accordingly
-Port to web
-Update DB content
-General code/styling/syntax cleanup

## INVENTORY SCREEN

-Edit button on gear card
-Add Gear: Make ITEM dropdown clear when CATEGORY dropdown updates (component key change?)
-Filter Gear: Reset button shows up unpredictably and prevent reset from fading in entire modal again

## EVENT SCREEN

-Search/filter buttons, re render calendar after adding/filtering/searching (immutable markedDates list?)
-Edit button
-Custom styling on events to show number of events on a day, overlapping events, etc. Make selected day and current day more obvious
-Overall stats
-Add sheet view toggle
-Change event props so they arent ?? or undefined, the issue is when adding events. Make it required in the object.

## EVENT DETAIL

!-Make animations work by referencing 'top' instead of 'height'. Make dismissal smoother
-Button for next step in process or back, flags/warnings if missing items on inbound or outbound
-Gear list (by category, as textinput for quantity and dropdown for item, price each, days if more than one, and total displayed at side, blank one at bottom that if filled adds the Gear, option to delete, don't forget to restrict choices/quantity based on availability)
-Ability to set a "needs attention" flag
-Allow to skip invoiced step or force backwards a step
-Tech list (as dropdown for role in show - can add multiple, and dropdown for tech - show possible roles in dropdown, options to add/delete/contact, rate and days if more than one to right, don't forget to restrict based on availability and disallow role overlaps)
-ROD (options to edit/delete/add - preset options to add like call time/curfew/etc or custom)
-Notes field

## LABOR SCREEN

-Filter reset: force rerender of location radio
-Edit button
-Better UI for selecting roles, get rid of text and use arrow only? Textonly prop on Dropdown component
-Option to generate 1099
-Outline tech in red if unpaid for anything. Show amount as numbered bubble much like ServiceTickets on gear card
-Individual calendar for each tech (show confirmed/unconfirmed dates in different colors)
-Color code roles everywhere

## FINANCE SCREEN

-Color coded continuous log for:
    Income from Events (tap for sub-breakdown)
    Gear Purchases (tap for info)
    Gear Sales (tap for info)
-Show overall stats (% recouped/profit/revenue/show expenses/total purchases spend/average revenue per event/average profit per event (all-time/12mo/YTD radio))
-Search/filter (money in/out, category, amount,date)
