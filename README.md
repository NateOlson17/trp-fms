# TODO

## GENERAL

-Improve FlatList performance (https://reactnative.dev/docs/optimizing-flatlist-configuration)
-Update DB content
-Login via Technician object (add permissions to Technician)
-Implement Firebase rules

## INVENTORY SCREEN

!-Put typical gold border in global styles
!-Implement filter functionality
-Placeholder text resets even if there is no change in data (because onSelect/onExpand updates state in Modal component, re-rendering all dropdowns, must fix)
-Done key only appears on first AddModal call (selectionColor also resets) - create minimum reproducible example
-Track qty in each location
-Implement add gear
-Implement edit button on gearCard itself, brings up modal

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
