---
title: "Building an AI-Powered Evaluation Platform for Research Innovation"
description: "How we replaced fragmented Excel workflows with a cloud-native, multi-stage evaluation system using React, TypeScript, Node.js, and AI-powered decision support—saving nearly a week per reviewer per cycle."
pubDate: 2024-08-15
author: "Xiande Wen"
tags: ["react", "typescript", "nodejs", "ai", "platform-engineering", "enterprise", "cloud", "databricks"]
---

At CSL's Research External Innovation team, we faced a challenge that plagues many enterprise research organisations: how do you efficiently evaluate hundreds of academic and research project submissions across multiple therapeutic areas, coordinate feedback from diverse internal review groups, and make consistent, well-informed investment decisions—all while maintaining governance and auditability?

The answer we built eliminated fragmented spreadsheets, returned nearly a full week of productive time to each reviewer per funding cycle, and created a scalable foundation for CSL's external innovation pipeline.

# **The Problem: Excel-Driven Chaos at Scale**

The Research External Innovation team receives hundreds of research proposals annually from universities and research institutions across multiple therapeutic areas—oncology, immunology, cardiovascular, and more. Each submission required evaluation across several decision stages:

1. **Initial screening** by program managers
2. **Scientific review** by subject matter experts
3. **Strategic alignment assessment** by business development
4. **Final investment decision** by executive leadership

The existing workflow relied on Excel spreadsheets shared via email and network drives. This created several critical problems:

## **Operational Challenges**

- **Version control nightmares**: Multiple reviewers editing different copies of spreadsheets led to lost feedback and merge conflicts
- **Manual consolidation overhead**: Program managers spent days aggregating comments from 9+ reviewers into summary documents
- **No pipeline visibility**: Leadership had no real-time view of evaluation status, bottlenecks, or decision outcomes
- **Inconsistent evaluation criteria**: Lack of structured feedback mechanisms led to subjective, hard-to-compare assessments
- **Governance gaps**: No audit trail for decision rationale or approval workflows

## **Business Impact**

The average evaluation cycle took **21+ days** from submission to investment decision. With ~100 active submissions in the pipeline at any given time and each reviewer handling 10-15 proposals per cycle, the system was:

- **Slow**: Delayed time-to-decision meant missing competitive opportunities
- **Error-prone**: Manual data entry and copy-paste workflows introduced mistakes
- **Unscalable**: Adding new therapeutic areas or reviewers exponentially increased coordination overhead
- **Opaque**: Stakeholders couldn't track progress or understand decision drivers

For a research organisation pursuing cutting-edge external innovations, this workflow was a strategic liability.

# **The Solution: Cloud-Native Multi-Stage Evaluation Platform**

I led a team of two engineers to design and deliver a full-stack, cloud-native platform that digitised the entire evaluation lifecycle. The system replaced spreadsheets with a governed, auditable workflow while accelerating decision-making through AI-powered feedback synthesis.

## **Architecture Overview**

### **Frontend: React + TypeScript**

We built a rich, interactive UI using React and TypeScript to support complex, multi-step evaluation workflows:

```typescript
// Core evaluation workflow components
interface EvaluationStage {
  id: string;
  name: string;
  requiredReviewers: string[];
  approvalThreshold: number;
  aiSummaryEnabled: boolean;
}

interface Submission {
  id: string;
  title: string;
  therapeuticArea: string;
  currentStage: string;
  assignedReviewers: User[];
  reviews: Review[];
  aiInsights?: AIInsights;
}
```

**Key UI Features:**

- **Dynamic form-driven review interface**: Structured evaluation forms with scoring matrices, free-text feedback fields, and file upload capabilities
- **Pipeline visualisation dashboard**: Real-time kanban-style view showing submissions moving through evaluation stages
- **Role-based navigation**: Reviewers, program managers, and leadership each saw contextual views aligned to their responsibilities
- **Responsive, accessible design**: WCAG 2.1 AA compliant, supporting desktop and tablet workflows

### **Backend: Node.js + Express + PostgreSQL**

The backend provided secure, scalable APIs and workflow orchestration:

```typescript
// Multi-stage workflow orchestration
class EvaluationWorkflowService {
  async advanceStage(submissionId: string, currentUser: User): Promise<void> {
    const submission = await this.getSubmission(submissionId);
    const stage = await this.getStage(submission.currentStage);
    
    // Check approval criteria
    const approvalRate = this.calculateApprovalRate(submission.reviews);
    if (approvalRate < stage.approvalThreshold) {
      throw new Error('Insufficient approvals to advance');
    }
    
    // Generate AI summary if enabled
    if (stage.aiSummaryEnabled) {
      const aiInsights = await this.aiService.generateSummary(
        submission.reviews
      );
      await this.attachAIInsights(submissionId, aiInsights);
    }
    
    // Advance to next stage
    await this.transitionStage(submissionId, stage.nextStageId);
    await this.notifyStakeholders(submissionId);
  }
}
```

**Backend Capabilities:**

- **RESTful API design**: Clean, resource-oriented endpoints for submissions, reviews, users, and stages
- **Role-based access control (RBAC)**: Enforced at both API and database layers using PostgreSQL row-level security
- **Event-driven workflow automation**: Stage transitions triggered notification emails and dashboard updates
- **Centralised data persistence**: PostgreSQL hosted in Azure, providing ACID guarantees and audit logging
- **Secure file handling**: Azure Blob Storage integration for proposal documents and supporting materials

### **AI-Powered Decision Support: Databricks + LLM Integration**

To address the manual consolidation bottleneck, we integrated AI-powered feedback summarisation:

```python
# AI summarisation workflow
class ReviewSummarisationService:
    def __init__(self, databricks_client):
        self.client = databricks_client
        self.model = "meta-llama/Llama-2-70b-chat"
    
    async def generate_summary(self, reviews: List[Review]) -> AIInsights:
        # Extract reviewer feedback
        feedback_texts = [r.comments for r in reviews]
        
        # Construct structured prompt
        prompt = self._build_prompt(feedback_texts)
        
        # Call Databricks model serving endpoint
        response = await self.client.invoke_model(
            model=self.model,
            prompt=prompt,
            max_tokens=500
        )
        
        # Parse structured output
        return self._parse_insights(response.text)
    
    def _build_prompt(self, feedback_texts: List[str]) -> str:
        return f"""
        Analyze the following reviewer feedback for a research proposal.
        Provide:
        1. Overall sentiment (positive/neutral/negative)
        2. Key themes and consensus areas
        3. Major concerns or risks identified
        4. Recommendation summary
        
        Reviewer Feedback:
        {chr(10).join(feedback_texts)}
        """
```

**AI Features:**

- **Automated sentiment analysis**: Surfaced overall reviewer sentiment (positive/mixed/negative) for each submission
- **Consensus detection**: Identified themes and agreement patterns across multiple reviewers
- **Risk signal extraction**: Highlighted commonly mentioned concerns (e.g., regulatory challenges, competitive landscape)
- **Executive summaries**: Generated concise, actionable summaries for leadership review

The AI layer didn't make decisions—it **accelerated human decision-making** by pre-processing large volumes of unstructured feedback into structured insights.

## **Cloud Infrastructure & DevOps**

We deployed the platform on **Azure** with a modern CI/CD pipeline:

- **Frontend**: React app hosted on Azure Static Web Apps with CDN distribution
- **Backend**: Node.js API running on Azure App Service with auto-scaling
- **Database**: Azure Database for PostgreSQL with automated backups and point-in-time recovery
- **Storage**: Azure Blob Storage for document management with lifecycle policies
- **CI/CD**: GitHub Actions for automated testing, building, and multi-environment deployments
- **Security**: Azure AD integration for SSO, managed identities for service-to-service auth, and network isolation via private endpoints

**Deployment Pipeline:**

```yaml
# Simplified CI/CD workflow
name: Deploy Evaluation Platform

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Tests
        run: |
          npm ci
          npm run test:unit
          npm run test:integration
      
      - name: Build Frontend
        run: npm run build:frontend
      
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: csl-evaluation-platform
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
```

# **Business Impact: Measurable Value Delivered**

## **Quantified Outcomes**

### **Time Savings**

- **Reduced evaluation cycle time by ~6 days** (from 21+ days to ~15 days)
- **Saved ~8 hours per reviewer per funding cycle** on manual consolidation and coordination
- With **9 full-time equivalent reviewers**, this returned nearly **72 FTE hours per cycle**—equivalent to **one full week of productive research time**
- Across **4 funding cycles per year**, this delivered **~288 hours of annual capacity** back to the business

### **Operational Efficiency**

- **Eliminated version control errors**: Single source of truth replaced conflicting spreadsheet versions
- **Reduced manual data entry**: Structured forms and automated workflows eliminated copy-paste errors
- **Improved decision consistency**: Standardised evaluation criteria and scoring rubrics ensured comparable assessments
- **Enhanced governance**: Full audit trail of reviews, stage transitions, and approvals

### **Strategic Benefits**

- **Real-time pipeline visibility**: Leadership could track submission status, identify bottlenecks, and forecast decision outcomes
- **Scalability**: Platform handled 100+ concurrent submissions with minimal operational overhead
- **Faster time-to-investment**: Shorter cycles meant CSL could move faster on competitive opportunities
- **Data-driven insights**: Historical analytics enabled continuous process improvement

## **User Adoption & Feedback**

The platform achieved **100% user adoption** within 2 months of launch. Key feedback themes:

> "This has completely transformed how we work. I used to spend half my Friday consolidating feedback—now I just review the AI summary and move on."  
> — Senior Program Manager

> "For the first time, I can actually see where every submission stands. It's like going from flying blind to having a real-time radar."  
> — VP, Research External Innovation

# **Technical Challenges & Lessons Learned**

## **Challenge 1: Balancing Flexibility with Standardisation**

Research evaluations are inherently subjective, and different therapeutic areas had different evaluation criteria. We needed to **standardise workflows** without constraining domain expertise.

**Solution:**  
We implemented a **configurable stage and criteria system** where program managers could define custom evaluation forms per therapeutic area while maintaining a consistent workflow structure underneath. This gave teams flexibility while ensuring governance.

## **Challenge 2: Trust in AI Outputs**

Reviewers were initially sceptical of AI-generated summaries, fearing loss of nuance or misinterpretation.

**Solution:**  
We positioned AI as a **decision accelerator, not a decision maker**. The UI clearly labelled AI-generated content, always showed full reviewer comments alongside summaries, and allowed reviewers to override or ignore AI insights. Trust grew as users saw the AI consistently identifying the same themes they would have manually extracted.

## **Challenge 3: Migration from Legacy Workflows**

Teams were accustomed to Excel and resistant to change.

**Solution:**  
We ran **pilot programs with early adopter teams**, gathered feedback, and iterated rapidly. We also provided **Excel export functionality** to ease the transition—letting teams work in the platform but export data to familiar formats when needed. Over time, Excel exports became rarely used.

# **What's Next: Future Enhancements**

With the core platform established, we're exploring:

- **Predictive analytics**: Train models on historical submission data to predict approval likelihood and surface high-potential proposals earlier
- **Automated proposal intake**: NLP-powered extraction of key details (budget, timeline, principal investigator) from PDF submissions
- **Integration with financial systems**: Automatically trigger contract generation and funding workflows upon approval
- **Mobile app**: React Native companion app for on-the-go proposal reviews

# **Key Takeaways for Platform Engineers**

Building this platform taught me several lessons applicable to enterprise platform development:

1. **Start with the user workflow, not the tech stack**: We mapped the entire evaluation journey on whiteboards before writing a line of code
2. **AI augments, it doesn't replace**: Position AI as a tool to accelerate human judgment, not automate it away—especially in complex, high-stakes domains
3. **Governance is a feature, not an afterthought**: Audit trails, RBAC, and approval workflows were core requirements, not "enterprise cruft"
4. **Measure impact in user time, not system uptime**: The ultimate metric was "hours saved per reviewer," not API response times
5. **Phased rollout de-risks adoption**: Pilot programs with early adopters built trust and surfaced issues before full-scale deployment

---

**If you're building evaluation, review, or approval platforms—or integrating AI into human-in-the-loop workflows—I'd love to hear your experiences. What's worked? What hasn't? Let's connect.**

**References:**
- [Databricks Model Serving](https://docs.databricks.com/machine-learning/model-serving/index.html)
- [Azure Database for PostgreSQL](https://learn.microsoft.com/en-us/azure/postgresql/)
- [React TypeScript Best Practices](https://react-typescript-cheatsheet.netlify.app/)
