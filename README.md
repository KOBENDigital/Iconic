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
1. Enter an alias (this will be remove in next version).
2. Enter the name for your package
3. Create your selector. This will use regex to extract your icons css from the font package. More instructions a bit later.
4. Path to your font package css file.
    * You can use absolute paths: http:\\www.yoursite.com\sytles\fonts\my-font-package.css. This allows you to use external files,  like the ones from a CDN.
    * Or relative to the root: \styles\fonts\my-font-package.css
