const express = require('express');
const router = express.Router();
const request = require('request');
const axios = require('axios');
require('dotenv').config()

router.get('/', (req, res) => {
    res.send('Server is runing')
    console.log('Server ok')
});

router.get('/crud-oil-price', async (req, res) => {

    try {
        let url = 'https://api.oilpriceapi.com/v1/prices/latest'
        const headers = {
            'Authorization': process.env.API_OILPRICEAPI,
            'Content-Type': 'application/json'
        }
        const resultCrudOil = await axios.get(url, { headers })
        return res.send({ 
            success: true,
            currency: 'CRUD OIL in USD',
            price: resultCrudOil.data.data.price
        })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

router.get('/gold-price', async (req, res) => {

    request('https://query1.finance.yahoo.com/v7/finance/spark?symbols=GC%3DF&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance', function (error, response, body) {
        if (error) {
            return res.send({ success: false, info: error })
        }  

        const transformedRes = JSON.parse(body)
        const resCurrency = transformedRes.spark.result[0].response[0].meta.currency    
        
        if (resCurrency === 'USD') {
            const finalRequest = transformedRes.spark.result[0].response[0].meta.regularMarketPrice
            return res.send({ 
                success: true,
                currency: 'GOLD',
                price: finalRequest
            })
        }
        
        return res.send('it is not USD')
    });
    
});

router.get('/sp500-price', async (req, res) => {

    try {
    request('https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance', function (error, response, body) {
        if (error) {
            return res.send({ success: false, info: error })
        }  

        const transformedRes = JSON.parse(body)
        // console.info(' ====> ', transformedRes.chart.result[0].meta.regularMarketPrice)
        const resCurrency = transformedRes.chart.result[0].meta.currency
        
        if (resCurrency === 'USD') {
            const finalRequest = transformedRes.chart.result[0].meta.regularMarketPrice
            return res.send({ 
                success: true,
                currency: 'S&P 500',
                price: finalRequest
            })
        }
        
        return res.send('it is not USD')
    })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

router.get('/ftse-price', async (req, res) => {

    try {

        let url = 'https://query1.finance.yahoo.com/v8/finance/chart/%5EFTSE?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance'
        const result = await axios.get(url)
        return res.send({ 
            success: true,
            currency: 'FTSE100 in USD',
            price: result.data.chart.result[0].meta.regularMarketPrice
        })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

router.get('/nasdaq-price', async (req, res) => {

    try {

        let url = 'https://query1.finance.yahoo.com/v8/finance/chart/%5EIXIC?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance'
        const result = await axios.get(url)
        return res.send({ 
            success: true,
            currency: 'NASDAQ in USD',
            price: result.data.chart.result[0].meta.regularMarketPrice
        })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

router.get('/ibovespa-price', async (req, res) => {

    try {
        const requestStock = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance')
        const stockPrice = requestStock.data.chart.result[0].meta.regularMarketPrice

        const requestExchange = await axios.get(`https://api.exchangerate.host/latest?base=BRL&symbols=USD&amount=${stockPrice}`)
        const assetPriceToUSD = requestExchange.data.rates.USD

        return res.send({
            success: true,
            currency: 'IBOVESPA in USD',
            price: assetPriceToUSD
        })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

router.get('/stxe-price', async (req, res) => {

    try {
        const requestStock = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/%5ESTOXX50E?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance')
        const stockPrice = requestStock.data.chart.result[0].meta.regularMarketPrice

        const requestExchange = await axios.get(`https://api.exchangerate.host/latest?base=EUR&symbols=USD&amount=${stockPrice}`)
        const assetPriceToUSD = requestExchange.data.rates.USD

        return res.send({
            success: true,
            currency: 'STXE in USD',
            price: assetPriceToUSD
        })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

router.get('/hash11-price', async (req, res) => {

    try {
        const requestStock = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/META11.SA?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance')
        const stockPrice = requestStock.data.chart.result[0].meta.regularMarketPrice

        const requestExchange = await axios.get(`https://api.exchangerate.host/latest?base=BRL&symbols=USD&amount=${stockPrice}`)
        const assetPriceToUSD = requestExchange.data.rates.USD

        return res.send({
            success: true,
            currency: 'STXE in USD',
            price: assetPriceToUSD
        })

    } catch (error) {
        return res.send({ success: false, info: error })
    }
    
});

module.exports = router;