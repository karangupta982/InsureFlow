const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();


const mongoDbUrl = process.env.MONGODB_URL;


app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
    
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