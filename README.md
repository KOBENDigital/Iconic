# Iconic
The ultimate icon picker for Umbraco (hopefully)

## Introduction
With Iconic you will be able to create a property editor that can use virtually any font package out there and not only that, you will  be able to select your icon from more than one package on the same property.

## Installation

### Nuget

### Umbraco Package

### Manually
Download the code and copy it into you App_Plugin folder.


## Configuration
Once the plugin is installed is time to configure it to your needs.

### Create a new DataType
You have to create a new datatype from the Iconic editor:
1. Go to the Developer section.
2. Right click on *DataTypes*, click *Create* and click on *New data type*.
3. Enter a name for your datatype and select Iconic from the *Property Editor* dropdown.

At this point I would recommend you to save your datatype as the configuration can take a bit of trial an error as you will need to deal with some regex and urls.

### Iconic Configuration
On the Packages Configuration property, click the Add button. This will display a new form that you will use to configure your new font package.
1. Enter the name for your package
2. Create your selector. This will use regex to extract your icons css from the font package. More instructions a bit later.
3. Path to your font package css file.
    * You can use absolute paths: http:\\www.yoursite.com\sytles\fonts\my-font-package.css. This allows you to use external files,  like the ones from a CDN.
    * Or relative to the root: \styles\fonts\my-font-package.css
 4. Extra classes. Some packages need some extra classes to display the icons. Font Awesome for example needs 'fa' as an extra class. This classes will be added to the specific icon class when the value stored by the plugin has to be used on the frontend.
 4. Click *Analyse*. This will extract the styles from the file and will save them as par of the property configuration. This will save time avoiding analising the file each time we want to use the datatype.
 5. Click *Add Package* to add the configuration  to your packages listing.
 
 You can add as many packages you like. You can also arrange their order or remove those you don't want to use anymore.

### Using the DataType
Once you have configured your datatype, you can use it as a property editor.
To add or modify your icon just click on the placeholder, this will open a dialog where you can select form your configured packages. Once a package is selected, all the icons will be displayed below.

### Displaying the icon
Iconic comes with a value converter that will return a string containing the icon class. So you just have to use the model of your template like so:

<i class="@Model.Content.MyIcon" />

---

Handmade by Mario Lopez - 2017 @KobenDigital
