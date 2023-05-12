import { useCallback } from "react";

import ReactFlow, {
	Background,
	Connection,
	ConnectionMode,
	Controls,
	addEdge,
	useEdgesState,
	useNodesState,
} from "reactflow";

import * as Toolbar from "@radix-ui/react-toolbar";

import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/nodes/square";
import DefaultEdge from "./components/edges/DefaultEdges";

const NODE_TYPES = {
	square: Square,
};

const EDGE_TYPES = {
	default: DefaultEdge,
};

const INITIAL_NODES = [
	{
		id: crypto.randomUUID(),
		type: "square",
		position: {
			x: 200,
			y: 400,
		},
		data: {},
	},
	{
		id: crypto.randomUUID(),
		type: "square",
		position: {
			x: 1000,
			y: 400,
		},
		data: {},
	},
] satisfies Node[];

function App() {
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

	const onConnect = useCallback((connection: Connection) => {
		return setEdges((edges) => addEdge(connection, edges));
	}, []);

	function addSquareNode() {
		setNodes((nodes) => [
			...nodes,
			{
				id: crypto.randomUUID(),
				type: "square",
				position: {
					x: 750,
					y: 350,
				},
				data: {},
			},
		]);
	}

	return (
		<div className="w-screen h-screen">
			<ReactFlow
				nodeTypes={NODE_TYPES}
				edgeTypes={EDGE_TYPES}
				nodes={nodes}
				connectionMode={ConnectionMode.Loose}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}
				onConnect={onConnect}
				defaultEdgeOptions={{
					type: "default",
				}}
			>
				<Background
					/*className="bg-zinc-950"*/ gap={12}
					size={2}
					color={zinc[200]}
				/>
				<Controls />
			</ReactFlow>

			<Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
				<Toolbar.Button
					className="w-32 h-32 bg-violet-500 rounded mt-6 transition-transform hover:-translate-y-2"
					onClick={addSquareNode}
				></Toolbar.Button>
			</Toolbar.Root>
		</div>
	);
}

export default App;
