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

rds_connection_string = "postgres:Felicidad!1@localhost:5432/Pet_Project"
engine = create_engine(f'postgresql://{rds_connection_string}')
app.config["SQLALCHEMY_DATABASE_URI"] = (f'postgresql://{rds_connection_string}')
db = SQLAlchemy(app)

# reflect existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine,reflect=True)

# save reference to the table
Animals = Base.classes.animals

# create our session from Python to the DB
session = Session(engine)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    # test_dict = dict(test)
    return render_template("index_valeria_pet.html")


@app.route("/names")
def names():
    """Return a list of sample names."""
    stmt = db.session.query(Animals).statement
    df = pd.read_sql_query(stmt,db.session.bind)

    return(jsonify(list(df['name'])))

@app.route("/metadata/<name>")
def metadata(name):
    """Return the data for a given cat breed."""

    sel = [
        Animals.name,
        Animals.animal_type,
        Animals.imperial_weight,
        Animals.temperament,
        Animals.origin,
        Animals.life_span
    ]

    results = db.session.query(*sel).filter(Animals.name == name).all()

    # create dictionary for each row of metadata
    metadata = {}
    for result in results:
        metadata["Name"] = result[0]
        metadata["Type"] = result[1]
        metadata["Weight"] = result[2]
        metadata["Temperament"] = result[3]
        metadata["Origin"] = result[4]
        metadata["Life Span"] = result[5]
    
    print(metadata)
    return jsonify(metadata)

# @app.route("/charts")
# def charts():
#     name = db.session.query(Cats.name).all()
#     lat = db.session.query(Cats.lat).all()
#     long = db.session.query(Cats.long).all()

#     weight_query = "select (cast(SPLIT_PART (imperial_weight, '-',1 )as integer) + \
#         cast(SPLIT_part(imperial_weight, '-',2 )as integer ))/2 as avgWeight from cats"
#     results = db.session.execute(weight_query)
#     weight = [list(row) for row in results]

#     life_query = "select (cast(SPLIT_PART (life_span, '-',1 )as integer) + \
#         cast(SPLIT_part(life_span, '-',2 )as integer ))/2 as avgLife from cats"
#     life_results = db.session.execute(life_query)
#     life_span = [list(row) for row in life_results]

#     return jsonify(name, weight, life_span, lat, long)


if __name__ == "__main__":
    app.run()
