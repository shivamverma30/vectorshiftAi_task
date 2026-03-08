from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI()

# Allow the React dev server (localhost:3000) to call this API.
# Without this, the browser blocks the request due to CORS policy.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# ── Request schema ────────────────────────────────────────────────────────────
# Matches the shape ReactFlow gives us on the frontend.
# Each node has at least an 'id'; edges have 'source' and 'target'.

class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


# ── DAG check ────────────────────────────────────────────────────────────────
def is_dag(nodes: list[dict], edges: list[dict]) -> bool:
    """
    Returns True if the graph formed by nodes + edges is a
    Directed Acyclic Graph (no cycles).

    Uses DFS with a 3-color marking scheme:
      0 = unvisited
      1 = currently in the recursion stack  (grey)
      2 = fully processed                   (black)

    If we ever hit a grey node again we've found a back-edge → cycle.
    """
    # Build adjacency list from edge source → target
    adj: dict[str, list[str]] = {n["id"]: [] for n in nodes}
    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in adj:
            adj[src].append(tgt)

    color = {n["id"]: 0 for n in nodes}

    def dfs(node_id: str) -> bool:
        color[node_id] = 1  # mark as in-progress
        for neighbor in adj.get(node_id, []):
            if color.get(neighbor) == 1:
                return False   # back-edge found → cycle
            if color.get(neighbor) == 0:
                if not dfs(neighbor):
                    return False
        color[node_id] = 2    # done with this node
        return True

    for node_id in list(color.keys()):
        if color[node_id] == 0:
            if not dfs(node_id):
                return False

    return True


# ── Endpoint ──────────────────────────────────────────────────────────────────
@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    """
    Receives the pipeline graph, counts nodes/edges,
    and checks whether the graph is a DAG.
    """
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag_result = is_dag(payload.nodes, payload.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_result,
    }