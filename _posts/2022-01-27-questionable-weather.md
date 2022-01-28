---
layout: post
title: "Questionable Weather"
date: 2022-01-27 21:00:36 +0200
---

Questionable Weather is a Generative Artwork released on fx(hash). Here I want to tell the story of how it came about and give options for printing the work in different formats.

# The Story

# Printing

<center>
    <div class="slidecontainer">
        Enter Transaction hash 
        <br>
        <input type="texrt" class="slider" id='transactionHash' value='oo7cUtkQpLg35HHnnSc99mkZ1r6ok2hZesPWX844SDSNEY7pawz'>
        <br> 
        or get a <button text='Random' id='randomHash'>Random Hash</button>
    </div>
    <div class="slidecontainer">
        Width: <input type="number" min="1" max="400" value="400" class="slider" id="width">
    </div>
    <div class="slidecontainer">
        Height: <input type="number" min="1" max="400" value="400" class="slider" id="height">
    </div>
    <br>
    <button text='Random' id='generate'>Generate</button>
</center>

<br>

<div id="questionableWeather" class="sketchContainer">

<link rel="stylesheet" href="/css/questionable-weather.css">
<script type='text/javascript'  src='/js/questionable-weather/p5.min.js'></script>
<script type='text/javascript'  src='/js/questionable-weather/script.js'></script>