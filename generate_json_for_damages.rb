require 'csv'
require 'json'

json_data = { 
  data: CSV.open("data/damage_data.csv", :headers => true).map { |line| 
    hash = line.to_h
    new_hash = {}
    hash.each do |key,value| 
      new_key = key.delete("^a-zA-Z0-9")
      hash.delete(key)
      new_hash[new_key] = value
    end
    new_hash
  }
}

File.open("data/damage_data.json",'w') { |file| file.write(json_data.to_json)}