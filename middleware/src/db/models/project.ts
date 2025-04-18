import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../index';
import ProjectSnapshot from './projectSnapshot';

interface ProjectAttributes {
  id: string;
  name: string;
  flow: object;
  userId: string;
  parentId: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: string;
  public name!: string;
  public flow!: object;
  public userId!: string;
  public parentId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static async getNextVersion(projectId: string): Promise<string> {
    const lastSnapshot = await ProjectSnapshot.findOne({
      where: { projectId },
      order: [['createdAt', 'DESC']]
    });

    if (!lastSnapshot) {
      return 'v0.0.1';
    }

    const versionParts = lastSnapshot.version.slice(1).split('.').map(Number);
    versionParts[2] += 1; // Increment patch version

    return `v${versionParts.join('.')}`;
  }
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flow: {
      type: DataTypes.JSON,
      allowNull: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
     
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    sequelize,
    tableName: 'projects',
    hooks: {
      afterUpdate: async (project: Project) => {
        const nextVersion = await Project.getNextVersion(project.id);
        await ProjectSnapshot.create({
          projectId: project.id,
          name: project.name,
          flow: project.flow,
          userId: project.userId,
          createdAt: new Date(),
          version: nextVersion
        });
      }
    }
  }
);

export default Project;
