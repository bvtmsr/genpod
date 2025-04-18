



**Project Table**

The project table is a table that displays a list of projects for the current user. The table has three columns:

* `id`: The ID of the project
* `name`: The name of the project
* `actions`: A column that displays a button to load the project and a button to delete the project

**Actions**

The project table has two action buttons:

* `handleLoadProjectClick`: A function that is called when the load project button is clicked. This function navigates to the project page.
* `handleDeleteProjectClick`: A function that is called when the delete project button is clicked. This function opens a confirmation modal to confirm the deletion of the project.

**.md File**

Here is a sample `.md` file that explains the project table:
```md
# Project Table

The project table is a table that displays a list of projects for the current user.

## Columns

The project table has the following columns:

* `id`: The ID of the project
* `name`: The name of the project
* `actions`: A column that displays a button to load the project and a button to delete the project

## Actions

The project table has the following action buttons:

* `handleLoadProjectClick`: A function that is called when the load project button is clicked. This function navigates to the project page.
* `handleDeleteProjectClick`: A function that is called when the delete project button is clicked. This function opens a confirmation modal to confirm the deletion of the project.

## Example Usage

```typescript
import { ProjectTable } from './ProjectTable';

const App = () => {
  return (
    <div>
      <ProjectTable />
    </div>
  );
};
```
Note that this is just a sample `.md` file and you may want to add or remove sections depending on your specific use case.

## Technical Details

* The project table is defined in the `src/components/user/projects/ProjectTable.tsx` file.
* The table uses the `Table` component from `@mantine/core` to display the list of projects in a table format.
* The table uses the `useProjectOperations` hook to fetch the list of projects from the server.

## Best Practices

* The project table follows the best practice of displaying a list of projects for the current user.
* The table uses a consistent naming convention for the columns and action buttons.
* The table uses a confirmation modal to confirm the deletion of a project.
```
### Project Table Columns

| Column | Description |
| --- | --- |
| id | The ID of the project |
| name | The name of the project |
| actions | A column that displays a button to load the project and a button to delete the project |

### Project Table Actions

| Action | Description |
| --- | --- |
| handleLoadProjectClick | A function that is called when the load project button is clicked. This function navigates to the project page |
| handleDeleteProjectClick | A function that is called when the delete project button is clicked. This function opens a confirmation modal to confirm the deletion of the project