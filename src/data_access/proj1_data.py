import sys
import pandas as pd
import numpy as np
from typing import Optional

from src.configuration.mongo_db_connection import MongoDBClient
from src.constants import DATABASE_NAME
from src.exception import MyException

class Proj1Data:
    """
    A class to export MongoDB records as a pandas DataFrame.
    """

    def __init__(self) -> None:
        """
        Initializes the MongoDB client connection.
        """
        try:
            self.mongo_client = MongoDBClient(database_name=DATABASE_NAME)
        except Exception as e:
            raise MyException(e, sys)

    def export_collection_as_dataframe(self, collection_name: str, database_name: Optional[str] = None) -> pd.DataFrame:
        """
        Exports an entire MongoDB collection as a pandas DataFrame.

        Parameters:
        ----------
        collection_name : str
            The name of the MongoDB collection to export.
        database_name : Optional[str]
            Name of the database (optional). Defaults to DATABASE_NAME.

        Returns:
        -------
        pd.DataFrame
            DataFrame containing the collection data, with '_id' column removed and 'na' values replaced with NaN.
        """
        try:
            # Access specified collection from the default or specified database
            if database_name is None:
                collection = self.mongo_client.database[collection_name]
            else:
                collection = self.mongo_client[database_name][collection_name]

            # Convert collection data to DataFrame and preprocess
            print("Fetching data from mongoDB")
            df = pd.DataFrame(list(collection.find()))
            print(f"Data fecthed with len: {len(df)}")
            if "id" in df.columns.to_list():
                df = df.drop(columns=["id"], axis=1)
            df.replace({"na":np.nan},inplace=True)
            return df

        except Exception as e:
            raise MyException(e, sys)
        




# Suppose you have a MongoDB collection named users with the following documents:
# [
#     {"_id": 1, "name": "Alice", "age": 30},
#     {"_id": 2, "name": "Bob", "age": 25},
#     {"_id": 3, "name": "Charlie", "age": 35}
# ]

# When you execute list(collection.find()), it will return:
# [
#     {"_id": 1, "name": "Alice", "age": 30},
#     {"_id": 2, "name": "Bob", "age": 25},
#     {"_id": 3, "name": "Charlie", "age": 35}
# ]



#    _id     name  age
# 0    1    Alice   30
# 1    2      Bob   25
# 2    3  Charlie   35




# collection.find()
# Type: This returns a cursor object.
# Behavior: A cursor is an iterable object that lazily fetches documents from the database as you iterate over it. This means it doesn't load all documents into memory at once, which can be more efficient for large datasets.


# list(collection.find())
# Type: This converts the cursor into a list of documents.
# Behavior: By converting the cursor to a list, all documents are fetched from the database and stored in memory at once. This can be useful for smaller datasets where you want to work with all documents immediately, but it can be inefficient for very large datasets due to memory constraints.

# The conversion to a list is necessary because pd.DataFrame() expects a list-like object (such as a list of dictionaries) to construct the DataFrame. The cursor itself is not directly compatible with pd.DataFrame(), hence the need to convert it to a list first.