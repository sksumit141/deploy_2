const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["https://deploy-2-pi.vercel.app", "http://localhost:3000"],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.post('/screenshot', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    
    // Set a reasonable timeout
    await page.setDefaultNavigationTimeout(30000);
    
    // Navigate to the frontend URL
    await page.goto('https://deploy-2-pi.vercel.app', { 
      waitUntil: 'networkidle0' 
    });

    // Set viewport and wait for content
    await page.setViewport({ width: 1200, height: 800 });
    await page.waitForTimeout(2000); // Wait for any dynamic content

    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: true
    });

    await browser.close();

    res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"');
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Screenshot error:', error);
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
