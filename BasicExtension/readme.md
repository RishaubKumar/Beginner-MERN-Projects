# HOW TO CREATE A CHROME EXTENSION ALL BASIC STEPS 
A Chrome extension is a small program that modifies the experience or adds functionality to the Chrome browser. These extensions are created using web technologies like HTML, CSS, and JavaScript, and they can change the browser's functionality, add new features, or enhance the browsing experience. Chrome extensions started being supported in 2009 and allow users to customize their browsing experience according to their needs. 

## WE WILL MAKE A END TO END JOKE EXTENSION AND LEARN HOW TO MAKE AN EXTENSION THROUGH IT 

This will be a simple extension using simple html css and js and will display a joke when we call the extension and it will fetch the joke from free joke api 

### EXTENSION REQUIREMENTS (FILES AND FOLDERS):

** manifest.json ** : this is must have file this file explains the browser that this file is a extension and below is bare minimum code for it : 
{
  "name": "Just Jokes",
  "version": "0.0.1",
  "manifest_version": 3,
  "action": {
    "default_popup": "popup.html",
    "default_title": "Just Jokes"
  }
}

If you want to run this at your chrome browser have to click on extensinos option which you will get by clicking the threee dots at corners and then on the developers mode then click (load unpacked) and open your folder in which your file resides (where you have written the above code).