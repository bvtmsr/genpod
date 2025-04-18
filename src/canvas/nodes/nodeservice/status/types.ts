export interface MicroserviceNodeStatusProps {
  nodeId: string;
}
export interface Task {
  id: string;
  name: string;
  value: string;
  tabs?: Tab[];
}
export interface Tab {
  name: string;
  value: string;
}
