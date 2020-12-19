# import necessary libraries
import os
import numpy as np
import psycopg2

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for)

from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# postgres:postgres://avsrkdqtegxzjr:83afd61ef5b5b621120d83a053790a28f83ee6d60be17f55c4b19410737f0771@ec2-52-22-238-188.compute-1.amazonaws.com:5432/dcve1h312v0e62
try:
    db_uri = os.environ['DATABASE_URL']
except KeyError:
    db_uri = "postgres://avsrkdqtegxzjr:83afd61ef5b5b621120d83a053790a28f83ee6d60be17f55c4b19410737f0771@ec2-52-22-238-188.compute-1.amazonaws.com:5432/dcve1h312v0e62"

print(db_uri)
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

db = SQLAlchemy(app)

# create class to frame each drug instance:

class Drug(db.Model):
    __tablename__ = 'drug_data'

    state = db.Column(db.String(64))
    year = db.Column(db.String(64))
    month = db.Column(db.String(64))
    drug_name = db.Column(db.String(64))
    death_count = db.Column(db.Float)
    id = db.Column(db.Integer, primary_key=True)

    # def  __repr__(self):
    #     return '<Drugs %r>' % (self.state)

#################################################
# Flask Routes
#################################################
@app.route("/routes")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/state<br/>"
        f"/api/v1.0/year<br/>"
        f"/api/v1.0/month<br/>"
        f"/api/v1.0/drug_name<br/>"
        f"/api/v1.0/death_count<br/>"
        f"/api/v1.0/alldrugs<br/>")
#################################################
# Rendering the Template
#################################################
@app.route("/")     
def enter_data(): 
    return render_template("index.html")

#################################################
# State Route
#################################################
@app.route("/api/v1.0/state")

def state():
    # Open a communication session with the database
    states_query= db.session.query(Drug.state).all()
    all_states=list(np.ravel(states_query))
    return jsonify(all_states)

#################################################
# Year Route
#################################################
@app.route("/api/v1.0/year")

def year():
    years_query= db.session.query(Drug.year).all()
    
    all_years=list(map(str,list(np.ravel(years_query))))
    return jsonify(all_years)
    

#################################################
# Month Route
#################################################
@app.route("/api/v1.0/month")

def month():
    months_query= db.session.query(Drug.month).all()
    all_months=list(np.ravel(months_query))
    return jsonify(all_months)
    
#################################################
# drug_name Route
#################################################
@app.route("/api/v1.0/drug_name")

def drugname():

    drugname_query= db.session.query(Drug.drug_name).all()
    
    all_names=list(np.ravel(drugname_query))
    return jsonify(all_names)
    
#################################################
# death_count Route
#################################################
@app.route("/api/v1.0/death_count")

def deathcount():

    deathcount_query= db.session.query(Drug.death_count).all()
    deathcount=list(np.ravel(deathcount_query))
    return jsonify(deathcount)

#################################################
# Drug Study Data Combined
#################################################
@app.route("/api/v1.0/alldrugs")

def drugall():

    #results = db.session.query(Drug.state, Drug.year, Drug.month, Drug.drug_name, Drug.death_count).all()
    # results=list(np.ravel(results))
    results = db.session.query(Drug).all()
    

    # state = [result[0] for result in results]
    # year = [result[1] for result in results]
    # month = [result[2] for result in results]
    # drug_name = [result[3] for result in results]
    # death_count = [result[4] for result in results]

    dataReturn=[]
    for data in results:
        drugDict={
            "state": data.state,
            "year": str(data.year),
            "month": data.month,
            "drug_name": data.drug_name,
            "death_count": data.death_count
            
        }

    # drug_data = [{
    #     "state": state,
    #     "year": year,
    #     "month": month,
    #     "drug_name": drug_name,
    #     "death_count": death_count               
    # }]
        dataReturn.append(drugDict)
    return jsonify(dataReturn)


if __name__ == "__main__":
    app.run(debug=True)
