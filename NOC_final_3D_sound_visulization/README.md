# NOC-FINA----3D-Sound-Visualization
Fall 2017

=====CONCEPT=====
For my final project, I want to extend my midterm sound visualization and make it in 3D. Basically, the particles will move according to the amplitude of the sound. Besides, the size of the shapes will also grow or shrink accordingly.

=====HOW I BUILT IT=====
1. Wavesurfer.js: this is a javscript library which can give you the amplitude information and store it in an array. I didn;t choose to use p5.sound library because I want to keep the feature that the user can choose any sound file they have in their computer.
3D noise flow field: the flow field exists on the background as well as the surface of the super shapes. This time, instead of using “var amp = up-down;”, I used “sqrt(up**2 + down**2)” instead to make the whole visual more organic and dynamic. However, I noticed that ** can’t be recognized by p5 desktop editor while it can works well in atom and the web editor.

2. Four super shapes: firstly there are four different supershapes which are spherical(), spherical2(), donut() and donut2(). The detailed code is as shown below. Professor Moon suggested me to use UV texture. However, as the beginning I didn’t really understand what is UV texture. Then I found the formula to convert 2D coordinates to 3D online and write this function. Basically, what you need to do is just to create vectors in 2D and pass it to this function which can return teh x,y,z coordinates based on the formula.

3. Blendpoint(): this is a function which can make multiple shapes transform naturally. It can gradually push the 3D coordinates in one array into another array, or say another shape. I used it to make spherical, spherical 2 and donut2 change naturally. And the donut shape is a independent one which the user can choose to add or not.

4. More supershapes!: This is inspired by Paul Bourke‘s super formula which you can find here. I used the amplitude of the sound to dmanipulate the “m” value which represents how many sides the shape has. For instance, when m = 0, the whole shape is just a sphere.

5. Something else: The shine() function I have is just change the brightness of the HSB value and the size of the box according to the amplitude of the sound. The three small super shapes which appear far away are actually look like this although they are very flat in my sketch. Instead of having solid shapes, I used particles because I want the whole style of my project to be coherent and also because drawing vertexs are really slow.

6. Besides, I used dat.gui to add contorls to the canvas so the user can decide to which shapes should appear on the screen and which should not.

======Lessons learned=====
Don’t be afraid of 3D things! I used to think that 3D is so hard that I don’t dare to try because I don’t want to fail. However, the truth is 3D is not as difficult as I thought it would be. Besides, in 3D world, doing 2D things are really slow. For instance, I wanted to include flocking in my project, but I failed because the whole sketch gets really slow.

=====Reference======
Super fomula: http://paulbourke.net/geometry/supershape/
