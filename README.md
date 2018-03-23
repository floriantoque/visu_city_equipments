# Introduction

This project aims to simply create a **visualisation of elements on an interactive map**. Each element is depicted by an icon that gives information on it, such as the name, address and way to go to the element. It is possible to link an icon and a state (e.g. visited or not) to each element. Finally, a tree selection parameter allows to easily filter the elements to show on the map. It uses **mapbox** and **hummingbird-treeview** packages.

This is a [demo](http://floriantoque.github.io/visu_city_equipments/website_equipments/map_equipments.html).

### In order to create a visualisation, you need 3 type of files:  

 * A file that describes the elements. It can be a **json file or  a csv file** that can be converted to a json file with the python script _"script\_notebook/csv\_to\_json.py"_. This file has to contain the following informations (informations in bold are needed, the others can handle empty values):
  * **id***: unique identifier (string or int)
  * name: name of the element
  * **lat***: latitude of the element
  * **lon***: longitude of the element
  * address: address of the element
  * zipCode: zip code of the element
  * websiteUrl: website url of the element
  * id_cat: unique identifier of the category of the element
  * **cat***: category of the element such as Tennis, Swimming pool which is linked with the state to an icon.
  * city: city of the element
  * type: type of the element
  * **state***: state of the element such as visited, not yet visited. It is linked with the category to an icon.
 
 The json file has to begin with "equipments =" like this:
 
  *  equipments = {"id1":{"name":"name1","lat":"lat1",...},"id2":{...}}

 * png files that reprensent the icons which depict the elements on the map. 
 * A json file that allows to link the state and the category of an element to an png file. It has to begin with "state\_png =" like this:
  * state\_png = { 'cat1': {'state1': '../data\_website\_equipments/png/cat1\_grey.png', 'state2': '../data\_website\_equipments/png/cat1_yellow.png'}};

### [Optional] If you want to use the python script "csv to json" or get the data in the demo:
You need Python 2.7 with pandas and requests library.

 * The notebook _"script\_data.ipynb"_ shows how to clean the data from Paris api and Montreal api in order to obtain on csv file.
 * The script _"script\_notebook/csv\_to\_json.py"_ transform this kind of csv file on the needed json file. Run the script like this:
 ```
python csv_to_json.py "../data_website_equipments/csv/equipments.csv" "../data_website_equipments/json/equipments.json"
```