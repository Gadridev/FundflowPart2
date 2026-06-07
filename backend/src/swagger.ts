import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT || 5000;

export const swaggerDocs = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crowdfunder API",
      version: "1.0.0",
      description:
        "Interactive API docs. Two sample paths are in `src/routes/auth.routes.ts` — copy that `@swagger` pattern for other routes. " +
        "Beginner → advanced tutorial: `docs/SWAGGER_COMPLETE_GUIDE.md`.",
    },
    servers: [{ url: `http://localhost:${port}` }],
    tags: [
      { name: "Auth", description: "Register, login, current user" },
      { name: "Projects", description: "Project CRUD, owner views, invest (mounted at /api/projects)" },
      { name: "Admin", description: "Read-only admin (JWT role admin)" },
      { name: "Investments", description: "Current user investment summary (/api/investments)" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
});
