
const express = require('express');
const router = module.exports = express.Router();

const tools = require('../../tools/exporter');

// handles interactive message responses / submissions
router.post('/', (req, res) => {
    
        const payload = JSON.parse(req.body.payload);
    
        if(tools.verify.slash(payload.token)){
            let output = tools.interactive.process(payload);
    
            if(output instanceof Promise) output
                .then( response => {
                    if(typeof response === 'string') res.end(response);
                    else res.json(response);
                })
                .catch(error => res.end(error));
    
            else res.json(output);
        }
    
        else res.end('invalid Slack token');
    
    });