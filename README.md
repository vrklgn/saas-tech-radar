<img src="https://github.com/vrklgn/saas-tool-radar/blob/main/saastoolradar-logo.png" width="700">

Based on the [fantastic work by ThoughtWorks](https://www.thoughtworks.com/radar) and [forked from Zalandos Tech Radar](http://zalando.github.io/tech-radar/) the aim of the **SaaS Tool Radar** is to provide a equivilent framework for SaaS-powered workspaces. 

I's an ever growing market of SaaS applications - being able to visualise internally and publically how you think regarding 
SaaS applications could be an interesting way to see where you are heading and where you want to be.

**[Check out the wiki for usage and more information](https://github.com/vrklgn/saas-tool-radar/wiki/)** 


## Changed concepts

### Rings

#### Invest
> Original: Adopt

Tools we have high confidence in to serve our purpose, also in the future. We want to encourage usage of and want to develop and research further. Thinking about what initiatives we can do to enhance the experience.

#### Support
> Original: Trial

These tools are commonly used within the company for productivity. They provide the foundation of applications we use to collaborate. However, at the moment, these tools are not being developed on further.

#### Assess
> Original: Assess

Tools and ideas worth exploring further, we see great potential in these products. We want to evaluate how they would fit in our workspace.

#### Drop
> Original: Hold

Tools we want to move away from. We rather avoid new projects being started in the tool and want to limit the usage over time to finally decommission the product entirely.

### Quadrants

#### Collaboration
> Original: Tools

Tools used to collaborate, most software will sit under this category. <br> **"Where do we work with each other?"**

#### Platforms
> Original: Platforms

Operating Systems or "Platforms" where software can be run. <br> **"On what do we work?"**

#### Communication
> Original: Techniques

Tools used for communication between employees / customers <br> **"How do we communicate with each other?"**

#### Compliance
> Original: Languages & Frameworks

Tools fulfilling a ISO-certification or managing of platforms. <br> **"How do we ensure that our work stays Secure?"**

## CSV Setup

### Example
```
label,ring,quadrant,new
Zoom,1,3,1
```

#### Label
Name of the Tool

#### Ring
 * 0: Invest
 * 1: Support
 * 2: Assess
 * 3: Drop

#### Quadrant
 * 0: Platforms
 * 1: Compliance
 * 2: Collaboration
 * 3: Communication

#### New
 * 0: Regular Blip (Old)
 * 1: Star (New)
