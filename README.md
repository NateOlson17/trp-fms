# TODO

! => Priority for next development session

## GENERAL

!-Comments
!-Include units inside of border view for TextInputs
!-Update DB content
-Pull DB data on splash/login screen
-Use memo where applicable
-Label text boxes above box so it's clear what they are when filled for every TextInput
-Dropdown might not need an Effect (look at RN docs), figure out how to update when provided data changes (memo?)
-Separate _layout useEffect hook by container, don't pull entire DB on change
-Improve FlatList performance (<https://reactnative.dev/docs/optimizing-flatlist-configuration>)
-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable certain features. Set up firebase rules accordingly
-Done key only appears on first AddModal call (selectionColor also resets) - create minimum reproducible example

## INVENTORY SCREEN

!-Finish implementing filter functionality
-Implement edit button on gearCard

## EVENT SCREEN

-Sorting/filtering
-Display events on calendar
-Implement add event
-Add search

## FINANCE SCREEN

-Purchase date/qty/cost for gear
-Income from Events
-Tab for receivable and payable
-Other income like gear sales
-Cost breakdown by event
-Sorting/filtering
-Add search
