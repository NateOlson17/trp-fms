# TODO

o => Low priority
! => Priority for next development session

## GENERAL

o-Separate _layout useEffect hook by container, don't pull entire DB on change
!-Clean up for readability, add comments, make sure no equating objects, use let/var where applicable, try to eliminate as keyword, watch for semicolons and indentation, check for utilities that could be global functions, make sure no == only ===
-Label text boxes above box so it's clear what they are when filled for every TextInput, include units
o-Improve FlatList performance (https://reactnative.dev/docs/optimizing-flatlist-configuration)
o-Update DB content
o-Login via Technician object, pass user Technician object and online status as Context. Use this context to disable features
o-Implement Firebase rules

## INVENTORY SCREEN

!-add sell/destroy button on gearCard (choose selling/trashing and leave notes, on gearcard no modal). Delete all gear and add new for testing
-Track locations and purchase dates on gearCard
-Finish implementing filter functionality
-Implement edit button on gearCard itself, brings up modal
o-Placeholder text resets even if there is no change in data (because onSelect/onExpand updates state in Modal component, re-rendering all dropdowns, must fix). useEffect currently commented out to hide issue
o-Done key only appears on first AddModal call (selectionColor also resets) - create minimum reproducible example

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
