import { notifications } from '@mantine/notifications';
import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, {
    message: 'Please enter a name'
  }),
  description: z.string(),
  language: z
    .string({
      description: 'Programming language',
      required_error: 'Please select a language'
    })
    .min(1, {
      message: 'Please select a language'
    }),
  restConfig: z.object({
    template: z.string().min(1, {
      message: 'Please select a template'
    }),
    framework: z.string().min(1, {
      message: 'Please select a framework'
    }),
    server: z
      .object({
        port: z.string().or(z.number()),
        sqlDB: z.string().optional(),
        noSQLDB: z.string().optional(),
        openApiFileYamlContent: z
          .preprocess(
            val => {
              if (val instanceof File) {
                return val;
              } else {
                return undefined;
              }
            },
            z
              .custom<File>(val => val instanceof File, 'Please upload a file')
              .refine(
                val => {
                  if (
                    val.type === 'application/json' ||
                    val.type === 'application/x-yaml' ||
                    !val
                  ) {
                    return true;
                  } else {
                    notifications.show({
                      title: 'Not Supported File Type',
                      message: 'Please upload a yaml or json file',
                      color: 'red',
                      autoClose: 3000
                    });

                    return false;
                  }
                },
                {
                  message: 'Please upload a yaml or json file'
                }
              )
              .optional()
          )
          .optional()
      })
      .optional()
  }),
  grpcConfig: z.object({
    server: z
      .object({
        port: z.string().or(z.number()),
        sqlDB: z.string(),
        noSQLDB: z.string()
      })
      .optional()
  })
});
