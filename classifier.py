import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn import preprocessing

# Read dataset (from csv file)
crime_df = pd.read_csv('dataset/crime_dataset.csv')
loc_df = pd.read_csv('dataset/loc_dataset.csv')

# Parse columns with datatypes
crime_df['crime'] = crime_df['crime'].astype('category')
loc_df['crime'] = loc_df['crime'].astype('category')
crime_df['location'] = crime_df['location'].astype('category')
loc_df['location'] = loc_df['location'].astype('category')

crime_names = crime_df['crime'].unique()
location_names = crime_df['location'].unique()

# Convert to numerical values
location_enc = preprocessing.LabelEncoder()
location_enc.fit(location_names)

print(crime_names)
print(location_names)

print()

crime_enc = preprocessing.LabelEncoder()
crime_enc.fit(crime_names)

crime_df['location'] = location_enc.transform(crime_df['location'])
crime_df['crime'] = crime_enc.transform(crime_df['crime'])
loc_df['location'] = location_enc.transform(loc_df['location'])
loc_df['crime'] = crime_enc.transform(loc_df['crime'])

# Extract X, y from dataframe
X_crime, y_crime = crime_df.iloc[:, :-1], crime_df.iloc[:, -1]
X_loc, y_loc = loc_df.iloc[:, :-1], loc_df.iloc[:, -1]

# Create the classifiers
crime_clf = LogisticRegression(solver='sag',
                               multi_class='ovr',
                               max_iter=4192)
loc_clf = LogisticRegression(solver='sag',
                             multi_class='ovr',
                             max_iter=4192)

# Train clf with training set
crime_clf.fit(X_crime, y_crime)
loc_clf.fit(X_loc, y_loc)


def crime_classify(month, day, hour, location):
    probabilities = crime_clf.predict_proba([[month, day, hour, location]])[0]

    results = {}

    for index, prob in enumerate(probabilities):
        results[crime_enc.inverse_transform([index])[0]] = float(prob) * 100

    return results


def location_classify(month, day, hour, crime):
    probabilities = loc_clf.predict_proba([[month, day, hour, crime]])[0]

    results = {}

    for index, prob in enumerate(probabilities):
        results[location_enc.inverse_transform([index])[0]] = float(prob) * 100

    return results


def crime_interval_classify(month, start_day, end_day, hour, location):
    raw_results = {}

    for day in range(start_day, end_day):

        probabilities = crime_clf.predict_proba([[month, day, hour, location]])[0]

        # Save all probabilities of each crime in raw_results
        for index, prob in enumerate(probabilities):

            key = crime_enc.inverse_transform([index])[0]
            print(key)

            if key in raw_results:
                raw_results[key].append(float(prob) * 100)
            else:
                raw_results[key] = [float(prob) * 100]

    final_results = {}

    # Average all
    for key, value in raw_results.items():
        final_results[key] = sum(value) / len(value)

    return final_results


def location_interval_classify(month, start_day, end_day, hour, crime):
    raw_results = {}

    for day in range(start_day, end_day):

        probabilities = loc_clf.predict_proba([[month, day, hour, crime]])[0]

        # Save all probabilities of each crime in raw_results
        for index, prob in enumerate(probabilities):

            key = location_enc.inverse_transform([index])[0]
            print(key)

            if key in raw_results:
                raw_results[key].append(float(prob) * 100)
            else:
                raw_results[key] = [float(prob) * 100]

    final_results = {}

    # Average all
    for key, value in raw_results.items():
        final_results[key] = sum(value) / len(value)

    return final_results


def update_dataset(month, day, hour, location, crime):

    location = location_enc.inverse_transform([location])[0]
    crime = crime_enc.inverse_transform([crime])[0]

    with open("dataset/crime_dataset.csv", "a+") as f:
        f.write("\n%d,%d,%d,%s,%s" % (month, day, hour, location, crime))

    with open("dataset/loc_dataset.csv", "a+") as f:
        f.write("\n%d,%d,%d,%s,%s" % (month, day, hour, crime, location))


def location_ids():
    results = []

    for loc in location_names:
        temp = {'id': int(location_enc.transform([loc])[0]), 'location': loc}
        results.append(temp)

    return results


def crime_ids():
    results = []

    for crime in crime_names:
        temp = {"id": int(crime_enc.transform([crime])[0]), "crime": crime}
        results.append(temp)

    return results


if __name__ == "__main__":
    print(crime_interval_classify(month=12, start_day=5, end_day=12, hour=22, location=0))
