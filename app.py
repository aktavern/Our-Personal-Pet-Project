import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

rds_connection_string = "postgres:Felicidad!1@localhost:5432/animals"
engine = create_engine(f'postgresql://{rds_connection_string}')
app.config["SQLALCHEMY_DATABASE_URI"] = (f'postgresql://{rds_connection_string}')
db = SQLAlchemy(app)

# reflect existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine,reflect=True)

# save reference to the table
Cats = Base.classes.cats

# create our session from Python to the DB
session = Session(engine)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    # test_dict = dict(test)
    return render_template("index.html")

@app.route("/names")
def names():
    """Return a list of sample names."""
    stmt = db.session.query(Cats).statement
    df = pd.read_sql_query(stmt,db.session.bind)

    return(jsonify(list(df['name'])))

@app.route("/characteristics")
def characteristics():
    """return a list of characteristics."""
    characteristics = session.query(Cats.name, 
    Cats.imperial,
    Cats.affection_level, 
    Cats.temperament, 
    Cats.origin,
    Cats.life_span,
    Cats.adaptability,
    Cats.child_friendly,
    Cats.dog_friendly,
    Cats.energy_level,
    Cats.grooming,
    Cats.health_issues,
    Cats.intelligence,
    Cats.shedding_level,
    Cats.social_needs,
    Cats.stranger_friendly,
    Cats.vocalisation,
    Cats.lat,
    Cats.long
    ).all()


    results = session.query(Cats.child_friendly, Cats.health_issues).all()
    
    child = [result[0] for result in results]
    health = [result[1] for result in results]

    trace = {
        "x":health,
        "y": child,
        "type":"bar"
    }

    return jsonify(characteristics)

@app.route("/metadata/<name>")
def cat_metadata(name):
    """Return the data for a given cat breed."""

    sel = [
        Cats.name,
        Cats.imperial,
        Cats.affection_level,
        Cats.temperament,
        Cats.origin,
        Cats.description,
        Cats.life_span,
        Cats.adaptability,
        Cats.child_friendly,
        Cats.dog_friendly,
        Cats.energy_level,
        Cats.grooming,
        Cats.health_issues,
        Cats.intelligence,
        Cats.shedding_level,
        Cats.social_needs,
        Cats.stranger_friendly,
        Cats.vocalisation,
        Cats.lat,
        Cats.long
    ]

    results = db.session.query(*sel).filter(Cats.name == name).all()

    # create dictionary for each row of metadata
    cat_metadata = {}
    for result in results:
        cat_metadata["name"] = result[0]
        cat_metadata["imperial_weight"] = result[1]
        cat_metadata["affection_level"] = result[2]
        cat_metadata["temperament"] = result[3]
        cat_metadata["origin"] = result[4]
        cat_metadata["description"] = result[5]
        cat_metadata["life_span"] = result[6]
        cat_metadata["adaptability"] = result[7]
        cat_metadata["child_friendly"] = result[8]
        cat_metadata["dog_friendly"] = result[9]
        cat_metadata["energy_level"] = result[10]
        cat_metadata["grooming"] = result[11]
        cat_metadata["health_issues"] = result[12]
        cat_metadata["intelligence"] = result[13]
        cat_metadata["shedding_level"] = result[14]
        cat_metadata["social_needs"] = result[15]
        cat_metadata["stranger_friendly"] = result[16]
        cat_metadata["vocalisation"] = result[17]
        cat_metadata["lat"] = result[18]
        cat_metadata["long"] = result[19]
    
    print(cat_metadata)
    return jsonify(cat_metadata)

if __name__ == "__main__":
    app.run()
