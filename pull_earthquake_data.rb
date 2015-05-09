require 'json'
require 'net/http'
url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
response = Net::HTTP.get_response(URI.parse(url))
json_data = JSON.parse(response.body)

json_data["features"] = json_data["features"].select {|feature| feature["properties"]["place"].downcase.include? "nepal"}

File.open("data/usgs_earthquake_data.json",'w') { |file| file.write(json_data.to_json)}