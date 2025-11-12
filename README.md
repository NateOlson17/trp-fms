# TODO

! => Priority for next development session

## GENERAL

-useMemo?
-Separate _layout useEffect hook by container, don't pull entire DB on change and make initial pull on splash screen for load times
-Improve FlatList performance (<https://reactnative.dev/docs/optimizing-flatlist-configuration>)
-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable certain features. Set up firebase rules accordingly

## INVENTORY SCREEN

-Edit
-Update DB content
-Add Gear: Label numerical TextInputs so it's clear what they are when filled and add units
-Add Gear: Make ITEM dropdown clear when CATEGORY dropdown updates
-Filter Gear: Reset button shows up unpredictably

## EVENT SCREEN

-Search/filter
-Edit
-Display events on calendar
-Show event screen

## LABOR SCREEN

!-Add location for techs
-Edit
-Option to generate 1099
-Outline tech in red if unpaid for anything. Show as numbered bubble much like ServiceTickets on gear card

## FINANCE SCREEN

-Color coded continuous log for:
    Income from Events
    Gear Purchases
    Gear Sales
-Show overall stats
-Search/filter (money in/out)
