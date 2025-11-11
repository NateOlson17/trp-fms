# TODO

! => Priority for next development session

## GENERAL

-Update DB content
-Include units for TextInputs
-Use memo where applicable
-Label text boxes above box so it's clear what they are when filled for every TextInput
-Dropdown might not need an Effect (look at RN docs), figure out how to update when provided data changes (memo?)
-Separate _layout useEffect hook by container, don't pull entire DB on change and make initial pull on splash screen for load times
-Improve FlatList performance (<https://reactnative.dev/docs/optimizing-flatlist-configuration>)
-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable certain features. Set up firebase rules accordingly

## INVENTORY SCREEN

-Implement edit functionality

## EVENT SCREEN

-Sorting/filtering
-Display events on calendar
-Implement add event
-Add search feature

## LABOR SCREEN

-Create edit feature
-Create search/filter features
-Option to generate 1099 etc

## FINANCE SCREEN

-Purchase date/qty/cost for gear
-Income from Events
-Tab for receivable and payable
-Other income like gear sales
-Cost breakdown by event
-Sorting/filtering
-Add search
-timestamped transaction log
