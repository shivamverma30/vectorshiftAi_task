# VectorShift AI Pipeline Builder

A visual pipeline builder application inspired by VectorShift, allowing users to create and validate data processing pipelines through an intuitive drag-and-drop interface.

![Pipeline Builder](https://img.shields.io/badge/React-18.2-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green) ![ReactFlow](https://img.shields.io/badge/ReactFlow-11.8-purple)

## 🚀 Features

- **Visual Pipeline Editor**: Drag-and-drop interface for building complex data pipelines
- **Multiple Node Types**: 
  - Input/Output nodes for data flow
  - LLM nodes for AI integration
  - Text & Note nodes for documentation
  - API nodes for external integrations
  - Filter nodes for data processing
  - Math nodes for calculations
  - Timer nodes for scheduled operations
- **DAG Validation**: Automatic detection of cycles in pipelines (Directed Acyclic Graph validation)
- **Real-time Canvas**: Interactive grid with zoom, pan, and minimap
- **Modern UI**: Dark theme inspired by VectorShift's clean design

## 📁 Project Structure

```
VS/
├── backend/
│   ├── main.py              # FastAPI server with DAG validation
│   └── __pycache__/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js           # Main application layout
│   │   ├── ui.js            # ReactFlow canvas setup
│   │   ├── toolbar.js       # Draggable node toolbar
│   │   ├── submit.js        # Pipeline submission logic
│   │   ├── store.js         # Zustand state management
│   │   ├── draggableNode.js # Drag-and-drop functionality
│   │   └── nodes/           # Custom node implementations
│   │       ├── BaseNode.js
│   │       ├── inputNode.js
│   │       ├── outputNode.js
│   │       ├── llmNode.js
│   │       ├── textNode.js
│   │       ├── noteNode.js
│   │       ├── apiNode.js
│   │       ├── filterNode.js
│   │       ├── mathNode.js
│   │       └── timerNode.js
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **ReactFlow** - Node-based graph editor
- **Zustand** - State management
- **CSS-in-JS** - Styling

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **CORS Middleware** - Cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip

### Backend Setup

```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Start Both Servers**: Run backend and frontend servers simultaneously
2. **Drag Nodes**: Drag nodes from the left sidebar onto the canvas
3. **Connect Nodes**: Click and drag from output handles to input handles to create connections
4. **Build Pipeline**: Arrange nodes to create your data processing pipeline
5. **Submit**: Click the submit button to validate your pipeline
6. **View Results**: Check if your pipeline is a valid DAG (no cycles)

## 🔌 API Endpoints

### `GET /`
Health check endpoint
```json
{
  "Ping": "Pong"
}
```

### `POST /pipelines/parse`
Validates the pipeline structure

**Request Body:**
```json
{
  "nodes": [
    { "id": "node1", "type": "input", ... }
  ],
  "edges": [
    { "source": "node1", "target": "node2" }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## 🧪 DAG Validation Algorithm

The backend uses a **3-color DFS algorithm** to detect cycles:
- **White (0)**: Unvisited nodes
- **Gray (1)**: Currently in recursion stack
- **Black (2)**: Fully processed

If a gray node is encountered again, a cycle is detected (back-edge).

## 🎨 Design Philosophy

The UI follows VectorShift's design principles:
- Clean, card-based node design
- Dark theme with subtle accents
- Colored accent bars for node identification
- Soft shadows and hover effects
- Minimalist, professional interface

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Shivam Verma

## 🔗 Links

- [GitHub Repository](https://github.com/shivamverma30/vectorshiftAi_task.git)
- [VectorShift](https://vectorshift.ai/) - Inspiration for this project
