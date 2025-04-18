import { FastifyReply, FastifyRequest } from 'fastify';
import Project from 'src/db/models/project';
import { ProjectSnapshotQuery } from './types';
import ProjectSnapshot from 'src/db/models/projectSnapshot';

export const createProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, flow, parentId } = request.body as {
    name: string;
    flow: object;
    parentId: string;
  };

  if (!name) {
    return reply.status(400).send({ error: 'Project name is required' });
  }
  const userId = request.user?.id!;

  const project = await Project.create({ name, flow, userId, parentId });

  reply.status(201).send({ message: 'Project created successfully', project });
};

export const updateProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, flow, parentId } = request.body as {
    name: string;
    flow: object;
    parentId: string;
  };

  const project = await Project.findByPk(id);

  if (!project) {
    return reply.status(404).send({ error: 'Project not found' });
  }

  project.name = name;
  project.flow = flow;
  project.parentId = parentId;

  await project.save();

  reply.status(200).send({ message: 'Project updated successfully', project });
};

export const getProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  const project = await Project.findByPk(id);

  if (!project) {
    return reply.status(404).send({ error: 'Project not found' });
  }

  reply.status(200).send(project);
};

export const getAllProjects = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const projects = await Project.findAll({
    where: { userId: request.user?.id }
  });
  reply.status(200).send(projects);
};

export const getProjectSnapshots = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user?.id!;
  const projectId = (request.params as { id: string }).id;
  const count = (request.query as ProjectSnapshotQuery).count || '10';
  const orderBy =
    (request.query as ProjectSnapshotQuery).orderBy === 'asc' ? 'ASC' : 'DESC';

  try {
    const snapshots = await ProjectSnapshot.findAll({
      where: { userId, projectId },
      order: [['createdAt', orderBy]],
      limit: parseInt(count)
    });
    reply.status(200).send({
      message: 'Snapshots fetched successfully',
      snapshots
    });
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch snapshots' });
  }
};
