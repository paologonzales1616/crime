import os

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_restful import reqparse, Api, Resource

import classifier

app = Flask(__name__, static_folder='build')
app.config['SECRET_KEY'] = 'supersecretkey'
api = Api(app)
CORS(app)

parser = reqparse.RequestParser()
parser.add_argument('month')
parser.add_argument('startDay')
parser.add_argument('endDay')
parser.add_argument('hour')
parser.add_argument('crime')
parser.add_argument('location')
parser.add_argument('day')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

@app.route('/dataset')
def dataset():
    return send_from_directory('dataset', 'crime_dataset.csv')


@app.route('/locationIds')
def location_ids():
    return jsonify(classifier.location_ids())


@app.route('/crimeIds')
def crime_ids():
    return jsonify(classifier.crime_ids())

class UpdateDataset(Resource):
    def post(self):
        args = parser.parse_args()
        classifier.update_dataset(
            int(args['month']), 
            int(args['day']), 
            int(args['hour']), 
            int(args['location']),
            int(args['crime']))
        return 'SUCCESS', 200

# noinspection PyMethodMayBeStatic
class CrimeClassifier(Resource):
    def post(self):
        args = parser.parse_args()
        temp_array = []

        start_day = int(args['startDay'])
        end_day = int(args['endDay'])

        if end_day == -1:
            end_day = start_day + 1

        temp_result = classifier.crime_interval_classify(
           int(args['month']),
           int(start_day),        
           int(end_day),
           int(args['hour']),
           int(args['location']))
        for key, value in temp_result.items():
            temp_array.append({"crime": key, "value": value})
        return temp_array


# noinspection PyMethodMayBeStatic
class LocationClassifier(Resource):
    def post(self):
        args=parser.parse_args()
        temp_array=[]

        start_day = int(args['startDay'])
        end_day = int(args['endDay'])

        if end_day == -1:
            end_day = start_day + 1

        temp_result = classifier.location_interval_classify(
           int(args['month']),
           int(start_day),        
           int(end_day),
           int(args['hour']),
           int(args['crime']))
        for key, value in temp_result.items():
            temp_array.append({"brgy": key, "value": value})
        return temp_array


api.add_resource(CrimeClassifier, '/crime')
api.add_resource(LocationClassifier, '/location')
api.add_resource(UpdateDataset, '/update')


if __name__ == '__main__':
    app.run()
