---
title: "The AI Dilemma: When Legacy Infrastructure Meets Modern Ambitions"
description: "Why large enterprises struggle to adopt AI at scale—and why the problem isn't the AI models, it's the decades of technical debt hiding in their data foundations."
pubDate: 2025-12-18
author: "Xiande Wen"
tags: ["ai", "enterprise", "legacy-systems", "data-infrastructure", "cloud", "digital-transformation"]
---

It's late 2025, and AI is everywhere. Startups are shipping LLM-powered products in weeks. Cloud-native companies are embedding AI into every workflow. The headlines promise transformation: "AI will revolutionise healthcare," "AI will accelerate drug discovery," "AI will optimise supply chains."

At large, established enterprises—pharmaceutical companies, financial institutions, manufacturers—the executive directive is clear: **"We need to be AI-first. We're falling behind. Make it happen."**

But in the engineering trenches, a different reality unfolds. The AI models are ready. The cloud platforms are mature. The tooling exists. Yet progress is glacial, pilots fail to scale, and AI initiatives stall in bureaucratic purgatory.

The problem isn't the AI. **It's the data—or more precisely, the decades of infrastructure decisions that made modern data work nearly impossible.**

# **The AI Ambition: What Leadership Sees**

From the C-suite, the AI opportunity looks straightforward:

- **Competitors are moving fast**: Biotech startups using AI for protein folding, fintech firms deploying fraud detection models
- **Consultants are pitching solutions**: "Just integrate an LLM API and you're AI-enabled"
- **The ROI is compelling**: Automate manual work, accelerate R&D, unlock insights from decades of data

The logic is seductive: *We have mountains of data. AI thrives on data. Therefore, we should be able to deploy AI at scale.*

**The disconnect: leadership assumes the data is ready. It almost never is.**

# **The Reality: What Engineers Inherit**

When tasked with "building an AI-powered system," engineers at legacy enterprises encounter a nightmare scenario:

## **1. Data Locked in Silos**

Critical data lives in:

- **On-premise SharePoint 2013 farms** (manufacturing specifications, research protocols)
- **Desktop Excel files** on network drives (experimental results, customer data)
- **Legacy Oracle databases** with undocumented schemas (financial records, ERP data)
- **Proprietary vendor systems** with no API access (laboratory instruments, CRM platforms)
- **Paper archives** requiring manual digitisation (historical clinical trial records)

**The AI needs structured, accessible, labelled data. Instead, you get fragmented, inconsistent, inaccessible data across dozens of systems.**

## **2. No Unified Data Model**

Even when data is digitised, it's chaotic:

- The same customer might have 5 different IDs across systems
- Product codes changed 3 times over 20 years—no historical mapping exists
- Date formats vary by system (DD/MM/YYYY vs. MM-DD-YY vs. UNIX timestamps)
- Critical metadata is missing (who entered this data? when? under what conditions?)

**You can't train a model when you can't reliably join datasets or establish ground truth.**

## **3. Security and Compliance Constraints**

Enterprises operate under strict regulatory frameworks:

- **HIPAA, GDPR, GxP**: Data access is tightly controlled, audit trails required
- **Export controls**: Certain data cannot leave specific geographies or cloud regions
- **Vendor constraints**: Legacy contracts prohibit moving data to modern platforms
- **Internal policies**: IT won't approve cloud services outside a narrow pre-approved list

**You can't rapidly iterate on AI experiments when every data access request requires a 6-week approval process.**

## **4. Infrastructure Built for a Different Era**

The technology stack was designed for **predictable, transactional workloads**, not AI/ML:

- **Compute**: Virtual machines provisioned manually, not elastic cloud resources
- **Storage**: Expensive SAN arrays, not cheap object storage (S3, Azure Blob)
- **Networking**: On-premise data centres, not cloud-native architectures
- **Tooling**: No Jupyter notebooks, no GPU clusters, no ML platforms

**The infrastructure was optimised for running SAP ERP in 2005, not training transformer models in 2025.**

# **The AI Dilemma: Why This Happens**

Large enterprises didn't *choose* to have terrible data infrastructure. They accumulated it through decades of:

## **1. Technology Decisions That Made Sense at the Time**

- **2005**: "SharePoint is the future of enterprise collaboration!"
- **2010**: "Let's customise this ERP system to our exact workflows!" (Now impossible to upgrade)
- **2015**: "Cloud is unproven—let's invest in on-premise infrastructure." (Now sunk cost fallacy)

Each decision was rational given constraints of the era. But compounded over 20 years, they created **technical debt that AI projects can't afford to ignore.**

## **2. Organisational Silos**

In a 20,000-person organisation:

- **IT owns infrastructure** (slow to approve changes, risk-averse)
- **Data teams own databases** (understaffed, buried in BAU work)
- **Business units own applications** (no incentive to standardise data formats)
- **Security owns compliance** (veto power, no budget to help migrate)

**No single team has the authority, budget, or mandate to unify data infrastructure.**

## **3. The Innovator's Dilemma**

Leadership wants AI innovation, but:

- **Budgets prioritise "keeping the lights on"**: 80% of IT spend goes to maintaining legacy systems
- **Metrics reward stability, not transformation**: Uptime targets punish experimentation
- **Career incentives favour risk avoidance**: Nobody gets promoted for a failed AI pilot, but system outages cost jobs

**Result: AI initiatives get starved of resources, relegated to "innovation theatre," and never reach production.**

# **Case Study: CSL's AI Journey (The Good, The Bad, The Pragmatic)**

At CSL, I've witnessed this dilemma firsthand—and experienced both the frustrations and occasional breakthroughs.

## **The AI Ambition**

CSL's leadership recognised the opportunity:

- **Drug discovery acceleration**: Use AI to predict protein structures, optimise antibody design
- **Manufacturing optimisation**: AI-driven quality control, predictive maintenance
- **Compliance automation**: Generate regulatory reports from experimental data (the project I led)

The vision was sound. The execution faced brutal realities.

## **The Data Reality**

### **Challenge 1: Fragmented Research Data**

Experimental data lived in:

- **LIMS (Laboratory Information Management System)**: Structured but inflexible, API access limited
- **Electronic Lab Notebooks (ELN)**: Free-text entries, inconsistent formatting
- **TetraScience Data Cloud**: Modern platform, but only 30% of labs migrated
- **Local spreadsheets**: Scientists kept "working copies" outside official systems

**To train an AI model on historical experiments, we'd need to aggregate data from 4+ systems with incompatible data models.**

### **Challenge 2: On-Premise Infrastructure**

CSL's research facilities ran on:

- **On-premise data centres** with manual provisioning (4-6 week lead times for new servers)
- **SharePoint 2013** for document management (no modern APIs, painful to extract data)
- **Legacy authentication**: LDAP-based, not cloud-compatible

**Running AI workloads meant convincing IT to approve Azure subscriptions, navigating procurement, and building cloud connectors—months of bureaucracy before writing a single line of ML code.**

### **Challenge 3: Regulatory Constraints**

As a pharmaceutical company:

- **GxP compliance** required validated systems and audit trails
- **Data residency** mandated certain datasets stay in Australia
- **Change control** meant infrastructure changes required formal approval and testing

**We couldn't just "spin up a Databricks cluster" like a startup—every component needed validation, security review, and compliance sign-off.**

## **The Pragmatic Path Forward**

We didn't solve the entire data problem. Instead, we:

### **1. Started Small, High-Value**

We focused on **compliance reporting** (the project detailed in my earlier blog post) because:

- **Clear ROI**: Reports took 4-8 hours manually, AI reduced this to 30 minutes
- **Scoped data**: Only needed experimental data from specific labs, not entire organisation
- **Regulatory buy-in**: Compliance team was a champion, not a blocker

### **2. Built on Approved Infrastructure**

Instead of fighting for new platforms, we used:

- **Databricks on Azure** (already approved by IT for data science work)
- **Azure Blob Storage** (validated for research data)
- **Existing authentication** (integrated with Azure AD, no new identity system)

**We optimised for "possible within current constraints," not "ideal greenfield architecture."**

### **3. Delivered Incremental Value**

Rather than a "big bang" AI platform, we:

- **Shipped the compliance reporting tool** (immediate user value)
- **Used success to secure budget** for the next project (evaluation platform)
- **Built reusable components** (RAG pipelines, document indexing) applicable to future AI work

**Each project created momentum and demonstrated ROI, making the next approval easier.**

## **What We Learned**

**AI at legacy enterprises isn't a technology problem—it's a change management problem.**

The technical challenges (training models, deploying APIs) were straightforward. The hard parts were:

- **Navigating procurement** to get cloud resources approved
- **Coordinating with 5+ teams** (IT, security, compliance, data, business) who all had veto power
- **Building trust** that AI wouldn't introduce compliance risk
- **Managing expectations** that this wouldn't happen overnight

# **The Broader Industry Pattern: Why Startups Win**

Startups building AI products have structural advantages legacy enterprises can't easily replicate:

| Dimension | Startup | Legacy Enterprise |
|-----------|---------|-------------------|
| **Data Infrastructure** | Cloud-native from day 1 (S3, BigQuery) | 20+ years of on-premise silos |
| **Decision Speed** | CEO approves cloud spend in 1 meeting | 6-month procurement, 4-layer approval |
| **Technical Debt** | Zero legacy systems to maintain | 80% of IT budget on "keeping lights on" |
| **Talent** | Hire AI-native engineers | Retrain COBOL developers or compete for scarce ML talent |
| **Risk Tolerance** | Fail fast, iterate | Regulatory scrutiny, risk-averse culture |

**Result: Startups ship AI products in weeks. Enterprises take years—if they ship at all.**

# **The Uncomfortable Truth: Most Enterprises Aren't Ready**

The hard reality is that **most large, legacy organisations cannot adopt AI at scale without first modernising their data infrastructure**—a multi-year, multi-million-dollar effort with no immediate ROI.

Leadership often doesn't want to hear this. They want:

- "Just integrate ChatGPT into our CRM!" (Ignoring that the CRM data is a mess)
- "Build an AI co-pilot for our employees!" (Without investing in data lakes, APIs, or governance)
- "Beat the startups!" (While maintaining risk-averse policies designed to prevent innovation)

**The reality is: you can't bolt AI onto broken data foundations.**

# **What Actually Works: A Practical Roadmap**

For enterprises serious about AI (not just innovation theatre), here's what I've seen succeed:

## **1. Acknowledge the Data Problem**

Stop pretending data is "ready." Conduct an honest audit:

- Where is our critical data? (Map all systems)
- What's the quality? (Missing fields, inconsistent formats, duplicates)
- Who can access it? (Security policies, approval workflows)
- How long to extract and prepare? (Weeks? Months?)

**If the answer is "we don't know," you're not ready for AI at scale.**

## **2. Invest in Data Infrastructure First**

Before building AI models, build the foundation:

- **Data lakes**: Consolidate siloed data into queryable storage (S3, Azure Data Lake)
- **ETL pipelines**: Automate data extraction, transformation, and loading
- **Data catalogues**: Document what data exists, where it lives, what it means
- **Governance frameworks**: Define access policies, retention rules, audit trails

**This isn't sexy work. It won't make headlines. But it's non-negotiable.**

## **3. Start with High-Value, Low-Complexity Use Cases**

Don't lead with "AI-powered drug discovery." Start with:

- **Document classification**: Automate tagging of incoming emails, reports
- **Data extraction**: Pull structured data from PDFs, forms
- **Chatbots for internal FAQs**: Reduce helpdesk load with RAG-powered knowledge bases

**These deliver quick wins, build trust, and create reusable components for bigger projects.**

## **4. Build Internal AI Platforms, Not One-Off Projects**

Every AI project shouldn't reinvent the wheel. Invest in:

- **Shared ML platforms**: Databricks, SageMaker, Vertex AI
- **Model registries**: Centralised storage for trained models
- **Feature stores**: Reusable data transformations and features
- **CI/CD for ML**: Automated testing, versioning, deployment

**Think "platform thinking," not "project thinking."**

## **5. Accept That This Will Be Slow**

Cultural change at 20,000-person organisations takes years. Expect:

- **Pilots to stall**: Most won't reach production on first try
- **Resistance**: Teams comfortable with Excel won't adopt AI eagerly
- **Budget battles**: Convincing finance to fund multi-year data modernisation is hard

**Persistence and incremental progress beat ambitious roadmaps that never ship.**

# **A Message to Leadership**

If you're an executive pushing for AI adoption, understand:

**Your engineers aren't slow, incompetent, or resistant to innovation. They're navigating a minefield of technical debt, organisational silos, and infrastructure built for a different era.**

Asking "Why can't we just use ChatGPT?" is like asking "Why can't we just launch a rocket?" when your organisation has never built an engine.

**AI isn't a bolt-on feature. It's a fundamental shift in how data, systems, and processes work.**

If you're serious about AI, fund the unglamorous work:

- **Data lake migrations** (not AI model training)
- **API development** (not chatbot UIs)
- **Cloud platform adoption** (not proof-of-concept demos)

**The AI models will work fine—if you give them the data foundation they need.**

# **A Message to Engineers**

If you're building AI at a legacy enterprise, you're not alone. The challenges are real, structural, and often frustrating.

**Survival strategies:**

- **Pick battles carefully**: Focus on projects with executive sponsorship and clear ROI
- **Build incrementally**: Ship small wins that demonstrate value and build momentum
- **Partner with champions**: Find business stakeholders who "get it" and advocate for you
- **Document ruthlessly**: Track delays caused by infrastructure gaps—use this to justify investment
- **Stay pragmatic**: You won't get the perfect architecture—build what's possible today, improve tomorrow

**And remember: the work you're doing—building data platforms, designing APIs, migrating systems—is the hard, valuable work that enables AI. Don't let leadership dismiss it as "just infrastructure."**

---

**The AI revolution is real. But for large enterprises, the bottleneck isn't AI capability—it's the data infrastructure built over decades of decisions that made sense at the time but didn't anticipate this future.**

**If your organisation is struggling with AI adoption, share this. Let's have honest conversations about the real challenges—not just the marketing promises.**

**What's been your experience? Are you at a startup moving fast, or an enterprise battling legacy systems? I'd love to hear your stories.**

**References:**
- [Gartner: Why AI Projects Fail](https://www.gartner.com/en/newsroom/press-releases/2023-08-03-gartner-says-ai-engineering-will-be-essential-to-operationalize-ai)
- [The Innovator's Dilemma](https://www.claytonchristensen.com/books/the-innovators-dilemma/)
- [Data-Centric AI](https://datacentricai.org/)
- [AWS Well-Architected Framework: Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html)
