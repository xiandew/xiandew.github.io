---
title: "AI-Powered Compliance Reporting in Regulated Research Environments"
description: "Building a production-grade RAG system with React, Flask, and Databricks to automate audit-ready report generation from experimental data—eliminating manual effort while maintaining strict regulatory compliance."
pubDate: 2025-03-22
author: "Xiande Wen"
tags: ["ai", "llm", "rag", "compliance", "flask", "react", "databricks", "regulatory", "enterprise"]
---

In highly regulated research environments like pharmaceutical development, compliance reporting is not optional—it's critical. Every experiment must produce audit-ready documentation that traces data lineage, methodology, and regulatory adherence. For years, this process at CSL relied on scientists manually assembling reports from experimental data, protocols, and regulatory standards—a time-consuming, error-prone, high-risk workflow.

We built an AI-powered compliance reporting system that eliminated most manual report preparation effort, substantially reduced turnaround time and compliance risk, and standardised audit-ready documentation—all while maintaining the strict regulatory requirements of a GMP (Good Manufacturing Practice) environment.

Here's how we did it.

# **The Problem: Manual Report Assembly in a Regulated Environment**

At CSL's research facilities, scientists conduct thousands of experiments annually across immunology, protein engineering, and pharmaceutical manufacturing. Each experiment generates:

- **Raw experimental data** (measurements, observations, results)
- **Metadata** (timestamps, operators, equipment IDs, environmental conditions)
- **Protocol references** (SOPs, experimental designs, validation requirements)
- **Regulatory mappings** (which GMP, ICH, or FDA guidelines apply)

After completing an experiment, scientists were required to produce a **compliance report** for regulatory audits. This involved:

1. **Manually extracting relevant data** from laboratory systems (LIMS, ELN, data clouds)
2. **Copying protocol details** from document repositories
3. **Identifying applicable regulatory standards** from internal knowledge bases
4. **Drafting the report narrative** to explain methodology, results, and compliance rationale
5. **Cross-checking for accuracy and completeness** before submitting for approval

## **The Cost of Manual Reporting**

For a single experiment, this process took **4-8 hours of scientist time**. Across hundreds of experiments per month, the aggregate cost was staggering:

- **Lost research productivity**: Scientists spent days on administrative tasks instead of experimental work
- **Inconsistent quality**: Report formats, depth, and completeness varied by author
- **Compliance risk**: Manual data entry introduced transcription errors and missing references
- **Long turnaround times**: Reports often took weeks to complete, delaying project timelines
- **Scalability constraints**: As research volume grew, the reporting bottleneck became critical

For CSL, this wasn't just an efficiency problem—it was a **strategic and compliance liability**.

# **The Solution: LLM-Driven Report Generation with Retrieval-Augmented Generation (RAG)**

We designed an end-to-end AI-powered system that automated report generation while maintaining human oversight and regulatory traceability.

## **Architecture Overview**

The system followed a **human-in-the-loop AI workflow**:

1. **Data ingestion**: Scientists upload experimental data and select the experiment type
2. **Context retrieval**: System fetches relevant protocols and regulatory standards
3. **LLM generation**: AI drafts the compliance report using RAG
4. **Human review**: Scientists review, edit, and approve the AI-generated draft
5. **Audit trail**: Final report stored with full lineage and approval metadata

### **Tech Stack Selection: Why Flask Over NestJS**

We selected **Flask (Python)** for the backend instead of Node.js/NestJS for several architectural reasons:

**Infrastructure alignment:**
- CSL's data science and ML infrastructure was Python-centric (Databricks, Jupyter, pandas)
- Existing validation frameworks and testing pipelines were Python-based

**Library ecosystem:**
- Direct integration with scientific libraries (NumPy, pandas for data processing)
- Native Databricks SDK and LLM tooling in Python
- Simpler data validation for complex experimental datasets

**Team expertise:**
- Data scientists could contribute to backend logic without context switching
- Easier to validate and audit Python code in a regulated environment where tooling was already established

While NestJS would have been a valid choice, **Flask reduced integration overhead and aligned with CSL's existing platform.**

## **Frontend: React + TypeScript**

We built a guided, multi-step UI for data upload and report review:

```typescript
interface ExperimentData {
  experimentId: string;
  experimentType: 'protein-assay' | 'cell-culture' | 'stability-test';
  rawData: File;
  metadata: {
    operator: string;
    timestamp: Date;
    equipmentIds: string[];
    environmentalConditions: Record<string, number>;
  };
}

interface ComplianceReport {
  id: string;
  experimentId: string;
  generatedAt: Date;
  sections: ReportSection[];
  aiGenerated: boolean;
  reviewStatus: 'pending' | 'approved' | 'rejected';
  reviewer?: User;
  auditTrail: AuditEvent[];
}

// Report generation workflow
const ReportGenerationPage: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'generating' | 'review'>('upload');
  const [report, setReport] = useState<ComplianceReport | null>(null);

  const handleGenerate = async (data: ExperimentData) => {
    setStep('generating');
    const generatedReport = await api.generateReport(data);
    setReport(generatedReport);
    setStep('review');
  };

  const handleApprove = async () => {
    await api.approveReport(report.id, currentUser);
    // Trigger final PDF generation and archival
  };

  return (
    <Wizard currentStep={step}>
      {step === 'upload' && <DataUploadForm onSubmit={handleGenerate} />}
      {step === 'generating' && <GenerationProgress />}
      {step === 'review' && (
        <ReportReviewEditor
          report={report}
          onApprove={handleApprove}
          editable={true}
        />
      )}
    </Wizard>
  );
};
```

**Key UI Features:**

- **Drag-and-drop data upload** with client-side validation (file type, size, required fields)
- **Real-time generation progress** showing retrieval and generation steps
- **Side-by-side editor** displaying AI-generated draft with inline edit capabilities
- **Source citation panel** showing which protocols and regulations were referenced
- **Approval workflow** with digital signatures and audit logging

## **Backend: Flask + PostgreSQL + Azure Blob Storage**

The Flask backend orchestrated data ingestion, LLM calls, and report persistence:

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from azure.storage.blob import BlobServiceClient
import pandas as pd

app = Flask(__name__)
db = SQLAlchemy(app)
blob_client = BlobServiceClient.from_connection_string(os.getenv('AZURE_STORAGE_CONNECTION'))

class Experiment(db.Model):
    id = db.Column(db.String, primary_key=True)
    experiment_type = db.Column(db.String, nullable=False)
    raw_data_path = db.Column(db.String, nullable=False)
    metadata = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ComplianceReport(db.Model):
    id = db.Column(db.String, primary_key=True)
    experiment_id = db.Column(db.String, db.ForeignKey('experiment.id'))
    content = db.Column(db.JSON, nullable=False)
    ai_generated = db.Column(db.Boolean, default=True)
    review_status = db.Column(db.String, default='pending')
    reviewer_id = db.Column(db.String, db.ForeignKey('user.id'))
    approved_at = db.Column(db.DateTime)

@app.route('/api/reports/generate', methods=['POST'])
def generate_report():
    """Generate AI-powered compliance report"""
    data = request.json
    
    # Validate incoming data
    experiment_data = validate_experiment_data(data)
    
    # Store raw data in blob storage
    blob_path = store_raw_data(experiment_data)
    
    # Save experiment record
    experiment = Experiment(
        id=generate_id(),
        experiment_type=experiment_data['type'],
        raw_data_path=blob_path,
        metadata=experiment_data['metadata']
    )
    db.session.add(experiment)
    db.session.commit()
    
    # Trigger RAG pipeline
    report_content = rag_service.generate_report(
        experiment_id=experiment.id,
        experiment_type=experiment.experiment_type,
        data=experiment_data
    )
    
    # Save generated report
    report = ComplianceReport(
        id=generate_id(),
        experiment_id=experiment.id,
        content=report_content,
        ai_generated=True
    )
    db.session.add(report)
    db.session.commit()
    
    return jsonify(report.to_dict()), 201
```

**Backend Responsibilities:**

- **Secure file ingestion**: Validated file uploads, stored in Azure Blob Storage with encryption at rest
- **Data preprocessing**: Parsed experimental data using pandas, normalized formats
- **API orchestration**: Coordinated calls to RAG service, protocol retrieval, and LLM generation
- **Audit logging**: Every action (data upload, report generation, approval) logged with timestamp and user
- **RBAC enforcement**: Role-based access ensuring only authorized scientists could approve reports

## **The AI Engine: Retrieval-Augmented Generation (RAG) with Databricks**

The core innovation was a **RAG pipeline** that dynamically injected relevant protocols and regulatory context into LLM prompts:

```python
class RAGReportGenerationService:
    def __init__(self, databricks_client, vector_store):
        self.llm_client = databricks_client
        self.vector_store = vector_store  # ChromaDB or similar
        self.model = "databricks-meta-llama-3-70b-instruct"
    
    def generate_report(self, experiment_id: str, experiment_type: str, data: dict) -> dict:
        """Generate compliance report using RAG"""
        
        # Step 1: Retrieve relevant protocols and regulations
        context_docs = self._retrieve_context(experiment_type, data)
        
        # Step 2: Extract experimental data summary
        data_summary = self._summarize_experimental_data(data)
        
        # Step 3: Construct RAG prompt
        prompt = self._build_rag_prompt(
            experiment_type=experiment_type,
            data_summary=data_summary,
            context_docs=context_docs
        )
        
        # Step 4: Call LLM
        response = self.llm_client.generate(
            model=self.model,
            prompt=prompt,
            max_tokens=2000,
            temperature=0.2  # Low temperature for factual consistency
        )
        
        # Step 5: Parse and structure output
        return self._parse_report_sections(response.text, context_docs)
    
    def _retrieve_context(self, experiment_type: str, data: dict) -> List[Document]:
        """Retrieve relevant protocols and regulations using vector search"""
        
        # Build retrieval query
        query = f"Protocols and regulations for {experiment_type} experiments"
        
        # Vector search over indexed protocols
        protocol_results = self.vector_store.similarity_search(
            query=query,
            collection="protocols",
            top_k=5
        )
        
        # Vector search over regulatory standards
        regulation_results = self.vector_store.similarity_search(
            query=f"GMP ICH FDA requirements for {experiment_type}",
            collection="regulations",
            top_k=3
        )
        
        return protocol_results + regulation_results
    
    def _build_rag_prompt(self, experiment_type: str, data_summary: str, context_docs: List[Document]) -> str:
        """Construct prompt with injected context"""
        
        context_text = "\n\n".join([
            f"[{doc.source}]\n{doc.content}"
            for doc in context_docs
        ])
        
        return f"""
You are a compliance reporting assistant for a pharmaceutical research laboratory.

Generate a regulatory compliance report for the following experiment.

EXPERIMENT TYPE: {experiment_type}

EXPERIMENTAL DATA SUMMARY:
{data_summary}

RELEVANT PROTOCOLS AND REGULATIONS:
{context_text}

Generate a structured compliance report with the following sections:
1. Executive Summary
2. Experimental Methodology (reference specific protocols)
3. Results and Observations
4. Regulatory Compliance Statement (cite applicable regulations)
5. Data Integrity and Traceability

Ensure all claims are traceable to provided protocols and regulations. Use precise citations.
"""
    
    def _parse_report_sections(self, llm_output: str, context_docs: List[Document]) -> dict:
        """Parse LLM output into structured report"""
        
        # Extract sections using regex or LLM-based parsing
        sections = parse_markdown_sections(llm_output)
        
        # Attach source citations
        for section in sections:
            section['citations'] = self._extract_citations(
                section['content'],
                context_docs
            )
        
        return {
            'sections': sections,
            'metadata': {
                'model': self.model,
                'generated_at': datetime.utcnow().isoformat(),
                'context_sources': [doc.source for doc in context_docs]
            }
        }
```

### **Why RAG Over Fine-Tuning?**

We chose RAG over fine-tuning the LLM for several reasons:

**Regulatory compliance:**
- Protocols and regulations change frequently—RAG allows real-time updates without retraining
- Explicit citations provide audit trail showing which documents informed the report

**Data scarcity:**
- We didn't have thousands of labeled compliance reports for fine-tuning
- RAG leverages existing protocol documents without training data requirements

**Interpretability:**
- Regulators can trace every claim in the report back to source documents
- Scientists can verify AI reasoning by reviewing retrieved context

**Cost and speed:**
- No expensive model training or hosting required
- Faster iteration on prompt engineering vs. training loops

## **Vector Store: Indexing Protocols and Regulations**

We pre-indexed CSL's protocol library and regulatory standards using embeddings:

```python
from chromadb import Client
from sentence_transformers import SentenceTransformer

# Initialize vector store
chroma_client = Client()
collection = chroma_client.create_collection("protocols")

# Index protocols
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

protocols = load_protocols_from_sharepoint()  # ~500 SOP documents
for protocol in protocols:
    embedding = embedding_model.encode(protocol.content)
    collection.add(
        ids=[protocol.id],
        embeddings=[embedding.tolist()],
        documents=[protocol.content],
        metadatas=[{
            'title': protocol.title,
            'version': protocol.version,
            'effective_date': protocol.effective_date
        }]
    )
```

This allowed sub-second retrieval of the most relevant protocols for any experiment type.

# **Business Impact: Transforming Compliance Workflows**

## **Quantified Outcomes**

### **Time Savings**

- **Reduced report preparation time from 4-8 hours to ~30 minutes** (review and approval only)
- **85-90% reduction in manual effort** per report
- Across **~200 reports per month**, this saved approximately **1,000+ hours monthly** of scientist time
- That's equivalent to **~6 full-time scientists** returned to experimental work annually

### **Quality and Consistency**

- **Standardised report structure** ensured all required sections were present
- **Improved citation accuracy**: AI consistently referenced correct protocols and regulations
- **Reduced transcription errors**: Eliminated manual copy-paste mistakes

### **Compliance Risk Reduction**

- **Full audit trail**: Every report linked to source data, protocols, and approvals
- **Version control**: All protocol references automatically pointed to current versions
- **Faster audits**: Regulators could verify compliance claims by checking cited sources

### **Strategic Value**

- **Faster project timelines**: Reduced reporting bottleneck meant experiments could proceed to next stages sooner
- **Scalable compliance**: System handled increasing experiment volume without proportional staffing increases
- **Knowledge capture**: Indexed protocol library became a searchable organisational knowledge base

## **User Adoption**

The platform achieved **95%+ adoption** within 3 months across the research organisation. Scientists reported:

> "I was sceptical at first, but the AI nails the structure every time. I just verify the data and hit approve. It's saved me hours every week."  
> — Senior Research Scientist

> "Having all the protocols automatically cited is huge. I used to spend half my time hunting down the right SOP version—now it's just there."  
> — Laboratory Manager

# **Technical Challenges & Solutions**

## **Challenge 1: Ensuring Factual Accuracy (Hallucination Risk)**

LLMs can generate plausible-sounding but incorrect information—unacceptable in regulated reporting.

**Solution:**
- **Low temperature (0.2)** to reduce creativity and favour factual consistency
- **Grounded generation**: LLM only used information from retrieved protocols—no unsourced claims allowed
- **Citation verification**: Post-processing checked that all regulatory claims were traceable to source docs
- **Human review gate**: Scientists always reviewed and approved before finalisation

## **Challenge 2: Data Privacy and Security**

Experimental data was sensitive IP and subject to export controls.

**Solution:**
- **On-premise LLM hosting**: Databricks models deployed within CSL's Azure tenant—data never left the network
- **Encryption**: Data at rest (Azure Blob Storage) and in transit (TLS 1.3)
- **RBAC**: Only authorised scientists could access specific experiment data
- **Audit logs**: Every API call logged with user identity, timestamp, and action

## **Challenge 3: Protocol Versioning**

Protocols frequently updated—reports must reference the correct version.

**Solution:**
- **Version-aware vector store**: Indexed protocols with version metadata
- **Effective date filtering**: Retrieval logic selected protocol version effective at experiment date
- **Change notifications**: When protocols updated, system flagged reports pending review using old versions

## **Challenge 4: Adoption and Trust**

Scientists were initially sceptical of AI-generated compliance documents.

**Solution:**
- **Transparency**: UI clearly labelled AI-generated content and showed all sources
- **Edit freedom**: Scientists could modify any section—AI was a starting point, not a constraint
- **Pilot program**: Started with low-risk experiment types, gathered feedback, improved prompts
- **Training sessions**: Educated scientists on how the RAG system worked to build confidence

# **What's Next: Future Enhancements**

With the core system proven in production, we're exploring:

- **Multi-modal data support**: Incorporate images (microscopy, chromatograms) into report narratives
- **Automated cross-referencing**: Link related experiments and flag inconsistencies across reports
- **Predictive compliance checks**: Pre-flight validation warning scientists if experiment design might violate protocols
- **Integration with ELN systems**: Auto-pull experimental data directly from electronic lab notebooks

# **Key Lessons for AI in Regulated Environments**

Building this system taught me critical lessons about deploying AI in high-stakes domains:

1. **Human-in-the-loop is non-negotiable**: AI assists, humans decide—especially where regulatory liability exists
2. **Traceability beats performance**: A slightly less eloquent report that cites sources is far better than a perfect-sounding one without grounding
3. **RAG is powerful for knowledge-intensive tasks**: When you have rich internal documents, RAG often outperforms fine-tuning
4. **Infrastructure constraints shape architecture**: Choosing Flask over NestJS was driven by validation, tooling, and team context—not technical superiority
5. **Trust is earned through transparency**: Showing users exactly how the AI works builds confidence faster than hiding complexity

---

**If you're building AI systems for regulated industries or exploring RAG for enterprise knowledge work, I'd love to compare notes. What patterns have worked for you? What surprised you?**

**References:**
- [Databricks LLM Guide](https://docs.databricks.com/en/large-language-models/index.html)
- [Retrieval-Augmented Generation (RAG) Overview](https://arxiv.org/abs/2005.11401)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [ChromaDB Vector Store](https://www.trychroma.com/)
