// // backend/src/app.js
// const express = require('express');
// const cors = require('cors');
// const { spawn } = require('child_process');
// const path = require('path');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Route to handle predictions
// app.post('/predict', async (req, res) => {
//   try {
//     const inputData = req.body;
    
//     // Convert input data to match your Python script's format
//     const pythonInputData = {
//       Gender: parseInt(inputData.Gender),
//       Age: parseInt(inputData.Age),
//       Driving_License: parseInt(inputData.Driving_License),
//       Region_Code: parseFloat(inputData.Region_Code),
//       Previously_Insured: parseInt(inputData.Previously_Insured),
//       Annual_Premium: parseFloat(inputData.Annual_Premium),
//       Policy_Sales_Channel: parseFloat(inputData.Policy_Sales_Channel),
//       Vintage: parseInt(inputData.Vintage),
//       Vehicle_Age_lt_1_Year: parseInt(inputData.Vehicle_Age_lt_1_Year),
//       Vehicle_Age_gt_2_Years: parseInt(inputData.Vehicle_Age_gt_2_Years),
//       Vehicle_Damage_Yes: parseInt(inputData.Vehicle_Damage_Yes)
//     };

//     // Spawn Python process
//     const pythonProcess = spawn('python', [
//       path.join(__dirname, '../../ml_service/predict.py'),
//       JSON.stringify(pythonInputData)
      
//     ]);

//     let result = '';
//     console.log("path in which data is being sent to ml script: ",path.join(__dirname, '../../ml_service/predict.py'))

//     pythonProcess.stdout.on('data', (data) => {
//       result += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       console.error(`Error: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         return res.status(500).json({ error: 'Prediction failed' });
//       }
      
//       const prediction = parseInt(result.trim());
//       const status = prediction === 1 ? 'Response-Yes' : 'Response-No';
      
//       res.json({ status });
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






















// INSUREFLOW/server.js
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();


const mongoDbUrl = process.env.MONGODB_URL;


app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
    // Log the current directory and script path
    const currentDir = __dirname;
    const scriptPath = path.join(currentDir, 'predict.py');
    console.log('Current directory:', currentDir);
    console.log('Python script path:', scriptPath);
    
    try {
        const pythonProcess = spawn('python', [
            scriptPath,
            JSON.stringify(req.body)
        ]);

        let result = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            console.log('Python output:', data.toString());
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error('Python error:', data.toString());
            error += data.toString();
        });

        pythonProcess.on('close', (code) => {
            console.log('Python process exited with code:', code);
            
            if (code !== 0) {
                return res.status(500).json({ 
                    error: 'Prediction failed', 
                    details: error 
                });
            }

            try {
                const predictionResult = JSON.parse(result);
                console.log("prediction result in server.js:", predictionResult)
                if (predictionResult.error) {
                    return res.status(500).json({ error: predictionResult.error });
                }
                
                const status = predictionResult.prediction === 1 ? 'Response-Yes' : 'Response-No';
                res.json({ status });
            } catch (e) {
                console.error('Error parsing prediction result:', e);
                res.status(500).json({ error: 'Failed to parse prediction result' });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});