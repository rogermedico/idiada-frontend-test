# Idiada Exercice Frontend Angular

## Context

I was provided with an Angular 6 project that I'm unable to run due to angular.json file missing. The project had two components styled with [primeng](https://github.com/primefaces/primeng) and [primeicons](https://github.com/primefaces/primeicons). One component was a CRUD of vehicles and the other was a dialog that seems to open when a new vehicle is created or edited.

The mock data was created with `createVehicle` and `createVehicleList` defined in `MockitoUtils.ts` file into `utils` folder. That two functions uses `Builder` function and `VehicleView` class stored into `domain` folder.

Then to retrieve the data from component it was a service with `loadVehicles` and `createVehicle` functions. The first function calls `createVehicleList` that retrieves mock data. The second one, seems a legit call to an API.

## Work done

1. Run the project: I have created a new Angular 12 project and installed `primeng` and `primeicons` dependencies. Then I moved all the component, services and other files into the new project and only then I could run the project and see the vehicle CRUD.

2. Enable strict mode: Angular 12 comes wih strict mode enabled. I have modified the code since I could enable the strict mode.

3. Implement proper vehicles service: I have installed [in-memory-web-api](https://github.com/angular/in-memory-web-api) dependency to intercept the API calls and return mock data. Then I modified the `vehicles.service.ts` with proper calls to an API. After that I made a call to get the vehicles into `vehicles-list` component and checked if it worked.

4. Functional CRUD: I have installed [@angular/material](https://material.angular.io/) and [@angular/flex-layout](https://github.com/angular/flex-layout). Then I have modified `vehicle-list` and `vehicle-dialog` to make the CRUD functional.

5. Vehicles module: I have extracted all vehicles functionality into a new module that is lazy loaded to make the app more modular and allow the development and inclusion of new modules each of them into a specific route.

6. UI/UX improvement: When all was working I have started to work in the UI. I have replaced all `primeng` and `primeicons` with `@angular/material` and then I have removed them as I didn't use them anymore.

7. Refactored files and folders: Moved all the files into a new folder schema for a better file understanding.

8. Toolbar, sidebar, dark mode and other module: I have added a toolbar, a sidebar and a new home module (very simple). I have also added the ability to change the app to dark mode.

9. Pagination and column order: I have added pagination and the ability to order the columns to the vehicle table.

10. Notifications: I have added a snackbar notification when some CRUD operation is done.

11. Final tweaks: Some CSS tweaks to improve application UI.

## Project explanation

- Toolbar: The toolbar has a button on the left that brings the user to the home component and a icon on the right that allows user to switch between light and dark mode.

- Sidebar: The sidebar has all modules entry points. If new modules are added to the app a good point to make them accessible is implementing a link into the sidebar. In low resolutions the sidebar is hidden and an icon on the toolbar allows users to show or hide it.

- Home module: Trivial.

- Vehicles module:
  - Title: It shows the module name and the count of vehicles in the list. It also have a icon on the right that allows the user to download an excel file with all the list info.
  - Filter: It is an input that allows the user to filter the list by any vehicle field. It starts to work from 3 letters. You can try with plate or vin number that are different from every vehicle.
  - Table: Clicking into the header of a column the user can order the whole table by that field ascending, descending or default order. Each row has one vehicle info with the corresponding actions icons into the last column. Into the bottom of the table there are the pagination.
  - Create vehicle: at the bottom right there are an icon that allows user to create new vehicles.
  - Responsiveness: When the page is small some columns from the table are hidden and the download excel and create vehicle buttons are moved to the top right corner.

## Run Project (local environment)

Run `npm run start` and a browser should automatically open with the app running. If not navigate to `http://localhost:4200`.

## Author

Roger Medico Piqué - roger.medico@gmail.com
