# Online Wiki

Dette er Onlines wiki, overført fra OnlineWeb4!

## Installation

```sh
bun install
```

## Local Development

```sh
bun dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```sh
bun run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Done automatically with GitHub Actions

---

## Wiki Guide for Managing Pages

### Overview

1. [Add new pages](#add-new-pages)
2. [Editing pages](#editing-pages)
3. [Delete pages](#delete-pages)
4. [Add pictures/attachments](#add-pictures-and-attachments)

---

#### Add new pages

Follow these steps to add a new page in the wiki:

1. **Navigate to the correct folder**
   - Navigate to the `src/content/docs` folder. Either create a new folder for your page or choose an existing folder.
2. **Creating a page**
   - Create a page by adding a `.md` file inside the folder.
   - Add a front matter section at the top of your file:
  
        ```yaml
        ---
        title: "Insert Title"
        ---
        ```

   - Fill in the desired content for the page.

#### Editing pages

  **Option 1:** Navigate to the folder containing the `.md` file you wish to edit. Open the file in your preferred text editor and make your changes.
  **Option 2:** Visit the page in the wiki. At the bottom of the page, click on the `"Rediger side"`` option. This will redirect you to GitHub, where you can edit the page directly in your browser, eliminating the need for a source code editor.

#### Delete pages

- Navigate to the folder containing the `.md` file and delete it. Ensure that any references to the deleted page (e.g., links) are updated or removed to prevent broken links in the wiki.

---

#### Add pictures and attachments

Follow these steps to add a picture or attachments to your wiki page:

##### Adding images

1. **Add the image file in the repository**
   - Navigate to the `src/assets/images` folder and add your image file (`.png`, `.jpg`, `.jpeg`, `.gif`).
2. **Add image to your page**
   - Link to your image in your page:
  
    ```markdown
    ![Description](../../../assets/images/your-image.png)
    ```

##### Adding attachments

1. **Add the attachment file to the repository**
   - Navigate to the `public/attachments` folder in the repository's root directory and add your attachment file (`.pdf`, `.xlsx`, `.zip`, etc.).
2. **Link the attachment to your page**
  
    ```markdown
    [Attachment 1](/attachments/your-attachment.pdf)
    ```
