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

---

## Information about frontmatter and sidebar

This project uses a custom Astro sidebar, found in `/sidebar/getSiderbar.js`. It will always place any `index.md` or `index.mdx` on the top of a directory, followed by all subdirectories, followed by all files. Using sort options in the frontmatter, you can control the order inside the files and subdirectories, but not make files appear before subdirectories.

The following frontmatter can be used in the `.md` files to control the sidebar:

```
- title: string
- ... and other default Starlight frontmatter keys
- date: string
- child-directories-sort: "asc" | "desc" | "date"
- child-files-sort: "asc" | "desc" | "date"
- link: string (if this is set, the sidebar will link to this URL instead of the page)
```

Notes:

- `title` will be used as the title in the sidebar and on the page. The file name will be used as a fallback if no title is provided.
  - If the file is `index.md` or `index.mdx`, the title will also be the name of the directory.
- `date` should be parsable by `new Date()`
- `child-directories-sort` will sort all directories in same directory, but **not** all subdirectories.
- `child-files-sort` will sort all files in same directory **and** all files in all subdirectories.
- `link` will make the sidebar link to the provided URL instead of the page itself. Any children will be hidden in the sidebar. The page and any children will still be accessible by URL.

### Special cases

1. The top-level directory is not shown in the sidebar (`astro.config.mjs:69`)
2. Any directory:
    - who's path includes `motereferater-fra-hovedstyret/`
    - AND where child items are sorted by date
   
   will have their child files grouped into "Høst" and "Vår". This does not alter any URLs. (`/sidebar/groupHsMeetings.js`)
3. Any file:
    - who's path includes `generalforsamlinger`
    - AND where child directories are sorted by date
    
    will have all but their three first child directories grouped into "Tidligere generalforsamlinger". This does not alter any URLs. (`/sidebar/groupGeneralforsamlinger.js`)
4. Any file:
    - whos path includes `generalforsamlinger`
    - AND matches the regex in `/sidebar/trimGeneralforsamlingerDirectoryLabel.js`
    
    will have `"Genfors "` trimmed from their title in the sidebar. (`/sidebar/trimGeneralforsamlingerDirectoryLabel.js`)
