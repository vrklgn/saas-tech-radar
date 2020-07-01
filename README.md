# Background

[Zalando](http://zalando.de), maintains a [public Tech
Radar](http://zalando.github.io/tech-radar/) to help their engineering teams
align on technology choices. It is based on the [pioneering work
by ThoughtWorks](https://www.thoughtworks.com/radar).

An thought I (vrklgn) had for some time is how this tech-radar could be used to also visualise
internal work with SaaS applications and other productivity apps - From here on known as "Tools".

This fork aims to create a framework for how to describe and talk about SaaS applications internally.

It's an forever growing market - being able to visualise internally and publically how you think regarding 
SaaS applications could be an interesting way to see where you are heading and where you want to be.

# Example Radar
![Example Radar](https://github.com/vrklgn/saas-tech-radar/blob/main/saas-radar.jpg "Example Radar")

## Changed Concepts

### Rings

| Original | Replacement | Description
| --- | --- | --- |
| Adopt | Invest | Where we want to put development / research to make the environment even better (User Education, Initatives, New ways of working etc. |
| Trial | Support | Tools that are part of the software stack that we support. |
| Hold | Obsolete | Tools we want to move away from. |
| Assess | Unsupported | Tool we have moved away from or decided against. |

### Quadrants

| Original | Replacement | Description
| --- | --- | --- |
| Techniques | Compliance | Tools fulfilling a ISO-certification or managing of platforms. <br> **"How do we ensure that our work is Secure?"** |
| Platforms | Platforms | Operating Systems or "Platforms" where software can be run. <br> **"On what do we work?"**|
| Tools | Collaboration | Tools used to collaborate, most software will sit under this category. <br> **"Where do we work with each other?"**|
| Languages & Frameworks | Communication | Tools used for communication between employees / customers <br> **"How do we communicate with each other?"** |

## Usage

### zalando/tech-radar

This repository contains the code to generate the visualization:
[`radar.js`](/docs/radar.js) (based on [d3.js v4](https://d3js.org)).
Feel free to use and adapt it for your own purposes.

1. include `d3.js` and `radar.js`:

```html
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="http://zalando.github.io/tech-radar/release/radar-0.5.js"></script>
```

2. insert an empty `svg` tag:

```html
<svg id="radar"></svg>
```

3. configure the radar visualization:

```js
radar_visualization({
  svg_id: "radar",
  width: 1450,
  height: 1000,
  colors: {
    background: "#fff",
    grid: "#bbb",
    inactive: "#ddd"
  },
  title: "My Radar",
  quadrants: [
    { name: "Bottom Right" },
    { name: "Bottom Left" },
    { name: "Top Left" },
    { name: "Top Right" }
  ],
  rings: [
    { name: "INNER",  color: "#93c47d" },
    { name: "SECOND", color: "#b7e1cd" },
    { name: "THIRD",  color: "#fce8b2" },
    { name: "OUTER",  color: "#f4c7c3" }
  ],
  print_layout: true,
  entries: [
   {
      label: "Some Entry",
      quadrant: 3,          // 0,1,2,3 (counting clockwise, starting from bottom right)
      ring: 2,              // 0,1,2,3 (starting from inside)
      moved: -1             // -1 = moved out (triangle pointing down)
                            //  0 = not moved (circle)
                            //  1 = moved in  (triangle pointing up)
   },
    // ...
  ]
});
```

Entries are positioned automatically so that they don't overlap.

### Local Development

1. install dependencies with yarn (or npm):

```
yarn 
```

2. start local dev server:

```
yarn start
```

3. your default browser should automatically open and show the url
 
```
http://localhost:3000/
```

## License

```
vrkgn/tech-radar
Modifications under same license as origin.


zalando/tech-radar
The MIT License (MIT)

Copyright (c) 2017 Zalando SE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
