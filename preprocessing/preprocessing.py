# -*- coding: utf-8 -*-
import os
import sys
import json

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, DIR_PATH)

# Define input directory
INPUT_DIR = os.path.join(DIR_PATH, "./input")
OUTPUT_DIR = os.path.join(DIR_PATH, "../public/data")

def findInputFiles(rootDir):
    inputFiles = []
    for file in os.listdir(rootDir):
        year = int(os.path.splitext(file)[0].split("-")[1])
        inputFiles.append({
            "path": os.path.join(INPUT_DIR, file),
            "year": year,
        })

    print("Found %s input files." % (len(inputFiles)))
    return inputFiles

def parseData(inputFiles):
    inputData = []
    for file in inputFiles:
        print("Parse year %s ..." % file["year"])
        features = []
        with open(file["path"], "r") as f:
            data = json.load(f)

            # Iterate over stations
            for sensor in data["data"]:
                # Iterate over timeseries
                ts = []
                for i in range(0, len(sensor["values"])):
                    ts.append({
                        "timestamp": data["intervals"][i]["begin"],
                        "value": sensor["values"][i]["v"]
                    })

                # Save data
                features.append({
                    "coordinates": [sensor["location"]["lng"], sensor["location"]["lat"]],
                    "href": sensor["href"],
                    "timeseries": ts,
                })

        print("Parses %s for %s year." % (len(features), file["year"]))
        inputData.append({
            "features": features,
            "year": file["year"],
        })
    return inputData

def preprocessData(inputData, outputDir):
    for slice in inputData:
        # Remove double records
        unique = {}
        for feature in slice["features"]:
            coordinate = feature["coordinates"]
            unique["%s_%s" % (round(coordinate[0], 4), round(coordinate[1], 4))] = feature
        uniqueFeatures = unique.values()
        print("Reduce from %s to %s features." %(len(slice["features"]), len(uniqueFeatures)))

        # Preprocess the data
        features = []
        for feature in uniqueFeatures:
            # Count days of 50 µg/m3
            countOver50 = 0
            for record in feature["timeseries"]:
                if record["value"] is not None and record["value"] >= 50:
                    countOver50 += 1
            features.append({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": feature["coordinates"],
                },
                "properties": {
                    "href": feature["href"],
                    "over50": countOver50,
                }
            })

        # Write the data
        print("Write %s features for year %s." % (len(features), slice["year"]))
        with open(os.path.join(OUTPUT_DIR, "pm10-%s.json" % slice["year"]), "w") as outFile:
            json.dump({
                "type": "FeatureCollection",
                "features": features,
            }, outFile)

print("Start preprocessing ...")

print("Searching for input data ...")
inputFiles = findInputFiles(INPUT_DIR)

print("")
print("Parse input files:")
inputData = parseData(inputFiles)
print("")
print("Preprocess data:")
preprocessData(inputData, OUTPUT_DIR)
print("Finish preprocessing.")
