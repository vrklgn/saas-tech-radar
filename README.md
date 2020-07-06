![Example Radar](https://github.com/vrklgn/saas-tool-radar/blob/main/saastoolradar-logo.png "Example Radar")

# SaaS Tool Radar

Based on the [fantastic work by ThoughtWorks](https://www.thoughtworks.com/radar) and [forked from Zalandos Tech Radar](http://zalando.github.io/tech-radar/) the aim of the **SaaS Tool Radar** is to provide a equivilent framework for SaaS-powered workspaces. 

I's an ever growing market of SaaS applications - being able to visualise internally and publically how you think regarding 
SaaS applications could be an interesting way to see where you are heading and where you want to be.


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

## Usage (zalando/tech-radar)

### Editing the data

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
