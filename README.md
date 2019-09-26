# Out Personal Pet Project
The repo contains:
1. A Jupyter Notebook which accesses an open api, merges that data with existing data in a CSV, and used Pandas to push that data into a local Postgres database;
2. The SQL statements necessary to create tables in a Postgres data to load the data into;
3. A Flask app which access the Postgres database to pull data to be used as an API;
4. Plotly and Leaflet.js graphs created using that API. 

# Project Proposal/Outline
There are many factors that go into choosing a pet, including cost, personal life factors, and your own personal connection to the animal. However, as pet owners it is useful to also know the data behind the particular breed of pet you are choosing. In this project, we examine the characteristics of different breeds of cats, and present the findings on where each breed originates from, how their weight can impact their life span if at all, and which cats have the most favorable and least favorable characteristics. 

# Data Sources 
The cat data came from https://thecatapi.com/. Latitude and longitude data came from https://www.latlong.net/. 

# Data Cleanup & Analysis 
Within the Jupyter notebook, we needed to:
1. Split columns so that they were no longer dictionaries, as this created problems when trying to upload to Postgres;
2. Merge outside location data into our dataframe; 
3. Rename columns to be more clear; 
4. Select only relevant columns for this project. 

# How to Set Up

1. Create a Pet_Project database in your local Postgres and use the `etl/cat2_SQL_table_creation` file to create the columns necessary. 
2. Run the `etl/cats.ipynb` notebook to load our cleaned data to the cats table in the Pet_Project database. 
3. Update credentials in `app.py` for your local Postgres database.
4. Within Anaconda Prompt, run app.py.
5. Find the puuurrrfect pet!
