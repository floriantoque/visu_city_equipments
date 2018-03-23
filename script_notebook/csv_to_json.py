#!/usr/bin/python

import sys
import json
import pandas as pd

path_csv=sys.argv[1]
path_json=sys.argv[2]
#path_csv="../data_website_equipments/csv/equipments.csv"
#path_json="../data_website_equipments/json/equipments.json"
df = pd.read_csv(path_csv)
json_equipments = df.set_index("id").to_json(orient="index",force_ascii=False)

with open(path_json, "w") as text_file:
    text_file.write("equipments = {};".format(json_equipments))



### Optional, uncomment this part if you want to create state_png.json information with the script
# path_json="../data_website_equipments/json/state_png.json"
# json_state = {"Swimming Pool":{'Not yet visited':'../data_website_equipments/png/piscine_grey.png',
#                     'Visited':'../data_website_equipments/png/piscine_blue.png'},
#         "Tennis":{'Not yet visited':'../data_website_equipments/png/tennis_grey.png',
#                   'Visited':'../data_website_equipments/png/tennis_yellow.png'}
# }
# with open(path_json, "w") as text_file:
#    text_file.write("state_png = {};".format(json_state))
###
