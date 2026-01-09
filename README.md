# TODO

! => Priority for next development session

## GENERAL

-Memoize components?
-Find a better way to handle GearContainer. Lots of manually initializing blank instances, and the type GearListContainer is very similar. It's also hard to search within GearContainer
-Improve FlatList performance (<https://reactnative.dev/docs/optimizing-flatlist-configuration>)
-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable certain features. Set up firebase rules accordingly
-Update DB content

## INVENTORY SCREEN

-Edit button on gear card
-Add Gear: Make ITEM dropdown clear when CATEGORY dropdown updates (component key change?)
-Filter Gear: Reset button shows up unpredictably and prevent reset from fading in entire modal again

## EVENT SCREEN

!-Write Event.getGear function. Keep in mind that Gear.key is 'lxFixtures/asdoqwm4392m' for example. DONT FORGET THAT I WIPED DB!!! MAKE SURE THAT TECHNICIAN IS STILL SAVED AS STRING KEY WHEN CREATING EVENT. MODIFY SETGEAR FUNCTION ON EVENT TO MAP BACK TO STRINGS BEFORE SAVING AS WELL! CHANGE STATE VARS TO BE NAMED managerKey or gearKeyList ETC FOR READABILITY.
-Search/filter buttons, re render calendar after adding/filtering/searching (immutable markedDates list?)
-Edit button
-Custom styling on events to show number of events on a day, overlapping events, etc. Make selected day and current day more obvious
-Overall stats by month
-Add sheet view toggle

## EVENT DETAIL

-Button for next step in process or back or skip
-Fix scrolling/expansion
-When adding gear, account for loss in quantity due to gear already being out on that day
-Set up days system for GearList
-Option to delete gear
-Ability to add custom item to quote
-Discount field and overall price
-Ability to set a "needs attention" flag. Set automatically if missing items on inbound or outbound
-Tech list (as dropdown for role in show - can add multiple, and dropdown for tech - show possible roles in dropdown, options to add/delete/contact, rate and days if more than one to right, don't forget to restrict based on availability and disallow role overlaps)
-ROD (options to edit/delete/add - preset options to add like call time/curfew/etc or custom)
-Notes field
-Finish gear list feature on EventDetail, including total price etc

## LABOR SCREEN

-Filter reset: force rerender of location radio
-Edit button
-Better UI for selecting roles, get rid of text and use arrow only? Text only prop on Dropdown component
-Option to generate 1099
-Outline tech in red if unpaid for anything. Show amount as numbered bubble much like ServiceTickets on gear card
-Individual calendar for each tech (show confirmed/unconfirmed dates in different colors)
-Color code roles everywhere?

## FINANCE SCREEN

-Color coded continuous log for:
    Income from Events (tap for sub-breakdown)
    Gear Purchases (tap for info)
    Gear Sales (tap for info)
-Show overall stats (% recouped/profit/revenue/show expenses/total purchases spend/average revenue per event/average profit per event (all-time/12mo/YTD radio))
-Search/filter (money in/out, category, amount,date)
