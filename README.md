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

# WikiHOW GUIDE

Information for managing pages in the wiki.

## Table of Contents

1. [Add new pages](#add-new-pages)
2. [Delete pages](#delete-pages)
3. [Add pictures/attachments](#add-pictures)

---

## Add new pages

Follow these steps to add a new page in the wiki:

1. **Run the project locally**
   - Use the instructions over to run the project locally to see the changes reflected live
2. **Navigate to the correct folder**
   - Navigate to the src/content/docs folder create a folder for your new page
3. **Creating a page**
   - Create a page by adding a .md file inside the new folder you just made
   - Add form-matter to the page by adding:
  
        ```sh
        '''
        title: [insert title]
        '''
        ```

   - Fill in desired content for the page

## Delete pages

## Add pictures/attachments

Follow these steps to add a picture or attachments to your wiki page:
### Adding images
1. **Add image file in the repository**
   - Navigate to the src/assets/images and add your image file (.png, .jpg, .jpeg, .gif)
2. **Add image to your page**
   - Link to your image in your page:
  
        ```sh
        ![](../../../assets/images/your-image.png)
        ```

### Adding attachments
1. **Add attachment file in the repository**
   - Navigate to the static folder
---
