import sys
import json
import os
from src.pipline.prediction_pipeline import VehicleData, VehicleDataClassifier
from src.logger import logging
from src.entity.config_entity import VehiclePredictorConfig



vehicle_prediction_config = VehiclePredictorConfig()

def predict_from_json(json_string):
    try:
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        logging.info(f"Current directory: {current_dir}")
        logging.info(f"Pipeline path: {os.path.join(current_dir, 'src', 'pipline', 'prediction_pipeline.py')}")
        
       
        input_data = json.loads(json_string)
        logging.info(f"Received input data: {input_data}")

        
        processed_input = {
            "Gender": int(input_data['Gender']),
            "Age": int(input_data['Age']),
            "Driving_License": int(input_data['Driving_License']),
            "Region_Code": float(input_data['Region_Code']),
            "Previously_Insured": int(input_data['Previously_Insured']),
            "Annual_Premium": float(input_data['Annual_Premium']),
            "Policy_Sales_Channel": float(input_data['Policy_Sales_Channel']),
            "Vintage": int(input_data['Vintage']),
            "Vehicle_Age_lt_1_Year": int(input_data['Vehicle_Age_lt_1_Year']),
            "Vehicle_Age_gt_2_Years": int(input_data['Vehicle_Age_gt_2_Years']),
            "Vehicle_Damage_Yes": int(input_data['Vehicle_Damage_Yes'])
        }
        logging.info(f"Processed input: {processed_input}")

        
        vehicle_data = VehicleData(**processed_input)
        
        
        df = vehicle_data.get_vehicle_input_data_frame()
        logging.info(f"Created DataFrame: {df}")
        
        # Initialize classifier and predict
        # classifier = VehicleDataClassifier()
        # prediction = classifier.predict(df)
        model_predictor = VehicleDataClassifier(prediction_pipeline_config = vehicle_prediction_config)
        prediction = model_predictor.predict(dataframe=df)
        logging.info(f"Prediction result: {prediction}")
        
        
        result = {"prediction": int(prediction[0])}
        print(json.dumps(result))
        
        
    except Exception as e:
        logging.error(f"Error in prediction: {str(e)}")
        error_result = {"error": str(e)}
        print(json.dumps(error_result))
        sys.exit(1)

if __name__ == "__main__":
    try:
        input_json = sys.argv[1]
        logging.info(f"Script started with input: {input_json}")
        predict_from_json(input_json)
    except Exception as e:
        logging.error(f"Script error: {str(e)}")
        print(json.dumps({"error": str(e)}))
        sys.exit(1)