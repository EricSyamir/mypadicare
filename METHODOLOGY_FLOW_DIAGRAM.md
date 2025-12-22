# MyPadiCare Methodology Flow Diagram Documentation

## Overview

This document describes the comprehensive methodology flow diagram for the MyPadiCare AI-powered paddy disease detection and treatment recommendation system. The system integrates Convolutional Neural Networks (CNNs) for image-based disease classification with a Large Language Model (LLM) for personalized treatment recommendations, specifically designed for rice plant diseases with Malaysian dialect localization support.

---

## System Architecture Flow

The system is divided into two main components:

1. **Convolutional Neural Networks (CNNs) Section** - Disease Classification Pipeline
2. **Large Language Model (LLM) Section** - Personalized Treatment Recommendation Engine

---

## 1. Convolutional Neural Networks (CNNs) Section

### 1.1 Image Acquisition
- **Source**: Rice plants (paddy fields)
- **Methods**:
  - Camera capture (mobile/webcam)
  - Smartphone photography
  - Image upload from gallery
- **Supported Formats**: JPG, JPEG, PNG, WEBP
- **Maximum File Size**: 10MB

### 1.2 Data Preparation
- **Input**: Raw leaf disease images
- **Process**: Image Pre-processing
  - Resize to 256x256 pixels
  - Normalization (rescale to 1.0/255.0)
  - RGB channel conversion
  - Format standardization
- **Output**: Pre-processed image dataset

### 1.3 Dataset Splitting
- **Training Set**: Used for model training and validation
- **Test Set**: Used for performance evaluation
- **Validation Set**: Used during training for hyperparameter tuning

### 1.4 Model Training
- **Architecture**: Custom ResNet-style CNN
- **Framework**: TensorFlow.js (client-side) / TensorFlow (server-side)
- **Input Shape**: [None, 256, 256, 3]
- **Output Shape**: [None, 10] (10 disease classes)
- **Training Process**:
  - Data augmentation
  - Batch processing
  - Epoch-based learning
  - Model checkpointing

### 1.5 Performance Assessment
The trained model is evaluated using the following metrics:
- **Accuracy**: Overall classification correctness
- **Precision**: True positive rate among positive predictions
- **Recall**: True positive rate among actual positives
- **F-Score**: Harmonic mean of precision and recall

**Target Performance**: 90% accuracy

### 1.6 Leaf Disease Classification
The CNN model classifies images into the following 10 categories:

1. **Bacterial Leaf Blight** (Hawar Daun Bakteria)
2. **Bacterial Leaf Streak** (Jalur Daun Bakteria)
3. **Bacterial Panicle Blight** (Hawar Malai Bakteria)
4. **Blast** (Penyakit Blast)
5. **Brown Spot** (Bintik Coklat)
6. **Dead Heart** (Jantung Mati)
7. **Downy Mildew** (Kudis Bulu)
8. **Hispa** (Hispa)
9. **Tungro** (Tungro)
10. **Normal/Healthy Leaf** (Daun Sihat)

**Output**: Disease name, confidence score (0-100%), and severity level (Low/Moderate/High)

---

## 2. Large Language Model (LLM) Section

The LLM section is divided into two sub-processes:

### 2.1 Disease Treatment Recommendation Engine (Indexing Phase)

#### 2.1.1 Document Collection
- **Source**: Treatment knowledge base
- **Format**: JSON-structured documents (`data/treatments.json`)
- **Content**: Comprehensive treatment protocols for each disease
  - Immediate actions
  - Short-term management
  - Long-term prevention
  - Organic options
  - Chemical options
  - Cultural practices
  - Materials needed
  - Estimated costs
  - Expected recovery time
  - Warning signs

#### 2.1.2 Document Chunking
- **Process**: Treatment documents are structured into logical sections
- **Chunks**: Disease-specific treatment modules
- **Structure**: Hierarchical organization by disease type

#### 2.1.3 Embedding Model
- **Purpose**: Convert text chunks into numerical vector representations
- **Method**: Semantic embedding for similarity search
- **Output**: Vectorized treatment knowledge base

#### 2.1.4 Vector Store (Indexing)
- **Storage**: Indexed vector database
- **Structure**: 
  - Node 1: Immediate actions and emergency treatments
  - Node 2: Short-term and long-term management strategies
  - Node 3: Organic and chemical treatment options
- **Purpose**: Enable semantic search and retrieval of relevant treatment information

### 2.2 Personalized Treatment Recommendation (Querying and Response Generation)

#### 2.2.1 Query Input
- **Sources**:
  - Disease classification result from CNN (primary)
  - User query/input (optional)
  - Confidence score and severity level
- **Query Components**:
  - Disease name
  - Confidence percentage
  - Severity level (Low/Moderate/High)
  - User language preference

#### 2.2.2 Query Vectorization
- **Process**: Convert query into vector representation using embedding model
- **Purpose**: Enable semantic matching with vector store

#### 2.2.3 Search and Retrieval
- **Process**: 
  - Semantic search in vector store
  - Retrieve top-k relevant treatment contexts
  - Rank by relevance and disease match
- **Output**: Relevant treatment contexts from knowledge base

#### 2.2.4 Prompt Generation
- **Components**:
  - Disease classification result
  - Retrieved treatment contexts
  - User language preference
  - Malaysian dialect specification (if applicable)
- **Format**: Structured prompt for LLM

#### 2.2.5 Language and Dialect Localization
The system supports multiple languages and Malaysian dialects:

**Standard Languages**:
- English (en)
- Bahasa Malaysia (ms)
- Japanese (ja)

**Malaysian Dialects** (NEW):
- **Kedahan Dialect** (ms-kd)
  - Regional variations from Kedah state
  - Local terminology and expressions
  - Cultural context adaptation
  
- **Kelantanese Dialect** (ms-kl)
  - Regional variations from Kelantan state
  - Local terminology and expressions
  - Cultural context adaptation

**Localization Process**:
1. User selects language/dialect preference
2. Treatment documents retrieved in appropriate language
3. LLM prompt includes dialect-specific instructions
4. Response generated in selected dialect with local terminology

#### 2.2.6 LLM Response Generation
- **Model**: Google Gemini 2.0 Flash
- **Process**:
  - Receives structured prompt with disease info and treatment contexts
  - Generates personalized, empathetic recommendations
  - Adapts tone and terminology to selected dialect
  - Provides practical, actionable advice
- **Output Format**:
  - 80-120 words maximum
  - Plain text (no formatting)
  - Friendly, empathetic agricultural advisor tone
  - Dialect-appropriate language and terminology

#### 2.2.7 User Output
- **Delivery**: Personalized treatment recommendation
- **Content**:
  - AI Expert Advice (Gemini-generated summary)
  - Immediate Actions tab
  - Short-term Management tab
  - Long-term Prevention tab
  - Materials Needed tab
  - Estimated cost and recovery time
- **Language**: Matches user's selected language/dialect preference

---

## 3. Complete System Flow

### 3.1 End-to-End Process

```
1. User captures/uploads paddy leaf image
   ↓
2. Image pre-processing (resize, normalize)
   ↓
3. CNN model classification (TensorFlow.js)
   ↓
4. Disease identification with confidence score
   ↓
5. Treatment knowledge base retrieval (JSON lookup)
   ↓
6. Query construction with disease info + user language/dialect
   ↓
7. Google Gemini AI prompt generation
   ↓
8. LLM generates personalized recommendation
   ↓
9. Response delivered in user's selected language/dialect
   ↓
10. User receives comprehensive treatment plan
```

### 3.2 Key Features

- **100% Client-Side Processing**: CNN runs in browser (TensorFlow.js)
- **Privacy-First**: Images never leave user's device
- **Offline Capable**: CNN works without internet
- **Multi-Language Support**: English, Bahasa Malaysia, Japanese
- **Dialect Localization**: Kedahan and Kelantanese dialects
- **Real-Time Analysis**: Instant disease detection
- **Personalized Recommendations**: AI-generated, context-aware advice

---

## 4. Technical Specifications

### 4.1 CNN Model
- **Framework**: TensorFlow.js / TensorFlow
- **Architecture**: Custom ResNet-style CNN
- **Input Size**: 256x256x3
- **Output Classes**: 10
- **Model File**: `static/models/model.json`
- **Metadata**: `static/models/metadata.json`

### 4.2 LLM Integration
- **Provider**: Google Gemini API
- **Model**: gemini-2.0-flash
- **API Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- **Configuration**:
  - Temperature: 0.5
  - Max Output Tokens: 150
  - Top-P: 0.9
  - Top-K: 20

### 4.3 Treatment Knowledge Base
- **Format**: JSON
- **Location**: `data/treatments.json`
- **Localized Versions**:
  - `data/treatments.json` (English)
  - `data/treatments_ms.json` (Bahasa Malaysia)
  - `data/treatments_ja.json` (Japanese)
- **Structure**: Disease-keyed objects with treatment protocols

### 4.4 Dialect Support Implementation
- **Detection**: User preference selection
- **Processing**: 
  - Dialect-specific prompt instructions
  - Regional terminology mapping
  - Cultural context adaptation
- **Output**: Dialect-appropriate language in recommendations

---

## 5. Performance Metrics

### 5.1 CNN Performance
- **Accuracy**: 90%
- **Processing Time**: < 2 seconds (client-side)
- **Supported Diseases**: 10 classes
- **Confidence Thresholds**:
  - High: ≥ 85%
  - Moderate: 65-84%
  - Low: < 65%

### 5.2 LLM Performance
- **Response Time**: 2-5 seconds
- **Token Limit**: 150 tokens
- **Language Support**: 3 languages + 2 dialects
- **Personalization**: Context-aware recommendations

---

## 6. Visual Flow Diagram Components

### Left Side (CNN Pipeline) - Light Blue/Green Theme
- Image Acquisition (Camera/Smartphone icons)
- Leaf Disease Image Dataset (Stack of disks)
- Image Pre-processing (Gear icon)
- Test Set / Training Set (Individual disks)
- Model Training (Large gear icon)
- Training and Validation Datasets (Stacked documents)
- Performance Assessment (Metrics box: Accuracy, Precision, Recall, F Score)
- Leaf Disease Classification (10 diseases listed)

### Right Side (LLM Pipeline) - Dark Blue Theme

**Indexing Section**:
- Documents (Stacked document icons)
- Chunks (Horizontal stacked bars)
- Embedding Model (Neural network diagram)
- Vectorize (Grid of squares)
- Vector Store (Cylindrical database with Node 1, Node 2, Node 3)

**Querying Section**:
- Query Input (Blue square - from CNN classification or User)
- Query Vectorization (Embedding model + vector grid)
- Search & Retrieve (Vector Store search)
- Relevant Contexts (Query + Relevant Contexts box)
- Prompt Generation (Lines of text)
- LLM (Large Language Model - blue square)
- Generate Response
- User Output (User box)

**Localization Component** (NEW):
- Language/Dialect Selector
- Kedahan Dialect Processor
- Kelantanese Dialect Processor
- Dialect-Aware Response Generator

---

## 7. Integration Points

1. **CNN → LLM**: Disease classification result feeds into query construction
2. **Treatment DB → LLM**: Retrieved treatment contexts inform prompt generation
3. **User Preference → LLM**: Language/dialect selection influences response generation
4. **LLM → User**: Personalized recommendation delivered in selected language/dialect

---

## 8. Future Enhancements

- Additional Malaysian dialects (Terengganu, Perak, etc.)
- Voice input support with dialect recognition
- Regional agricultural expert knowledge integration
- Community feedback loop for treatment effectiveness
- Advanced image preprocessing for better accuracy
- Multi-disease detection in single image

---
