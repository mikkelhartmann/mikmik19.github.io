---
layout: post
title: "Coupled Oscillators"
date: 2018-05-10 12:34:36 +0200
---

I decided that I wanted to start reproducing the results of some of the papers I'm reading. This first one was mentioned in Steven H. Strogatz' book _Sync: The Emerging Science of Spontaneous Order_ and is about a collection coupled oscillators.

{:toc}

# Background

After having read Steven H. Strogatz' book _Sync: The Emerging Science of Spontaneous Order_ my interest in spontaneous synchronization was sparked. The book is about how order in the time-dimension (synchronization) can arise in systems ranging from electrical circuits to fire-flies. One of the examples in the book of the synchronization (or lack thereof) is the heart and the dangerous arrhythmia that can come out of nowhere. This example got me interested because I'm currently analyzing electrocardiograms at work, where I look for signs of arrhythmia.

In this post I reproduce some the results reported by Steven H. Strogatz and Renato E. Mirollo in 1991. The paper is quite long and consists mainly in the mathematical analysis of a system of differential equations known as the Kuramoto model. The model is quite simple and very far removed the a human heart, but it is an example of how syncrhonization can arise even in a system where the interests of each sub-part is not aligned to the whole.

The Kuramoto model consists of a collection of oscillators. Each oscillator has a natural frequency that it will oscillate with, if left alone. Each oscillator is connected to every other oscillator such that two oscillators will influence each other depending on the distance between them. Furthermore the strength of this connecting is the same for the entire system, and is called the coupling constant. The mathematical formulation of this is a system of differential equations like this:

$$\dot\theta_i = \omega_i + \frac{K}{N} \sum\limits_{j=1}^{N} \sin \left( \theta_j - \theta_i \right)$$

Here $$\theta_i$$ is the phase of the _ith_ oscillator, $$\omega_i$$ is its natural frequency, and $$K \geq 0$$ is the coupling strength. If $$K$$ was set to 0 all the oscillators would just run at their natural frequency. If $$K \geq 0$$ then the _ith_ oscillator will be pulled away from its natural frequency by each other oscillator in poportion to the _sine_ of the difference in their phases -- some will make it run faster than $$\omega_i$$ other slower. So what do you think will happen if we set $$K=1$$? Do you think that the system will synchronize so the oscillators start to all oscillate close to the same frequency?

The statement I want to reproduce is the following:

> The system (1.1) was studied for the case of N=480 oscillators, with
> coupling strength $$K=1$$. The frequencies were uniformly distributed on $$[-\gamma, \gamma]$$, where $$\gamma=0.2$$. There was no noise, i.e., $$D=0$$. The goal was to simulate the evolution of the system starting near the incoherent solution. For these parameters, equation (3.15b) predicts that the coherence $$r(t)$$ should initially grow exponentially at a rate $$\alpha \approx 0.47304$$.

This quote says that they simulated the dynamical system described above with 480 oscillators, $$K=1$$ and a uniform distribution of the natural frequencies between $$-0.2$$ and $$0.2$$ -- so the oscillators don't even agree on the direction in which they oscillate. In what follows I will do the same, but I will make some additional figures and simulations to make sense of the results.

# Visualizing and characterizing the evolution of the system

Before we jump directly to the question of synchronization, lets think about how we can visualize the evolution of the system. In the book Stogatz asks the reader to think of each oscillator as a runner on a track. If synchronization arises, this would mean that the runners end up running around the track bundled up in a group. Let's create this visualization: The phase of each oscillator will be converted to (x,y) points on a circle and we will look at how the 480 points move as time unfolds.

<center>
    <button id="startSimulation">Start</button>
    <button id="stopSimulation">Stop</button>
    <div/>
    <svg id="pointsOnCircle" width="300" height="300"/>
</center>

This is a nice way to watch the system evolve, and we can see quite clearly that synchronization arises, neat! But it would be nice to quantize the evolution of the system a bit more. We can look at how the phase changes for each oscillator, we can see that initially the oscillators occupy phases between 0 and $$2\pi$$ -- they are spread across the circle. As time unfolds all the oscillators emd up close to 0 and slowly increase their phase in unison.

<center>
    <div class="slidecontainer">
    <input type="range" min="1" max="400" value="200" class="slider" id="oscSlider">
    <br>
    Looking at oscillator number <span id="oscSliderCounter">200</span>
    </div>
    <div id="angleVsTime"/>
</center>

This collapses the entire evolution of the system into a single plot of $$\theta$$ vs. time, but we are still looking at an overwhelming 480 curves. Since we are interested in the system as a whole, can look at how the variance all the phases change with time -- when the variance of the phases is low, it means that they are all close together. We now have a number that represents the _synchronization_ level reached by the system. This also allow us to set a condition for synchronization: The system must reach a phase variance below $$0.1$$.

<center>
    <div id="varThetaVsTime"/>
</center>

We are also interested in how _fast_ the system gets synchronized. So ill define the _synchronization time_ as the timestep when the normalized variance have reach half of it's initial value.

<center>
    <div id="normVarThetaVsTime"/>
</center>

Now we have the tools to analyse the system. Let's see what happens to the system as we change the coupling strength.

# Trying different coupling strengths

Above I showed how we can characterize the level of synchronization that is reached as well as the speed at which it is reached. So lets run the simulation for different values of $$K$$ and look at how this influence the synchronization level and synchronization time.

<center>
    <div>
        The value of K is <span id="kSliderCounter">0.1</span>
        <br/>
        <input type="range" min="0" max="5" value="0" class="slider" id="kSlider">
    </div>
    <button id="kComparisonStartSimulation">Start</button>
    <button id="kComparisonStopSimulation">Stop</button>
    <div id="kComparison"/>
</center>

Because the preferred frequency of each oscillator uniformly distributed between -0.2 and 0.2 the oscillators often end up in a fairly stable stable situation where the phase does not change much over time.

If you preferred to look at the points as they run around the circle, then here you go:

So we are able to characterize the system for different coupling strengths. Now let's have some fun with it.

# What coupling strength leads to the highest synchronization?

Above we saw that coupling strength influence how synchronized the oscillators end up being -- too low or too and high no synchronization will take place. In between there seem to be a sweet spot, so is there an optimal value? To check ill run simulations for values of $$K$$ between 0 and 3 in steps of 0.01 and look at how the synchronization level and time changes. All the simulations were started with the same initial conditions, so only the coupling strengths were changed between each simulation.

<center>
    <div id="finalPhase"/>
</center>

<center>
    <div id="synchronizationTime"/>
</center>

Indeed it would appear that a coupling close to $$K\approx1.95$$ leads to the lowest variance in the final phase reached by the oscillators in the simulation. The synchronization time continues to drop even after the final phase has reached its minimum, but after $$K \approx 2.3$$ the system no longer synchronizes.

# Summary

We have seen that a collection of coupled oscillators set up with a uniform distribution of preferred oscillation frequencies can end up all oscillating with a frequency close to each other. I also showed that the evolution of the system can be characterized by two numbers -- the synchronization level and time -- and look at how these numbers are influence by the coupling strength.

<script type='text/javascript' src='/js/coupled-oscillators/points-on-circle.js'></script>
<script type='text/javascript' src='/js/coupled-oscillators/angle-vs-time.js'></script>
<script type='text/javascript' src='/js/coupled-oscillators/var-theta-vs-time.js'></script>
<script type='text/javascript' src='/js/coupled-oscillators/norm-var-theta-vs-time.js'></script>
<script type='text/javascript' src='/js/coupled-oscillators/k-comparison.js'></script>
<script type='text/javascript' src='/js/coupled-oscillators/final-phase.js'></script>
<script type='text/javascript' src='/js/coupled-oscillators/synchronization-time.js'></script>
