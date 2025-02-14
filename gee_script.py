import ee

# Initialize Earth Engine
ee.Initialize()

# Define an area of interest (Los Angeles)
aoi = ee.Geometry.Rectangle([-118.75, 33.5, -117.75, 34.5])

# Load a Sentinel-2 image and filter by date
image = ee.ImageCollection("COPERNICUS/S2") \
    .filterBounds(aoi) \
    .filterDate("2024-01-01", "2024-02-01") \
    .median()

# Compute NDVI (Normalized Difference Vegetation Index)
ndvi = image.normalizedDifference(["B8", "B4"])

# Print NDVI metadata
print(ndvi.getInfo())