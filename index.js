#!/usr/bin/env node

const fs          = require('fs');
const readline    = require('readline');
const {google}    = require('googleapis');
const OAuth2      = google.auth.OAuth2;
const TOKEN_DIR   = 'storage/credentials/';
// const TOKEN_PATH  = TOKEN_DIR + 'youtube-nodejs.json';
const argv        = require('yargs').argv;
const Youtube     = require('./src/youtube');


(function (args) {
    //check if the path to the token path was given
    if (args.client_secret){
        process.env.CLIENT_SECRET      = args.client_secret;
    }else{
        throw new Error('Path to Client Secret is required');
    }
    //Check if scopes where set
    if (args.scopes){
        process.env.YOUTUBE_SCOPE   = args.scopes;

    }else{
        throw new Error('No Scope was set');
    }
    //Check if the path of the token storage was given
    if (args.token_path){
        process.env.TOKEN_PATH = args.token_path;
    }else{
        console.log('Default path of token would be used');
    }
    if (args.token_file){
        process.env.TOKEN_FILE = args.token_file;
    }else{
        console.log('Default file name would be used');
    }
    //Launch Youtube login
    new Youtube();

})(argv);

