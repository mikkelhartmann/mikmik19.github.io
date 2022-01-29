---
layout: post
title: "Questionable Weather"
date: 2022-01-27 21:00:36 +0200
---

Questionable Weather is a Generative Artwork released on [fx(hash)](https://www.fxhash.xyz/generative/4779). This is a tool for generating the work in at different scale. The main usecase is to produce print-quality version of the items sold on fx(hash), but the tool can also be used to explore the work with greater control than fx(hash) allow.

## Transaction Hash
<center>
    <div class="slidecontainer">
        Enter Transaction hash 
        <br>
        <input type="texrt" class="slider" id='transactionHash' value='ooEnPQ63v4CkfpvJubdnkFqXEwhFsuJytuecbMJ9AtS7KRiNYR5'> and <button text='update' id='updateFeatures'>Update Features</button>
        <br> 
        or get a <button text='Random' id='randomHash'>Random Hash and Update Features</button>
    </div>
</center>

## Features

<center>
    <div class='gridLayout'>
        <div class="slidecontainer">
            <form action="#">
                <label for="palette">Palette</label>
                <select name="palette" id="palette">
                    <option value="Light">Light</option>
                    <option value="Brown">Brown</option>
                    <option value="Silver">Silver</option>
                    <option value="Purple">Purple</option>
                    <option value="Pinks">Pinks</option>
                    <option value="MintOrange">MintOrange</option>
                    <option value="Dusk">Dusk</option>
                    <option value="Reds">Reds</option>
                    <option value="Golden">Golden</option>
                    <option value="Dark Yellow">Dark Yellow</option>
                    <option value="Gem">Gem</option>
                    <option value="Dream">Dream</option>
                    <option value="Purple Haze">Purple Haze</option>
                    <option value="Pity">Pity</option>
                    <option value="Affection">Affection</option>
                    <option value="Hope">Hope</option>
                </select>
            </form>
        </div>
        <div class="slidecontainer">
            <form action="#">
                <label for="size">Size</label>
                <select name="size" id="size">
                    <option value="0.35">0.35</option>
                    <option value="0.25">0.25</option>
                    <option value="0.2">0.2</option>
                    <option value="0.15">0.15</option>
                </select>
            </form>
        </div>
        <div class="slidecontainer">
            <form action="#">
                <label for="weather">Weather</label>
                <select name="weather" id="weather">
                    <option value="Tranquil">Tranquil</option>
                    <option value="Mild">Mild</option>
                    <option value="Rough">Rough</option>
                    <option value="Stormy">Stormy</option>
                    <option value="Wild">Wild</option>
                    <option value="Questionable">Questionable</option>
                </select>
            </form>
        </div>
        <div class="slidecontainer">
            <form action="#">
                <label for="inverted">Invert Color?</label>
                <select name="Inverted" id="inverted">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </form>
        </div>
    </div>
</center>

The Size feature will sometimes be empty. This is a bug in the original code, so I left I here as well.

## Image Scale
<div class='gridLayout'>
    <div class="slidecontainer">
        Width : <input type="number" min="1" max="400" value="400" class="slider" id="width">
    </div>
    <div class="slidecontainer">
        Height: <input type="number" min="1" max="400" value="400" class="slider" id="height">
    </div>
</div>

## Generate The image
<center>
    <button text='Random' id='generate'>Generate</button>
</center>

## Output

<div id="questionableWeather" class="sketchContainer">

<link rel="stylesheet" href="/css/questionable-weather.css">
<script type='text/javascript'  src='/js/questionable-weather/p5.min.js'></script>
<script type='text/javascript'  src='/js/questionable-weather/script.js'></script>