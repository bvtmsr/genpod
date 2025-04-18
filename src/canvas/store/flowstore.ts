import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange
} from 'reactflow';
import { emitter } from 'src/emitter';
import theme from 'src/theme';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  CustomNode,
  CustomNodeFormData,
  EdgeTypes,
  FlowStore
} from './types.store';

function defaultFlow(flowKey: string) {
  return {
    flowKey,
    nodes: [] as CustomNode[],
    edges: [] as Edge[],
    activeNode: null,
    activeEdge: null,
    licenses: []
  };
}

export const useFlowsStore = create<FlowStore>()(
  devtools((set, get) => {
    return {
      // Flow Actions
      flows: {},
      addFlow: (flowKey: string) => {
        const currentFlows = get().flows;
        if (currentFlows?.[flowKey]) return;
        // if there is no active flow then set the newly added flow as active
        if (!get().activeFlow) {
          set({
            activeFlow: flowKey
          });
        }
        set(state => {
          return {
            ...state,
            flows: {
              ...state.flows,
              [flowKey]: defaultFlow(flowKey)
            }
          };
        });
      },
      removeFlow: (flowKey: string) => {
        set(state => {
          const flows = { ...state.flows };
          delete flows[flowKey];
          return {
            flows
          };
        });
      },
      updateFlow: (flowKey: string, flow) => {
        set(state => {
          return {
            ...state,
            flows: {
              ...state.flows,
              [flowKey]: flow
            }
          };
        });
      },
      // Active Flow Actions
      activeFlow: null,
      getActiveFlow: () => {
        const flows = get().flows;
        if (!flows) return null;
        const activeFlow = get().activeFlow || '';
        return flows[activeFlow]!;
      },
      setActiveFlow: (flowKey: string) => {
        set({
          activeFlow: flowKey
        });
      },
      // Active Node Actions
      refreshActiveNode: () => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        const { activeNode } = flows[activeFlow];
        if (!activeNode) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              activeNode:
                flows[activeFlow].nodes.find(
                  node => node.id === activeNode.id
                ) || null
            }
          }
        });
      },
      refreshActiveEdge: () => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        const { activeEdge } = flows[activeFlow];
        if (!activeEdge) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              activeEdge:
                flows[activeFlow].edges.find(
                  edge => edge.id === activeEdge.id
                ) || null
            }
          }
        });
      },
      setActiveNode: (nodeId: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        const { nodes } = flows[activeFlow];
        const node = nodes.find(node => node.id === nodeId);
        if (!node) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              activeNode: node
            }
          }
        });
      },
      setActiveEdge: (edgeId: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        const { edges } = flows[activeFlow];
        const edge = edges.find(edge => edge.id === edgeId);
        if (!edge) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              activeEdge: edge
            }
          }
        });
      },
      getNodesAndEdges: (flowKey?: string) => {
        const flows = get().flows;
        if (!flows) return { nodes: [], edges: [] };
        const activeFlow = flowKey || get().activeFlow || '';
        if (!activeFlow) return { nodes: [], edges: [] };
        return {
          nodes: flows[activeFlow].nodes,
          edges: flows[activeFlow].edges
        };
      },
      updateLicenses: (flowKey: string, licenses) => {
        set(state => {
          if (!state.flows) return state;
          return {
            ...state,
            flows: {
              ...state.flows,
              [flowKey]: {
                ...state.flows[flowKey],
                licenses
              }
            }
          };
        });
        return get().flows?.[flowKey]?.licenses || [];
      },
      // React Flow Actions
      addNode: (node: CustomNode) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              nodes: flows[activeFlow].nodes.concat(node)
            }
          }
        });
        emitter.emit('nodesChange');
      },
      setNodes: (nodes: CustomNode[]) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              nodes
            }
          }
        });
      },
      setEdges: (edges: Edge[]) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              edges
            }
          }
        });
      },
      setNodeFormData: (nodeFormData: CustomNodeFormData, nodeId?: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        if (nodeId) {
          set({
            flows: {
              ...flows,
              [activeFlow]: {
                ...flows[activeFlow],
                nodes: flows[activeFlow].nodes.map(node => {
                  if (nodeId.includes(node.id)) {
                    return {
                      ...node,
                      consumerData: {
                        ...node.data,
                        ...nodeFormData
                      }
                    };
                  }
                  return node;
                })
              }
            }
          });
        }
        const { activeNode } = flows[activeFlow];

        if (!activeNode) return;
        const updatedNode = {
          ...activeNode,
          data: {
            ...activeNode.data,
            ...nodeFormData
          }
        };
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              nodes: flows[activeFlow].nodes.map(node => {
                if (node.id === activeNode.id) {
                  return updatedNode;
                }
                return node;
              })
            }
          }
        });
      },
      getNodeFormData: (nodeId: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        return flows[activeFlow].nodes.find(node => node.id === nodeId)?.data;
      },
      setEdgeFormData: (edgeFormData: CustomNodeFormData, edgeId?: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        if (edgeId) {
          set({
            flows: {
              ...flows,
              [activeFlow]: {
                ...flows[activeFlow],
                edges: flows[activeFlow].edges.map(edge => {
                  if (edge.id === edgeId) {
                    return {
                      ...edge,
                      data: {
                        ...edge.data,
                        ...edgeFormData
                      }
                    };
                  }
                  return edge;
                })
              }
            }
          });
        }
        const { activeEdge } = flows[activeFlow];
        if (!activeEdge) return;
        const updatedEdge = {
          ...activeEdge,
          data: {
            ...activeEdge.data,
            ...edgeFormData
          }
        };
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              edges: flows[activeFlow].edges.map(edge => {
                if (edge.id === activeEdge.id) {
                  return updatedEdge;
                }
                return edge;
              })
            }
          }
        });
      },
      getEdgeFormData: (edgeId: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        return flows[activeFlow].edges.find(edge => edge.id === edgeId)?.data;
      },
      onNodesChange: (changes: NodeChange[]) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              nodes: applyNodeChanges(
                changes,
                flows[activeFlow].nodes as unknown as Node[]
              ) as CustomNode[]
            }
          }
        });
        
        get().refreshActiveNode();
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              edges: applyEdgeChanges(changes, flows[activeFlow].edges)
            }
          }
        });
        get().refreshActiveEdge();
      },
      onConnect: (connection: Connection) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              edges: addEdge(
                {
                  ...connection,
                  type: EdgeTypes.CUSTOM_EDGE,
                  markerStart: {
                    type: MarkerType.Arrow,
                    color: theme.colors?.orange?.[5],
                    strokeWidth: 2,
                    width: 20
                  }
                },
                flows[activeFlow].edges
              )
            }
          }
        });
      },
      deleteNode: (nodeId: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              nodes: flows[activeFlow].nodes.filter(node => node.id !== nodeId),
              edges: flows[activeFlow].edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
            }
          }
        });
      },
      deleteEdge: (nodeId: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              edges: flows[activeFlow].edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
            }
          }
        });
      },
      detachNodeFromGroup: (nodeId: string[]) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        set({
          flows: {
            ...flows,
            [activeFlow]: {
              ...flows[activeFlow],
              nodes: flows[activeFlow].nodes.map(node => {
                if (nodeId.includes(node.id)) {
                  return {
                    ...node,
                    parentNode: undefined,
                    expandParent: false
                  };
                }
                return node;
              })
            }
          }
        });
      },
      setGroupNodeFormData: (groupNodeFormData: CustomNodeFormData, nodeId?: string) => {
        const flows = get().flows;
        if (!flows) return;
        const activeFlow = get().activeFlow || '';
        if (!activeFlow) return;
        if (nodeId) {
          set({
            flows: {
              ...flows,
              [activeFlow]: {
                ...flows[activeFlow],
                nodes: flows[activeFlow].nodes.map(node => {
                  if (nodeId.includes(node.id)) {
                    return {
                      ...node,
                      data: {
                        ...node.data,
                        ...groupNodeFormData
                      }
                    };
                  } else {
                    return node;
                  }
                })
              }
            }
          });
        }   
      }
      
    };
  },{name: 'FlowStore', storeName: 'FlowStore'})
);
